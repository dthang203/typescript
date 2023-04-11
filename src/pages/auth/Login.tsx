import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { postLogin } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import instance from '../../api/instance';

export default function Login() {
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        console.log('Success:', values);
        postLogin(values)
            .then(data => {
                console.log('Success:', data);
                message.success('Đăng nhập thành công');
                const objData = {
                    accessToken: data.data.accessToken,
                    ...data.data.user
                }
                console.log(objData);
                localStorage.setItem('user', JSON.stringify(objData))
                instance.defaults.headers.common['Authorization'] = `Bearer ${objData.accessToken}`;

                navigate("/products")

            })
            .catch(err => {
                console.log('Error:', err);
                message.error(err.response.data.message);
            })

    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item

                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input
                />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password
                />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
