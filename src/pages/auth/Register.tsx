import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { postRegister } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        console.log('Success:', values);
        postRegister(values)
            .then(data => {
                console.log('Success:', data);
                message.success('Đăng ký thành công');
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
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input
                />
            </Form.Item>

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

            <Form.Item
                label="Confirm Password"
                name="confirmPassword"
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
