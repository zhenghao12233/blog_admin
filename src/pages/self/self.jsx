import React, { useState, useEffect } from 'react';
import { Table, Radio, Divider, Input, Button, Space, Tag, Tooltip } from 'antd';
import { changeConfirmLocale } from 'antd/lib/modal/locale';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';




const Self = (props) => {
    useEffect(() => {
        console.log("params路由传递参数", props.match.params)
    }, []);

    const [selectionType, setSelectionType] = useState('checkbox');
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    setTimeout(() => {
        setLoading(false)
    }, 1000);
    /* 行的限制 */
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),

    };
    // const onSelectChange = selectedRowKeys => {
    //     console.log('selectedRowKeys changed: ', selectedRowKeys);
    //     // this.setState({ selectedRowKeys });
    //     setSelectedRowKeys(selectedRowKeys)
    // };
    // const rowSelection = {
    //     selectedRowKeys,
    //     onChange: onSelectChange,
    // selections: [
    //     Table.SELECTION_ALL,
    //     Table.SELECTION_INVERT,
    //     Table.SELECTION_NONE,
    //     // {
    //     //     key: 'all',
    //     //     text: '全选',
    //     //     onSelect: onSelectChange
    //     // },
    //     // {
    //     //     key: 'invert',
    //     //     text: '反选',
    //     //     onSelect: changableRowKeys => {
    //     //         console.log(changeConfirmLocale)
    //     //         // setSelectedRowKeys(changableRowKeys)
    //     //     }
    //     // },

    //     {
    //         key: 'odd',
    //         text: 'Select Odd Row',
    //         onSelect: changableRowKeys => {
    //             let newSelectedRowKeys = [];
    //             newSelectedRowKeys = changableRowKeys.filter((key, index) => {
    //                 if (index % 2 !== 0) {
    //                     return false;
    //                 }
    //                 return true;
    //             });
    //             setSelectedRowKeys(newSelectedRowKeys)
    //             // this.setState({ selectedRowKeys: newSelectedRowKeys });
    //         },
    //     },
    //     {
    //         key: 'even',
    //         text: 'Select Even Row',
    //         onSelect: changableRowKeys => {
    //             let newSelectedRowKeys = [];
    //             newSelectedRowKeys = changableRowKeys.filter((key, index) => {
    //                 if (index % 2 !== 0) {
    //                     return true;
    //                 }
    //                 return false;
    //             });
    //             // this.setState({ selectedRowKeys: newSelectedRowKeys });
    //             setSelectedRowKeys(newSelectedRowKeys)
    //         },
    //     },
    // ],
    // };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: 100,
            ellipsis: true,
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Jim',
                    value: 'Jim',
                },
                {
                    text: 'Submenu',
                    value: 'Submenu',
                    children: [
                        {
                            text: 'Green',
                            value: 'Green',
                        },
                        {
                            text: 'Black',
                            value: 'Black',
                        },
                    ],
                },
            ],
            // 筛选
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            render: (text) => <a>{text}</a>,
            // 固定在左边
            fixed: 'left',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            width: 150,
            // 排序
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            // 带children能自动添加该行的展开栏
            // children: [
            //     {
            //         key: 11,
            //         name: 'John Brown',
            //         age: 42,
            //         address: 'New York No. 2 Lake Park',
            //     },
            //     {
            //         key: 12,
            //         name: 'John Brown jr.',
            //         age: 30,
            //         address: 'New York No. 3 Lake Park',
            //         children: [
            //             {
            //                 key: 121,
            //                 name: 'Jimmy Brown',
            //                 age: 16,
            //                 address: 'New York No. 3 Lake Park',
            //             },
            //         ],
            //     },
            //     {
            //         key: 13,
            //         name: 'Jim Green sr.',
            //         age: 72,
            //         address: 'London No. 1 Lake Park',
            //         children: [
            //             {
            //                 key: 131,
            //                 name: 'Jim Green',
            //                 age: 42,
            //                 address: 'London No. 2 Lake Park',
            //                 children: [
            //                     {
            //                         key: 1311,
            //                         name: 'Jim Green jr.',
            //                         age: 25,
            //                         address: 'London No. 3 Lake Park',
            //                     },
            //                     {
            //                         key: 1312,
            //                         name: 'Jimmy Green sr.',
            //                         age: 18,
            //                         address: 'London No. 4 Lake Park',
            //                     },
            //                 ],
            //             },
            //         ],
            //     },
            // ],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '5',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '6',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '7',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        },
    ];
    let temp = (params) => {
        return (
            <div>
                <Tag>{params.address}</Tag>
                <Tooltip title="名字">
                    <span>{params.name}</span>
                </Tooltip>
            </div>
        )
    }

    return (
        <div>
            <Radio.Group
                onChange={({ target: { value } }) => {
                    setSelectionType(value);
                }}
                value={selectionType}
            >
                <Radio value="checkbox">Checkbox</Radio>
                <Radio value="radio">radio</Radio>
            </Radio.Group>

            <Divider />

            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                bordered
                /* 
                    公共展开栏及配置
                */
                expandable={{
                    expandedRowRender: record => temp(record),
                    rowExpandable: record => record.age < 99,
                }}
                /* 
                    固定列和表头
                */
                scroll={{ x: 300, y: 240 }}
                columns={columns}
                dataSource={data}
                loading={loading}
            />
        </div>
    );
}

export default Self;
