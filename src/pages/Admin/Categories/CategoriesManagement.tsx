import React from 'react'
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom'
import { ICategory } from '../../../types/categories';
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

const onSearch = (value: string) => console.log(value);

interface DataType {
    key: string | undefined;
    _id: string | undefined;
    name: string;
}
interface IPropsC {
    categories: ICategory[],
    onRemoveC: (id: string | undefined) => void
}

export default function CategoriesManagement(props: IPropsC) {
    const removeCategory = (id: string | undefined) => {
        props.onRemoveC(id)
    }
    console.log(props);
    console.log(props?.categories);


    const columns: ColumnsType<DataType> = [
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => removeCategory(record._id)}>Remove</Button>
                    <Button type="primary" ><Link to={`/admin/categories/update/${record._id}`}>Update</Link></Button>
                </Space>
            ),
        },
    ];

    const data: DataType[] = props.categories.map((item: ICategory) => {
        return {
            key: item._id,
            ...item
        }
    })
    console.log(data)
    return (
        <div>
            <Button type='primary'><Link to={'add'}>Add New Category</Link></Button>
            <Search
                placeholder="Search Category"
                enterButton="Search"
                size="large"
                suffix={suffix}
                onSearch={onSearch}
            />
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
        </div>
    )
}
