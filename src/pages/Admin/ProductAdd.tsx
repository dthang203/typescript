// import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { IProduct } from '../../types/products';
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input, Select, message } from 'antd';
import { useEffect, useState } from "react";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { getAllCategories } from "../../api/categories";



interface IProps {
    onAdd: (product: IProduct) => void
}

interface Cate {
    _id: string
    name: string
    products: []
}
// interface IFormInput {
//     id: number;
//     name: string;
//     price: number
// }

export default function ProductAdd(props: IProps) {
    const navigate = useNavigate();
    const handleChange = (value: string | string[]) => {
        console.log(`Selected: ${value}`);
    };
    const [size] = useState<SizeType>('middle');

    const onFinish = (values: any) => {
        props.onAdd(values);
        navigate('/admin/all')
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const [categories, setCategories] = useState<Cate[]>([])
    const option = categories
    useEffect(() => {
        getAllCategories()
            .then(data => {
                setCategories(data.data.map((item: Cate) => {
                    return {
                        key: item._id,
                        label: item.name,
                        value: item._id
                    }
                }));
            })
    }, [])
    return (
        // <form onSubmit={handleSubmit(onHandleSubmit)}>
        //     <input type="text" {...register("name")} placeholder="Ten san pham" />
        //     <input type="number" {...register("price")} placeholder="Gia san pham" />
        //     <button>Submit</button>
        // </form>

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

            <Form.Item
                label="Product Price"
                name="price"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Image Price"
            // name="image"
            // rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description Price"
                name="description"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Category Price"
                name="categoryId"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Select
                    size={size}
                    defaultValue="Choose"
                    onChange={handleChange}
                    style={{ width: 200 }}
                    options={option}
                />
            </Form.Item>

            {/* <Select
                size={size}
                defaultValue="a1"
                onChange={handleChange}
                style={{ width: 200 }}
                options={[
                    { value: 'Điện thoại', label: 'Điện thoại' },
                    { value: 'Máy tính', label: 'Máy tính' },
                    { value: 'Đồng hồ', label: 'Đồng hồ' },
                ]}
            /> */}

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Add New Product
                </Button>
            </Form.Item>
        </Form>
    )
}
