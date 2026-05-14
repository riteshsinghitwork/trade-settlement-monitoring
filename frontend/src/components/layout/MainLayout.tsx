import {Layout} from 'antd';
import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';
import { Header } from 'antd/es/layout/layout';

const {Content, Footer} = Layout

export default function MainLayout() {
    return (
        <Layout style={{minHeight:'100vh'}}>
            <Sidebar />
            <Layout>
                <Header/>
                <Content style={{margin:16, padding:24, background: '#fff', borderRadius:8}}>
                    <Outlet />
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Trade Settlement Monitor 
                    </Footer>
            </Layout>
        </Layout>
    );
}