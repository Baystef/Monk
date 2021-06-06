import { Layout, Menu, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { HomeFilled, UserAddOutlined, LoginOutlined, PlusOutlined, NotificationFilled } from '@ant-design/icons';

const { Header } = Layout;

const NavBar = () => {
  const location = useLocation();
  const { authenticated } = useSelector(state => state.user);

  return (
    <Header className="header">
      {/* <div className="logo" /> */}
      {authenticated ? (
        <div style={{ display: 'flex', justifyContent: 'center', }}>
          <Tooltip title="New Post" placement="top">
            <div className="ant-menu-item">
              <PlusOutlined />
            </div>
          </Tooltip>
          <Tooltip title="Home" placement="top">
            <div className="ant-menu-item">
              <NavLink to="/" >
                <HomeFilled />
              </NavLink>
            </div>
          </Tooltip>
          <Tooltip title="Notifications" placement="top">
            <div className="ant-menu-item">
              <NotificationFilled />
            </div>
          </Tooltip>
        </div>
      ) : (
        <Menu style={{ display: 'flex', justifyContent: 'center' }} theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
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
      )}
    </Header>
  )
}

export default NavBar;
