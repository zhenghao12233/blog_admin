import React, { useState } from 'react';
import { Breadcrumb, Pagination, Skeleton, Switch, Card, Avatar, Table, Tag, Space } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
const { Meta } = Card;
const Mine = (props) => {
    console.log(props.location.state)
    const [loading, setLoading] = useState(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];

    return (

        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <HomeOutlined />
                    <span>Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                    <UserOutlined />
                    <span>Mine</span>
                </Breadcrumb.Item>
                {/* <Breadcrumb.Item>Application</Breadcrumb.Item> */}
            </Breadcrumb>,

            <Card style={{ width: '100%', marginTop: 16 }} loading={loading}>
                <Meta
                    avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title="Card title"
                    description="This is the description"
                />
                <Pagination
                    total={85}
                    showSizeChanger
                    showQuickJumper
                    showTotal={total => `Total ${total} items`}
                />
            </Card>

            <Card style={{ width: '100%', marginTop: 16 }}>
                <Skeleton loading={loading} avatar active>
                    <Table columns={columns} dataSource={data} pagination={{ position: [ "bottomCenter" ], total: 85,  showSizeChanger: true, showQuickJumper: true }}/>
                    {/* <Pagination
                        total={85}
                        showSizeChanger
                        showQuickJumper
                        showTotal={total => `Total ${total} items`}
                    /> */}
                </Skeleton>

            </Card>

            <Card style={{ width: '100%', marginTop: 16 }}>
                <Skeleton loading={loading} avatar active>
                    <Table columns={columns} dataSource={data} pagination={{ position: [ "bottomCenter" ], total: 85,  showSizeChanger: true, showQuickJumper: true }}/>
                    {/* <Pagination
                        total={85}
                        showSizeChanger
                        showQuickJumper
                        showTotal={total => `Total ${total} items`}
                    /> */}
                </Skeleton>

            </Card>


        </div>
    );
}

export default Mine;
