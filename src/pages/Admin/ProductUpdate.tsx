import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import { IProduct } from '../../types/products';
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input, Select, message } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { getAllCategories } from '../../api/categories';

interface IProps {
    products: IProduct[],
    onUpdate: (id: string | undefined, product: IProduct) => void
}
interface Cate {
    _id: string
    name: string
    products: []
}

export default function ProductUpdate(props: IProps) {
    const { id } = useParams()
    const navigate = useNavigate()
    const handleChange = (value: string | string[]) => {
        console.log(`Selected: ${value}`);
    };
    const [size] = useState<SizeType>('middle');

    const [product, setProduct] = useState<IProduct>() // khởi tạo biến state product có kiểu dữ liệu là IProduct
    useEffect(() => { // khi props thay đổi thì sẽ chạy useEffect này
        const currentProduct = props.products.find((product: IProduct) => product._id == id)
        // tìm trong mảng props.products có phần tử nào có id trùng với id trên url không
        setProduct(currentProduct) // nếu có thì set lại giá trị cho biến product
    }, [props])
    useEffect(() => { // khi biến product thay đổi thì sẽ chạy useEffect này
        setFields() // gọi hàm setFields để set lại giá trị cho các input
    }, [product])
    const [form] = Form.useForm();
    // khởi tạo một instance của Form và gán vào biến form
    // Instance của form là một đối tượng được tạo ra bởi Ant Design để thực hiện các chức năng của form trong React

    const setFields = () => {// hàm này để set lại giá trị cho các input
        form.setFieldsValue({ // gọi hàm setFieldsValue của instance form để set lại giá trị cho các input dựa vào giá trị của biến product
            id: product?._id,
            name: product?.name,
            price: product?.price,
            // image: product?.image,
            description: product?.description,
            categoryId: product?.categoryId
        })
    }

    const onFinish = (values: any) => {
        console.log(values)
        delete values.id
        props.onUpdate(id, values)
        // .then(data => {
        //     console.log('Success:', data);
        //     message.success('Update thành công');
        //     navigate('/admin/all')
        // })
        // navigate('/admin/all')

    };

    // const onFinishFailed = (errorInfo: any) => {
    //     console.log('Failed:', errorInfo);
    // };


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


        <Form
            form={form}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
        >
            {/* đoạn này cần truyền cả id vào form khi submit để lấy được giá trị id truyền lên component App */}
            <Form.Item
                label=""
                name="id"
                style={{ display: 'none' }} // ẩn input này đi
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>


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

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Update Product
                </Button>
            </Form.Item>
        </Form>
    )
}
