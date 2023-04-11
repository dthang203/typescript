import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
// import './AdminLayouts.css'


const { Header, Sider, Content } = Layout;

export default function AdminLayouts() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <img className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '0',
                            label: '',
                        },
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: (
                                <Link to="/admin">Admin</Link>
                            ),
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: (
                                <Link to="/admin/all">Products</Link>
                            ),
                        },
                        {
                            key: '3',
                            icon: <VideoCameraOutlined />,
                            label: (
                                <Link to="/admin/categories">Categories</Link>
                            ),
                        },
                        {
                            key: '4',
                            icon: <UploadOutlined />,
                            label: (
                                <Link to="/products">Client</Link>
                            ),
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}


