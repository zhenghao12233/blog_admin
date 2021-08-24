import { EditOutlined, SettingOutlined, FormOutlined, UnorderedListOutlined } from '@ant-design/icons';
const menuList = [
    {
        key: 'article',
        title: '文章管理',
        icon: <SettingOutlined />,
        children: [
            {
                key: '/manage/add',
                title: '编辑文章',
                url: '/manage/add',
                icon: <FormOutlined />,
            },
            // {
            //     key: '/manage/edit',
            //     title: '编辑文章',
            //     url: '/manage/edit',
            //     icon: <EditOutlined />,
            // },
            {
                key: '/manage/list',
                title: '文章列表',
                url: '/manage/list',
                icon: <UnorderedListOutlined />
            }
        ]
    }
    // {
    //     key: 'home',
    //     title: 'home'
    // },
    // {
    //     key: 'sub1',
    //     title: 'one',
    //     children: [
    //         {
    //             key: '/mine',
    //             title: 'mine',
    //             url: '/mine'
    //         }
    //     ]
    // }, {
    //     key: 'sub2',
    //     title: 'two',
    //     children: [
    //         {
    //             key: '/self',
    //             title: 'self',
    //             url: '/self'
    //         }
    //     ]
    // }, {
    //     key: 'sub3',
    //     title: 'three',
    //     children: [
    //         {
    //             key: '/test',
    //             title: 'test',
    //             url: '/test'
    //         }
    //     ]
    // }, {
    //     key: 'sub4',
    //     title: 'four',
    //     children: [
    //         {
    //             key: '4-1',
    //             title: '4-1',
    //             children: [
    //                 {
    //                     key: '4-1-1',
    //                     title: '4-1-1',
    //                     url: '/',
    //                 }
    //             ]
    //         }
    //     ]
    // }, {
    //     key: '/editor',
    //     title: 'four',
    //     url: '/editor'
    // }
]

export default menuList