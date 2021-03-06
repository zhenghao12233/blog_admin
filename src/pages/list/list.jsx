import React, { useEffect, useState, useRef } from 'react';
// import { Layout, Menu, Breadcrumb, Tag, message, Row, Col, Input, Card, Select, Upload, Modal, Table, Space, Button } from 'antd';
// import Highlighter from 'react-highlight-words'


// const List = (props) => {
//     const [dataSource, setDataSource] = useState([
//         {
//             key: '1',
//             name: 'John Brown',
//             age: 32,
//             address: 'New York No. 1 Lake Park',
//             tags: ['nice', 'developer'],
//         },
//         {
//             key: '2',
//             name: 'Jim Green',
//             age: 42,
//             address: 'London No. 1 Lake Park',
//             tags: ['loser'],
//         },
//         {
//             key: '3',
//             name: 'Disabled User',
//             age: 32,
//             address: 'Sidney No. 1 Lake Park',
//             tags: ['cool', 'teacher'],
//         },
//     ])
//         ;

//     const [columns, setColumns] = useState([
//         {
//             title: 'Name',
//             dataIndex: 'name',
//             key: 'name',
//             render: text => <a>{text}</a>,
//         },
//         {
//             title: 'Age',
//             dataIndex: 'age',
//             key: 'age',
//         },
//         {
//             title: 'Address',
//             dataIndex: 'address',
//             key: 'address',
//         },
//         {
//             title: 'Tags',
//             key: 'tags',
//             dataIndex: 'tags',
//             render: tags => (
//                 <>
//                     {tags.map(tag => {
//                         let color = tag.length > 5 ? 'geekblue' : 'green';
//                         if (tag === 'loser') {
//                             color = 'volcano';
//                         }
//                         return (
//                             <Tag color={color} key={tag}>
//                                 {tag.toUpperCase()}
//                             </Tag>
//                         );
//                     })}
//                 </>
//             ),
//         }, {
//             title: '??????',
//             key: 'action',
//             render: (text, record) => (
//                 <Space size="middle">
//                     <a>Invite {record.name}</a>
//                     <a>Invite {record.name}</a>
//                     <a>{JSON.stringify(text)}</a>
//                 </Space>
//             ),
//         }
//     ])

//     const [selectionType, setSelectionType] = useState('checkbox');
//     const rowSelection = {
//         onChange: (selectedRowKeys, selectedRows) => {
//             console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//         },
//         getCheckboxProps: (record) => ({
//             disabled: record.name === 'Disabled User',
//             // Column configuration not to be checked
//             name: record.name,
//         }),
//     };

//     return (
//         <div>
//             <Breadcrumb>
//                 <Breadcrumb.Item>
//                     <Link to="/home">??????</Link>
//                 </Breadcrumb.Item>
//                 <Breadcrumb.Item>
//                     <Link to="/list">
//                         ????????????
//                     </Link>
//                 </Breadcrumb.Item>
//             </Breadcrumb>
//             <Card>
//                 <Table
//                     rowSelection={{
//                         type: selectionType,
//                         ...rowSelection,
//                     }}
//                     bordered
//                     dataSource={dataSource}
//                     columns={columns} />
//             </Card>
//         </div>
//     );
// }

import { Table, Input, Button, Space, Popconfirm, Breadcrumb, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getArticleList, deleteArticle } from '../../api/ajax'
import qs from 'querystring'

const { Link, BrowserRouter, Route, Switch, Redirect, HashRouter } = require('react-router-dom')

class List extends React.Component {
    state = {
        data: [
            // {
            //     key: '3',
            //     id: 3,
            //     title: 'Jim Green',
            //     date: 32,
            //     type: '????????????',
            //     content: 'Sidney No. 1 Lake Park',
            // },
            // {
            //     key: '4',
            //     id: 4,
            //     title: 'Disabled User',
            //     date: 32,
            //     type: '????????????',
            //     content: 'Not Expandable',
            // },
        ],
        searchText: '',
        searchedColumn: '',
        selectionType: 'checkbox',
        rowSelection: {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: (record) => ({
                disabled: record.title === 'Disabled User',
                // Column configuration not to be checked
                title: record.title,
            }),
        },
        query: {
            page: 1,
            size: 10,
            total: 80,
        }
    };

    componentWillMount() {
        
        this.getListFun()
    }
    componentDidMount() {
        // console.log("query??????",qs.parse(this.props.location.search.substr(1)))
    }

    getListFun() {
        getArticleList('findTitleOrContentOrType',{
            title: '',
            content: '',
            page: this.state.query.page,
            size: this.state.query.size
        }).then(res => {
            console.log(res)
            res.data.list.forEach(item => {
                item['key'] = item.id
                if (item.type == 1) {
                    item['class'] = '????????????'
                }else if (item.type == 2) {
                    item['class'] = '????????????'
                }else {
                    item['class'] = '????????????'
                }
            })
            const query = {...this.state.query}
            query.total = res.data.total
            this.setState({
                data: res.data.list,
                query
            })
        })
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`???????????????`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        ??????
          </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        ??????
          </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        ??????
          </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    highlightClassName="xxx"
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    onPageChange = (page, pageSize) => {
        console.log(page, pageSize)
        const obj = {...this.query}
        obj.page = page
        obj.size = pageSize
        this.setState({
            query: obj
        }, () => {
            this.getListFun()
        })
        
    }

    deleteFun = (id) => {
        console.log("???????????????id",id)
        deleteArticle('deleteArticle',{
            id
        }).then(res => {
            console.log(res)
            if (res.code == 0) {
                message.success("????????????")
                this.getListFun()
            }else{
                message.error("????????????")
            }
        })
    }

    jumpEdit = (id) => {
        this.props.history.push("/manage/edit?id=" + id)
    }

    render() {
        const columns = [
            {
                align: 'center',
                title: '??????',
                dataIndex: 'id',
                key: 'id',
                fixed: 'left',
                width: '5%'
            },
            {
                align: 'center',
                title: '??????',
                dataIndex: 'title',
                key: 'title',
                width: '20%',
                fixed: 'left',
                ...this.getColumnSearchProps('title'),
            }, {
                align: 'center',
                title: '??????',
                dataIndex: 'class',
                key: 'class',
                ...this.getColumnSearchProps('class'),
                width: '10%'
            },
            {
                align: 'center',
                title: '????????????',
                dataIndex: 'date',
                key: 'date',
                width: '20%',
                ...this.getColumnSearchProps('date'),
                sorter: (a, b) => a.date - b.date,
                sortDirections: ['descend', 'ascend'],
            },
            {
                align: 'center',
                title: '??????',
                dataIndex: 'content',
                key: 'content',
                ...this.getColumnSearchProps('content'),

            }, {
                align: 'center',
                title: '??????',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        {/* <a>Invite {record.name}</a>
                        <a>Invite {record.name}</a> */}
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => this.jumpEdit(record.id)} size="middle" />
                        <Popconfirm title={`????????????${record.name}???`} okText="Yes" cancelText="No" onConfirm={() => this.deleteFun(record.id)}>
                            <Button type="danger" shape="circle" icon={<DeleteOutlined />} size="middle" />
                        </Popconfirm>
                        {/* <a>{JSON.stringify(text)}</a> */}
                    </Space>
                ),
            }
        ];

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/home">??????</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/list">
                            ????????????
                           </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Table
                    rowSelection={{
                        type: this.state.selectionType,
                        ...this.state.rowSelection,
                    }}
                    locale={
                        {
                            cancelSort: '??????????????????',
                            triggerAsc: '????????????',
                            triggerDesc: '????????????'
                        }
                    }
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.content}</p>,
                        rowExpandable: record => record.content !== 'Not Expandable',
                    }}
                    bordered
                    columns={columns}
                    scroll={{ x: 1500, y: 900 }}
                    dataSource={this.state.data}
                    pagination={{ total: this.state.query.total, defaultPageSize: this.state.query.size, onChange: this.onPageChange }}
                />
            </div>
        )

    }
}

export default List;
