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
//             title: '操作',
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
//                     <Link to="/home">首页</Link>
//                 </Breadcrumb.Item>
//                 <Breadcrumb.Item>
//                     <Link to="/list">
//                         文章列表
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

import { Table, Input, Button, Space, Popconfirm, Breadcrumb } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Link, BrowserRouter, Route, Switch, Redirect, HashRouter } = require('react-router-dom')

class List extends React.Component {
    state = {
        data: [
            {
                key: '1',
                id: 1,
                title: 'John Brown',
                date: 32,
                type: '技术分享',
                content: 'New York No. 1 Lake Park',
            },
            {
                key: '2',
                id: 2,
                title: 'Joe Black',
                date: 42,
                type: '程序人生',
                content: 'London No. 1 Lake Park',
            },
            {
                key: '3',
                id: 3,
                title: 'Jim Green',
                date: 32,
                type: '算法解析',
                content: 'Sidney No. 1 Lake Park',
            },
            {
                key: '4',
                id: 4,
                title: 'Disabled User',
                date: 32,
                type: '程序人生',
                content: 'Not Expandable',
            },
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
        }
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`搜索关键词`}
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
                        确定
          </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        重置
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
                        筛选
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
    }

    render() {
        const columns = [
            {
                align: 'center',
                title: '编号',
                dataIndex: 'id',
                key: 'id',
                fixed: 'left',
            },
            {
                align: 'center',
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                width: '30%',
                fixed: 'left',
                ...this.getColumnSearchProps('title'),
            }, {
                align: 'center',
                title: '类别',
                dataIndex: 'type',
                key: 'type',
                ...this.getColumnSearchProps('type'),
            },
            {
                align: 'center',
                title: '发布日期',
                dataIndex: 'date',
                key: 'date',
                width: '20%',
                ...this.getColumnSearchProps('date'),
                sorter: (a, b) => a.date - b.date,
                sortDirections: ['descend', 'ascend'],
            },
            {
                align: 'center',
                title: '简要',
                dataIndex: 'content',
                key: 'content',
                ...this.getColumnSearchProps('content'),

            }, {
                align: 'center',
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        {/* <a>Invite {record.name}</a>
                        <a>Invite {record.name}</a> */}
                        <Button type="primary" shape="circle" icon={<EditOutlined />} size="middle" />
                        <Popconfirm title={`确定删除${record.name}吗`} okText="Yes" cancelText="No">
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
                        <Link to="/home">首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/list">
                            文章列表
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
                            cancelSort: '点击取消排序',
                            triggerAsc: '点击升序',
                            triggerDesc: '点击降序'
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
                    pagination={{ total: 85, defaultPageSize: 20, onChange: this.onPageChange }}
                />
            </div>
        )

    }
}

export default List;
