import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter, Route, NavLink, Switch,Redirect } from 'react-router-dom'
import lifecss from './Life.module.css'
import Home from '../pages/home/home'
import Mine from '../pages/mine/mine'
// 局部样式   命名规则: xxx.module.css     

//                   引入方式 import xxx from 'xxx.module.css'

//                   用法：<div className={xxx.styleName}>

//  

// 全局样式     命名规则: xxx.css   

//                    引入方式 import ‘xxx.css’

//                    用法：<div className='styleName'>
const Life = (props) => {
    const [count, setCount] = useState(0)
    // console.log(props)
    useEffect(() => {
        console.log("组件每次更新后对会执行", count);
    })

    useEffect(() => {
        console.log("一次执行后，count 值发生变化后会再次执行", count);
    }, [count])

    useEffect(() => {
        console.log("componentDidMount"); // 会执行一遍
        //
        return function cleanup() { console.log("组件被卸载componentWillUnmount") };
    }, [])

    const editCountFun = (e, num) => {
        setCount(count + num)
    }
    const editFatherCount = (e, num) => {
        props.fn(num)
    }
    return (
        <div>
            <h1>函数组件，生命周期</h1>
            <button onClick={e => editCountFun(e, 2)}>修改count值{count}</button>
            <div>父组件传过来的count值{props.count}</div>
            <button onClick={e => editFatherCount(e, 2)}>修改父组件的count的值</button>
            <div>
                <Link to="/life">跳往Life组件</Link>
                <div></div>
                <Link to="/self">跳往self组件</Link>
                <div></div>
                <NavLink activeClassName={lifecss.active} to="/life" >动态高亮跳转life组件</NavLink>
                <div></div>
                <NavLink activeClassName={lifecss.active} to="/self" >动态高亮跳转self组件</NavLink>
            </div>
            <div>
                <NavLink activeClassName={lifecss.active} to="/life/home/5">跳往Home子组件组件</NavLink>
                <div></div>
                <NavLink activeClassName={lifecss.active} to="/life/mine?id=6">跳往Mine子组件</NavLink>
            </div>
             
            {/* <Switch> */}
                <Route path="/life/home/:id"  component={Home}></Route>
                <Route path="/life/mine" component={Mine}></Route>
                {/* <Redirect to="/life/mine" /> */}
            {/* </Switc h> */}
        </div>
    );
}

export default Life;
