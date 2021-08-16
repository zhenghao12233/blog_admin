import React from 'react';
// const React = require('react')
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
// import './index.css';
import App from './App';
import memory from './utils/memoryUtils'
import storage from './utils/storageUtils'
memory.user = storage.getStorage("user")

ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
