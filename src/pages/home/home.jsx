import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb,Tag } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import memory from '../../utils/memoryUtils'
import Mine from '../mine/mine'
// import Self from '../self/self'
// import Editors from '../editor/editor'
// import Test from '../test/test'
import Nav from '../../components/nav/nav'
import menuList from '../../config/menu'

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
// const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
const rootSubmenuKeys = ['sub1', 'sub2', 'sub3','sub4','sub5'];
const Home = (props) => {
    const [openKeys, setOpenKeys] = useState([]);
    const [selectKeys, setSelectKeys] = useState(props.location.pathname);
    const [collapsed, setCollapsed] = useState(false)
    const [nodes, setNodes] = useState()

    const user = memory.user
    if (!user || !user.username) {
        props.history.push("/login")
    }

    useEffect(() => {
        setNodes(creatMenu(menuList))
    }, [])

    const creatMenu = (menuList) => {
        return menuList.map(item => {
            if (item.children) {
                let flag = item.children.find(item => item.key == props.location.pathname)
                if (flag) {
                    setOpenKeys([item.key])
                }
                return (
                    <SubMenu key={item.key} icon={<SettingOutlined />} title={item.title}>
                        {
                            creatMenu(item.children)
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.key} icon={<MailOutlined />}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            }
        })
    }

    const onOpenChange = keys => {
        console.log(keys)
        // 满足条件，返回第一个，不满足则undefined
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        console.log(latestOpenKey)
        console.log(rootSubmenuKeys.indexOf(latestOpenKey) === -1)
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
            console.log(openKeys)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    
    const onItemClick = (item, key, keyPath, domEvent) => {
        console.log(item, key, keyPath, domEvent)
        setSelectKeys(item.key)
    }


    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
        console.log(collapsed)
    }

    return (
        <Layout style={{ height: "100%" }}>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Layout style={{ height: '100%' }}>
                <Sider width={200} height={'100%'} className="site-layout-background">
                    {/* <Nav></Nav> */}
                    {/* <div onClick={toggleCollapsed} style={{ height: '4%', color: '#fff', fontSize: '24px', textAlign: 'center' }}>|  |  |</div> */}
                    <Menu mode="inline" openKeys={openKeys} selectedKeys={selectKeys} inlineCollapsed={collapsed} onOpenChange={onOpenChange} onClick={onItemClick} style={{ width: 200, height: '96%' }}>
                        {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                            <Menu.Item key="/mine">
                                <Link to={{ pathname: "/mine", state: { id: 1 } }}>mine</Link>
                            </Menu.Item>
                            <Menu.Item key="/self">
                                <Link to="/self/2">self</Link>
                            </Menu.Item>
                            <Menu.Item key="/test">
                                <Link to="/test?id=1">test</Link>
                            </Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu> */}
                        {nodes}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 0px 24px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 24px' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            height: '100%',
                            overflow: 'auto'
                        }}
                    >
                        <Switch>
                            {/* 默认匹配Mine组件 */}
                            {/* <Route path="/" exact component={Mine}></Route> */}
                            <Route path={`${props.match.path}mine`} component={Mine}></Route>
                            {/* <Route path={`${props.match.path}self`} component={Self}></Route> */}
                            {/* <Route path={`${props.match.path}test`} component={Test}></Route> */}
                            {/* <Route path={`${props.match.path}editor`} component={Editors}></Route> */}
                            <Redirect to="/mine"></Redirect>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
            {/* <Footer style={{background: '#fff'}}>底部</Footer> */}
        </Layout>
    );
}

export default Home;
