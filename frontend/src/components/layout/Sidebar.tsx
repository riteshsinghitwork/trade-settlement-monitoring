import { useState } from "react";
import { Layout, Menu } from "antd";
import {
    DashboardOutlined,
    LineChartOutlined,
    WarningOutlined,
    SearchOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Link, useLocation} from 'react-router-dom';

const {Sider} = Layout;
export default function Sidebar(){
    const [collapased,setCollapsed]=useState(false);
    const location=useLocation();
    const items= [
        {key:'/dashboard', icon:<DashboardOutlined/>, label:<Link to="/dashboard">Dashboard</Link>},
        {key:'/trades', icon:<LineChartOutlined/>, label:<Link to="/trades">Trades</Link>},
        {key:'/exceptions', icon:<WarningOutlined/>, label:<Link to="/exceptions">Exception</Link>},
        {key:'/search', icon:<SearchOutlined/>, label:<Link to="/search">Search</Link>},
        {key:'/profile', icon:<UserOutlined/>, label:<Link to="/profile">Profile</Link>},

    ];

    return (
        <Sider collapsible collapsed={collapased} onCollapse={setCollapsed}>
            <div style={{height:48,margin:16, color:'#fff', fontWeight:600,textAlign: 'center'}}>
                {collapased ? 'TS': 'TradeSettle'}
            </div>
            <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={items} />
        </Sider>
    );
}