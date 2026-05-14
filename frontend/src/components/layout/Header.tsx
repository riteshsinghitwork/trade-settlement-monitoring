import { Avatar, Button, Dropdown, Layout, Space } from "antd";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import type { RootState } from '../../store'
import { logout } from '../../store/slices/authSlice';
import { BellOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";




const {Header: AntHeader} = Layout

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((s: RootState)=> s.auth.user);

    const handleLogout=()=>
    {
      dispatch(logout());
      navigate('login');
    }

    const menu = {
        items:[
        {key:'profile', label:'Profile', icon: <UserOutlined />, onclick:()=>navigate('profile')},
        {key:'logout', label:'Logout', icon: <LogoutOutlined />, onclick: handleLogout},

        ],
    };

    return (
        <AntHeader style={{background:'#fff', padding:'0 24px', display:'flex', justifyContent:'flex-end'}}>
            <Space size="large">
                <Button type="text" icon={<BellOutlined />} />
                <Dropdown menu={menu}>
                    <Space style={{cursor:'pointer'}}>
                        <Avatar icon={<UserOutlined />} />
                        <span>{user?.fullName || 'Guest'}</span>
                    </Space>
                </Dropdown>
            </Space>
        </AntHeader>
    )

}