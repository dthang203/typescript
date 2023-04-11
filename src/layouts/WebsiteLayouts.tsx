import {
    PieChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { Input } from 'antd';

export default function WebsiteLayouts() {
    const { Search } = Input;
    const { Header, Content, Footer } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', background: 'white' }}>
                <div
                    style={{
                        float: 'left',
                        width: 120,
                        height: 31,
                        margin: '16px 24px 16px 0',
                        background: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        color: "black",
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        alignItems: "center",
                        fontSize: '23px',
                    }}
                >FPT</div>
                <Menu

                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                // items={new Array(3).fill(null).map((_, index) => ({
                //     key: String(index + 1),
                //     label: `nav ${index + 1}`,
                // }))}
                >
                    <Menu.Item key='1'>
                        <Link to="/products"><PieChartOutlined /> Products</Link>
                    </Menu.Item>
                    <Menu.Item key='2'>
                        <Link to="/admin">Admin</Link>
                    </Menu.Item>
                    <Menu.Item key='3'>
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                    <Menu.Item key='4'>
                        <Link to="/register">Register</Link>
                    </Menu.Item>

                </Menu>
                {/* <Search  style={{ float:'right',width:"700px", display:'flex',alignItems:'center'}} placeholder="input search text" enterButton="Search" size="large" /> */}
            </Header>
            <Content className="site-layout">
                <div style={{ padding: 24, minHeight: 600, background: colorBgContainer }}>{<Outlet />}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    )
}
