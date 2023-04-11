import React, { useEffect, useState } from 'react'
import { ICategory } from '../../../types/categories'
import { useNavigate, useParams } from 'react-router-dom'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { Button, Checkbox, Form, Input, Select, message } from 'antd';


interface IProps {
    categories: ICategory[],
    onUpdateC: (id: string | undefined, category: ICategory) => void
}

export default function CategoriesUpdate(props: IProps) {
    const { id } = useParams()
    const navigate = useNavigate()
    const handleChange = (value: string | string[]) => {
        console.log(`Selected: ${value}`);
    };
    const [size] = useState<SizeType>('middle');

    const [product, setProduct] = useState<ICategory>() // khởi tạo biến state product có kiểu dữ liệu là IProduct
    useEffect(() => { // khi props thay đổi thì sẽ chạy useEffect này
        const currentProduct = props.categories.find((category: ICategory) => category._id == id)
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

        })
    }

    const onFinish = (values: any) => {
        console.log(values)
        delete values.id
        props.onUpdateC(id, values)
        // .then(data => {
        //     console.log('Success:', data);
        //     message.success('Update thành công');
        //     navigate('/admin/all')
        // })
        navigate('/admin/categories')

    };

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
                label="Category Name"
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Update Product
                </Button>
            </Form.Item>
        </Form>
    )
}
