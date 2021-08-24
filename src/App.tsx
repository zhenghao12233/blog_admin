import React, { useState, useEffect } from 'react';
import Home from './pages/home/home'
import Login from './pages/login/login'
const { Link, BrowserRouter, Route, Switch, Redirect,HashRouter } = require('react-router-dom')

const App = () => {
  // const [count, setCount] = useState(0)
  // const editCount = (num) => {
  //   setCount(count + num)
  // }
  // let obj = {
  //   fn: editCount, count
  // }
  return (
    <HashRouter>
      {/* <Life {...obj}></Life> */}

      <Switch>
        {/* <Route path="/" exact render={() => <Redirect to="/comp1"/> } /> */}
        {/* <Route path="/life" {...obj} component={Life}></Route>
            <Route path="/self" component={Self}></Route> */}
        {/* <Route exact path="/comp2" component={Comp2}></Route>  */}
        <Route path="/manage/login" component={Login}></Route>
        <Route path="/manage" component={Home} ></Route>
        <Redirect to="/manage"></Redirect>
      </Switch>

    </HashRouter>
  );
}

export default App;
