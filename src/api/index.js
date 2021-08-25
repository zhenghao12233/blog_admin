import axios from 'axios';
import { message } from 'antd';

axios.defaults.baseURL = 'http://47.108.172.171:8082/'
axios.interceptors.request.use(
    (config) => {
        console.log("post参数",config.data)
        console.log("get参数",config.params)
        config.headers = {
            "Content-Type": "application/json",
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
    (response) => {
        if (response.data.code != 0) {
            console.log(response.data.msg);
            // message.error(response.data.msg);
        }
        return response.data;
    },
    (error) => {
        console.log("请求出错：", error);
    }
);


export const ajax = (url, data = {}, method = 'get') => {
    if (method.includes('get', 'delete','put')) {
        return axios[method](url, { params: data })
    } else {
        console.log("data", data)
        return axios[method](url, data)
    }

}