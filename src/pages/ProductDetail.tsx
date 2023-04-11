import { Button, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IProduct } from '../types/products';
import { getOneProduct } from '../api/product';

interface IData {
    name: string;
    id: number;
    price: number;
    image: string;
    description: string;
}
export default function ProductDetail() {
    const { id } = useParams()
    console.log(id);
    const [detail, setDetail] = useState<Partial<IData>>()
    useEffect(() => {
        getOneProduct(id)
            .then(data => {
                console.log(data);
                setDetail(data.data)
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div style={{ marginTop: '30px', display: 'flex', gap: '40px', padding: '0 40px' }}>
            <div>
                <img style={{ width: '700px' }} src="https://assets.thehansindia.com/h-upload/2022/07/18/1303611-pro.webp" alt="" />

            </div>
            <div style={{ marginLeft: '90px' }}>
                <Typography.Title level={2}>{detail?.name}</Typography.Title>
                <Typography.Paragraph style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff4d4f' }}>{detail?.price} VNĐ</Typography.Paragraph>
                <Typography.Paragraph style={{ color: 'rgba(0,0,0,0.6)' }}>{detail?.description}</Typography.Paragraph>
                <Button danger style={{ width: '200px', height: '40px', marginTop: '30px' }} type="primary">Add to cart</Button>
            </div>

        </div>
    )
}



