const menuList = [
    {
        key: 'home',
        title: 'home'
    },
    {
        key: 'sub1',
        title: 'one',
        children: [
            {
                key: '/mine',
                title: 'mine',
                url: '/mine'
            }
        ]
    }, {
        key: 'sub2',
        title: 'two',
        children: [
            {
                key: '/self',
                title: 'self',
                url: '/self'
            }
        ]
    }, {
        key: 'sub3',
        title: 'three',
        children: [
            {
                key: '/test',
                title: 'test',
                url: '/test'
            }
        ]
    }, {
        key: 'sub4',
        title: 'four',
        children: [
            {
                key: '4-1',
                title: '4-1',
                children: [
                    {
                        key: '4-1-1',
                        title: '4-1-1',
                        url: '/',
                    }
                ]
            }
        ]
    }, {
        key: '/editor',
        title: 'four',
        url: '/editor'
    }
]

export default menuList