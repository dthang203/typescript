import { SizeType } from 'antd/es/config-provider/SizeContext';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ICategory } from '../../../types/categories';
import { Button, Checkbox, Form, Input, Select, message } from 'antd';


interface IProps {
    onAddC: (category: ICategory) => void
}

export default function CategoriesAdd(props: IProps) {
    const navigate = useNavigate();
    const handleChange = (value: string | string[]) => {
        console.log(`Selected: ${value}`);
    };
    const [size] = useState<SizeType>('middle');

    const onFinish = (values: any) => {
        props.onAddC(values);
        navigate('/admin/categories')
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
                label="Product Name"
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Add New Category
                </Button>
            </Form.Item>
        </Form>
    )
}
