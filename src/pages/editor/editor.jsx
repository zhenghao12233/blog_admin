import React, { useEffect, useState, useRef } from 'react';
import { Layout, Menu, Breadcrumb, Tag, message, Row, Col, Input, Card, Select, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import E from 'wangeditor'
const { Link, BrowserRouter, Route, Switch, Redirect, HashRouter } = require('react-router-dom')
const { TextArea } = Input;
const { Option } = Select;
// https://www.wangeditor.com/doc/
const Editors = (props) => {

    const [domString, setDomString] = useState('11')

    const [fileList, setFileLIst] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-xxx',
            percent: 50,
            name: 'image.png',
            status: 'uploading',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-5',
            name: 'image.png',
            status: 'error',
        },
    ])

    const [ previewVisible, setPreviewVisible ] = useState(false)
    const [previewTitle,setPreviewTitle] = useState(null)
    const [ previewImage, setPreviewImage ] = useState(null)

    useEffect(() => {
        // const elemMenu = editorElemMenu;
        // const elemBody = editorElemBody;
        // var E = window.wangEditor;
        let editor = new E("#editBox")
        // 设置高度
        editor.config.height = 500
        // 设置层级
        editor.config.zIndex = 500
        editor.config.placeholder = '请输入'
        editor.config.focus = false
        // 自定义alert提示, 以 Ant Design 为例
        editor.config.customAlert = function (s, t) {
            switch (t) {
                case 'success':
                    message.success(s)
                    break
                case 'info':
                    message.info(s)
                    break
                case 'warning':
                    message.warning(s)
                    break
                case 'error':
                    message.error(s)
                    break
                default:
                    message.info(s)
                    break
            }
        }

        console.log(editor)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.config.onchange = html => {
            console.log(111)
            // 获取文本
            console.log(editor.txt.text())
            // 获取html
            console.log(editor.txt.html())

            setDomString(editor.txt.html())

            // 获取json
            // editor.txt.getJSON()
            // 设置json
            // editor.txt.setJSON([...])

            // this.setState({
            //     // editorContent: editor.txt.text()
            //     editorContent: editor.txt.html()
            // })
        }
        editor.config.menus = [
            'head',  		// 标题
            'bold',  		// 粗体
            'fontSize',     // 字号
            'fontName',  	// 字体
            'italic',  		// 斜体
            'underline',  	// 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo',  // 重复
            // 全部
            // 'head',
            // 'bold',
            // 'fontSize',
            // 'fontName',
            // 'italic',
            // 'underline',
            // 'strikeThrough',
            // 'indent',
            // 'lineHeight',
            // 'foreColor',
            // 'backColor',
            // 'link',
            // 'list',
            // 'todo',
            // 'justify',
            // 'quote',
            // 'emoticon',
            // 'image',
            // 'video',
            // 'table',
            // 'code',
            // 'splitLine',
            // 'undo',
            // 'redo',
        ]
        editor.config.colors = [
            '#000000',
            '#880000',
            '#1c487f',
            '#800080'
        ]
        editor.config.uploadImgShowBase64 = true
        editor.config.uploadImgServer = '/upload-img'
        editor.create()
        // 写在创建之后
        // 重新设置编辑器内容, 或者直接写在编辑器的div中
        editor.txt.html("<p>用 JS 设置的内容</p>")
        // 创建编辑器之后，可使用 editor.txt.append('<p>追加的内容</p>') 继续追加内容。
        editor.txt.append('<p>追加的内容</p>')
        // 情况内容
        editor.txt.clear()
    }, [])

    const onTextAreaChange = (e) => {
        console.log('Change:', e.target.value);
    }
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
    const handleChange = (e) => {
        console.log(e)
        setFileLIst([...e.fileList])
        console.log(11)
    }
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
    const handleCancel = () => {
        setPreviewVisible(false)
    };

    const handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewVisible(true)
      setPreviewImage(file.url || file.preview)
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    //   this.setState({
    //     previewImage: file.url || file.preview,
    //     previewVisible: true,
    //     previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    //   });
    };

    return (

        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/home">首页</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link>
                        {props.match.path == '/add' ? '添加文章' : '编辑文章'}
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card>
                <Row align="middle" style={{ marginBottom: '20px' }}>
                    <Col span={1}>文章标题</Col>
                    <Col span={9}>
                        <Input placeholder="Basic usage" />
                    </Col>
                </Row>
                <Row align="start">
                    <Col span={1}>文章简介</Col>
                    <Col span={23}>
                        <TextArea showCount maxLength={100} onChange={onTextAreaChange} />
                    </Col>
                </Row>

                <Row align="middle" style={{ marginBottom: '20px' }}>
                    <Col span={1}>选择分类</Col>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="选择分类"
                        optionFilterProp="children"
                    // onChange={onChange}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    // filterOption={(input, option) =>
                    //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    // }
                    >
                        <Option value="1">技术分享</Option>
                        <Option value="2">算法解析</Option>
                        <Option value="3">程序人生</Option>
                    </Select>,
                </Row>
                <Row>
                    <Col span={24}>上传图片</Col>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        multiple
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </Row>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                {/* 1、菜单栏与主题栏分离模式 */}
                <div id="editBox">
                    {/* <p>初始化的内容</p>
                    <p>初始化的内容</p> */}
                </div>
            </Card>

            <div dangerouslySetInnerHTML={{ __html: domString }} />

        </div>

    );
}

export default Editors;
