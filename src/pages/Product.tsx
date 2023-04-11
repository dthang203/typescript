import React, { useEffect, useState } from 'react';
import { Button, Card, Col, List, Menu, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { getAllProduct } from '../api/product';
import { IProduct } from '../types/products';
import { getAllCategories } from '../api/categories';
import { ICategory } from '../types/categories';

interface ICateId {
    _id: string;
}
interface IData {
    _id: string | undefined,
    name: string,
    price: string,
    img: string,
    description: string,
    categoryId: ICateId
}


interface DataType {
    key: string | number;
    _id: string;
    name: string;
    price: number;
    description: string
}

interface Icheck {
    _id: string
}
interface Cate {
    label: string,
    _id: string,
    name: string,
    categoryId: string
}

const Product = () => {
    const [items, setItems] = useState<DataType[]>([])

    const { Meta } = Card;

    const params = useLocation();
    const id = params.search.split("=")[1] || 'all'
    const [cate, setCategory] = useState<DataType[]>([])
    const obj = {
        key: "all",
        // _id:'all',
        label: <Link to={`/products?cate=all`}>All</Link>
    }
    const data = cate.concat(obj)
    useEffect(() => {
        getAllProduct()
            .then(data => {
                if (id == 'all') {
                    setItems(data.data.map((item: IData) => {
                        return {
                            key: item._id,
                            ...item
                        }
                    })
                    )
                } else {
                    setItems(data.data.map((item: IData) => {
                        return {
                            key: item._id,
                            ...item
                        }
                    }).filter((item: Cate) => item?.categoryId == id)
                    )
                }
            })
            .catch((err) => console.log(err))
    }, [id])

    useEffect(() => {
        getAllCategories()
            .then(data => {
                setCategory(data.data.map((item: ICategory) => {
                    return {
                        _id: item._id,
                        label: <Link to={`/products?cate=${item._id}`}>{item.name}</Link>
                    }
                }))
            })
            .catch((err) => console.log(err))
    }, [])


    return (
        <Space style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Menu
                items={data}
                style={{ marginTop: '20px', width: 200, height: '100%' }}
            >

            </Menu>

            <List
                pagination={{ pageSize: 8 }}
                grid={{ gutter: 8 }}
                renderItem={(product, index) => {
                    return (
                        <Col span={8}>

                            <Card
                                key={index}
                                hoverable
                                cover={<img alt="example" src="https://assets.thehansindia.com/h-upload/2022/07/18/1303611-pro.webp" />}
                                style={{ margin: '10px 0', width: 290, overflow: 'hidden', boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
                            >
                                <Meta title={<h3 style={{ fontSize: '20px', marginBottom: '0' }}><Link to={`/products/${product?._id}`}>{product?.name}</Link></h3>} />
                                <div>
                                    <p>Price: {product?.price}</p>
                                    <div>
                                        <Button style={{ width: '100%' }}><Link to={`/products/${product?._id}`}>Show more</Link> </Button>
                                    </div>
                                </div>

                            </Card>
                        </Col>
                    )
                }}
                dataSource={items}
            >

            </List>
        </Space>
    )
}
export default Product;