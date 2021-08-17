import React, { useState,useEffect } from 'react';
import { Breadcrumb, Pagination, Skeleton, Switch, Card, Avatar, Table, Menu ,Tag,Space } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import {withRouter,Link } from 'react-router-dom';
import menuList from '../../config/menu'
const { Meta } = Card;
const { SubMenu } = Menu;
// const rootSubmenuKeys = ['sub1', 'sub2', 'sub3','sub4'];
const rootSubmenuKeys = ['sub1', 'sub2', 'sub3','sub4','sub5'];
const Nav = (props) => {
    console.log('Nav',props)
    const [openKeys, setOpenKeys] = useState([]);
    const [selectKeys, setSelectKeys] = useState(props.location.pathname);
    const [nodes, setNodes] = useState()
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


    return (
        <Menu mode="inline" openKeys={openKeys} selectedKeys={selectKeys} onOpenChange={onOpenChange} style={{ height: '96%' }}>
            {/* {creatMenu()} */}
            {nodes}
        </Menu>
    );
}

export default withRouter(Nav);
