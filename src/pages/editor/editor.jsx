import React, { useEffect, useState, useRef } from 'react';
import { Layout, Menu, Breadcrumb, Tag, message, Row, Col, Input, Card, Select, Upload, Modal, Button } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import E from 'wangeditor'
import { baseURL } from '../../config/setting'
import { saveArticle, findAllById, updateArticle } from '../../api/ajax'
import qs from 'querystring'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const { Link, BrowserRouter, Route, Switch, Redirect, HashRouter } = require('react-router-dom')
const { TextArea } = Input;
const { Option } = Select;

// https://www.wangeditor.com/doc/
const Editors = (props) => {

    const [aid, setAid] = useState(null)
    const [domString, setDomString] = useState('11')

    const [fileList, setFileLIst] = useState([
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-2',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-3',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-4',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-xxx',
        //     percent: 50,
        //     name: 'image.png',
        //     status: 'uploading',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-5',
        //     name: 'image.png',
        //     status: 'error',
        // },
    ])

    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewTitle, setPreviewTitle] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)

    const [loadings, setLoadings] = useState([])
    const title = useRef(null)
    const [fillTitle, setFillTitle] = useState("")
    const content = useRef(null)
    const [fillContent, setFillContent] = useState("")
    const [article, setArticle] = useState("")
    const [type, setType] = useState(3)

    useEffect(() => {
        const query = qs.parse(props.location.search.substr(1))
        console.log("query参数", query)
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
            setArticle(editor.txt.html())
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
        editor.highlight = hljs
        editor.config.uploadImgShowBase64 = true
        editor.config.uploadImgServer =  baseURL + 'upload'
        editor.config.uploadImgParams = {
            alt: 'wangeditor上传的图片描述'
        }
        editor.config.uploadFileName = 'myFile'
        editor.create()
        // 写在创建之后
        // 重新设置编辑器内容, 或者直接写在编辑器的div中
        // editor.txt.html(article)
        // 创建编辑器之后，可使用 editor.txt.append('<p>追加的内容</p>') 继续追加内容。
        // editor.txt.append('<p>追加的内容</p>')
        // 情况内容
        // editor.txt.clear()

        if (query.id) {
            setAid(query.id)
            // getArticleFun(Number(query.id))
            findAllById('findAllById', {
                id: Number(query.id)
            }).then(res => {
                console.log("单篇文章", res)
                if (res.code == 0) {
                    setFillTitle(res.data.article.title)
                    setFillContent(res.data.article.content)
                    setType(Number(res.data.article.type))
                    setArticle(res.data.article.article)
                    // {
                    //     uid: '-3',
                    //     name: 'image.png',
                    //     status: 'done',
                    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    // },
                    const thumbs = res.data.article.thumb.split(",").reduce((pre,cur,index) => {
                        let obj = {
                            uid: '-' + index,
                            name: cur.substring(cur.indexOf("uploadFiles") + 12),
                            status: 'done',
                            url: cur
                        }
                        console.log(obj)
                        pre.push(obj)
                        return pre
                    },[])
                    console.log("thumbs",thumbs)
                    setFileLIst(thumbs)
                    editor.txt.html(res.data.article.article)
                } else {
                    message.error("文章获取失败")
                }
            })
        }

        // editInitFun()
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

    const enterLoading = index => {
        const newLoadings = [...loadings];
        newLoadings[index] = true;
        setLoadings(newLoadings)

        let thumbs = fileList.reduce((pre, cur) => {
            console.log(pre)
            if (cur.status == "done") {
                pre.push("http://47.108.172.171:5000/" + "public/" + cur.name)
            }
            return pre
        }, [])

        console.log("thumbs",thumbs)
        console.log(title.current.input.defaultValue)
        console.log(content.current.resizableTextArea.textArea.defaultValue)
        if (props.match.path == '/manage/add') {
            // 添加文章
            saveArticle('saveArticle', {
                title: title.current.input.defaultValue,
                content: content.current.resizableTextArea.textArea.defaultValue,
                article: article,
                type: type,
                thumb: thumbs.join(",")
            }).then(res => {
                console.log(res)
                if(res.code == 0) {
                    message.success("添加成功")
                }else {
                    message.error("添加失败")
                }
            })
        } else {
            const obj = {
                id: aid,
                title: title.current.input.defaultValue,
                content: content.current.resizableTextArea.textArea.defaultValue,
                article: article,
                type: type,
                thumb: thumbs.join(",")
            }
            console.log("obj",obj)
            // 编辑文章
            updateArticle('updateArticle',{
                id: aid,
                title: title.current.input.defaultValue,
                content: content.current.resizableTextArea.textArea.defaultValue,
                article: article,
                type: type,
                thumb: thumbs.join(",")
            }).then(res => {
                console.log(res)
                if(res.code == 0) {
                    message.success("修改成功")
                }else {
                    message.error("修改失败")
                }
            })
        }
        console.log("article",article)



        setTimeout(() => {
            newLoadings[index] = false;
            setLoadings([...newLoadings])
        }, 2000)

    }

    const changeSelect = (e) => {
        console.log(e)
        setType(String(e))
    }


    return (

        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/home">首页</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link>
                        {props.match.path == '/manage/add' ? '添加文章' : '编辑文章'}
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card>
                <Row align="middle" style={{ marginBottom: '20px' }}>
                    <Col span={2}>文章标题</Col>
                    <Col span={9}>
                        <Input defaultValue={fillTitle} placeholder={fillTitle ? fillTitle : '请输入标题'} ref={title} />
                    </Col>
                </Row>
                <Row align="start">
                    <Col span={2}>文章简介</Col>
                    <Col span={22}>
                        <TextArea showCount maxLength={100} placeholder={fillContent ? fillContent : '请输入简介'} ref={content} />
                    </Col>
                </Row>

                <Row align="middle" style={{ marginBottom: '20px' }}>
                    <Col span={2}>选择分类</Col>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="选择分类"
                        optionFilterProp="children"
                        onChange={(e) => changeSelect(e)}
                        value={type == 1 ? '技术分享' : type == 2 ? '算法解析' : '程序人生'}
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
                    </Select>
                    {/* <Col style={{visibility: props.match.path.indexOf('/manage/edit') != -1 ? 'visible' : 'hidden'}} span={6} offset={2}>已选分类: {type == 1 ? '技术分享' : type == 2 ? '算法解析' : '程序人生' }</Col> */}
                </Row>
                <Row>
                    <Col span={24}>上传图片</Col>
                    <Upload
                        action= {baseURL + "upload"}
                        listType="picture-card"
                        fileList={fileList}
                        multiple
                        onPreview={handlePreview}
                        onChange={handleChange}
                        data={{ alt: '图片描述' }}
                        name="myFile"
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
                <Col span={2}>编辑文章</Col>
                <div id="editBox">
                    {/* {editorContent + "<div>1121</div>"} */}
                </div>

                <Row justify="center">
                    <Button
                        type="primary"
                        icon={<UploadOutlined />}
                        loading={loadings[0]}
                        onClick={() => enterLoading(0)}
                        style={{ width: '100px', marginTop: '30px' }}
                    >
                        提交
                    </Button>
                </Row>
            </Card>

            <div dangerouslySetInnerHTML={{ __html: domString }} />

        </div>

    );
}

export default Editors;
