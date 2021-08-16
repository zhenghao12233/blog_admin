import React, { useState } from 'react';
import { Breadcrumb, Pagination, Skeleton, Switch, Card, Avatar, Table, Menu ,Tag,Space } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import {withRouter,Link } from 'react-router-dom';
import menuList from '../../config/menu'
const { Meta } = Card;
const { SubMenu } = Menu;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub3','sub4'];
const Nav = (props) => {
    console.log('Nav',props)
    const [openKeys, setOpenKeys] = useState([]);
    const [selectKeys, setSelectKeys] = useState([props.location.pathname]);
    const creatMenu = () => {
        return menuList.map(item => {
            if (item.children) {
                return (
                    <SubMenu key={item.key} icon={<SettingOutlined />} title={item.title}>
                        {
                            item.children.map(it => {
                                return (
                                    <Menu.Item key={item.key} icon={<MailOutlined />}>
                                        <Link to={it.url}>{it.title}</Link>
                                    </Menu.Item>

                                )
                            })
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.key} icon={<MailOutlined />}>
                        <Tag>{item.title}</Tag>
                    </Menu.Item>
                )
            }
        })
    }

    const onOpenChange = keys => {
        console.log("keys",keys)
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

    return (
        <Menu mode="inline" openKeys={openKeys} selectedKeys={selectKeys} onOpenChange={onOpenChange} style={{ width: 200, height: '96%' }}>
            {creatMenu()}
            {/* {nodes} */}
        </Menu>
    );
}

export default withRouter(Nav);
