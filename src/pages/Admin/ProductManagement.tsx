import React from 'react'
import { Space, Table, Button, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IProduct } from '../../types/products';
import { Link } from 'react-router-dom'
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

interface DataType {
    key: string | undefined;
    _id: string | undefined;
    name: string;
    price: number;
}
interface IProps {
    products: IProduct[],
    onRemove: (id: string | undefined) => void
}

const onSearch = (value: string) => console.log(value);

const ProductManagementPage = (props: IProps) => {
    const removeProduct = (id: string | undefined) => {
        props.onRemove(id)
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Product Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Product Image',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Product description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => removeProduct(record._id)}>Remove</Button>
                    <Button type="primary" ><Link to={`/admin/all/update/${record._id}`}>Update</Link></Button>
                </Space>
            ),
        },
    ];

    const data: DataType[] = props.products.map((item: IProduct) => {
        return {
            key: item._id,
            ...item
        }
    })
    console.log(data)
    return (
        <div>
            <Button type='primary'><Link to={'add'}>Add New Product</Link></Button>
            <Search
                placeholder="Search Product"
                enterButton="Search"
                size="large"
                suffix={suffix}
                onSearch={onSearch}
            />
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
        </div>
    )
}

export default ProductManagementPage