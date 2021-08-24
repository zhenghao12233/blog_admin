import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import './login.css'
import storage from '../../utils/storageUtils'
import memory from '../../utils/memoryUtils'

const login = (props) => {
    const user = memory.user
    console.log(user)
    if (user && user.username) {
        props.history.push("/manage")
    }

    const onFinish = (values) => {
        // console.log(props)
        // console.log('Success:', values);
        if (values.username == "zhenghao" && values.password == "123") {
            message.success("登录成功")
            storage.setStorage("user",{"username": "zhenghao"})
            memory.user = storage.getStorage("user")
            props.history.push("/manage")
            
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-box">
            <section>
                <div style={{textAlign: 'center'}}>登录</div>
                <Form
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    // initialValues={{
                    //     remember: true,
                    // }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {/* <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 6,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            // span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    );
}

export default login;
