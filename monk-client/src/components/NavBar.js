import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { HomeFilled, UserAddOutlined, LoginOutlined } from '@ant-design/icons';

const { Header } = Layout;

const NavBar = () => {
  return (
    <Header className="header">
      {/* <div className="logo" /> */}
      <Menu style={{ display: 'flex', justifyContent: 'center' }} theme="dark" mode="horizontal" defaultSelectedKeys={['/']}>
        <Menu.Item key="/">
          <NavLink to="/">
            <HomeFilled />
            <span>Home</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/login">
          <NavLink to="/login">
          <LoginOutlined />
            <span>Login</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/signup">
          <NavLink to="/signup">
          <UserAddOutlined />
            <span>Signup</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default NavBar;
