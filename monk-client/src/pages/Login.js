import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Row, Col, Typography, Form, Input, Button, Spin } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import {  useSelector, useDispatch } from 'react-redux';

import { loginUser } from '../redux/actions/userActions';

import Icon from '../images/monk-icon.png';

const { Title, Text } = Typography;

const style = {
  loginContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    width: '80px',
    height: '80px',
    margin: '10px auto 10px auto'
  },
  submit: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '1rem',
  },
  forgot: {
    textAlign: 'right'
  }
};



const Login = () => {
  const [userDets, setUserDets] = useState({ email: '', password: '' })
  // const [loading, setLoading] = useState(false);
  // const [errors, setErrors] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { loading, errors } = useSelector(state => state.UI);

  const onFinish = (values) => {
    console.log('Success:', values);
    dispatch(loginUser(values, history))
  };

  const onChange = ({ target: { name, value } }) => {
    setUserDets(prevState => ({ ...prevState, [name]: value }))
  }

  return (
    <Row style={{ textAlign: 'center' }}>
      <Col span={8}></Col>
      <Col span={8} style={style.loginContainer}>
        <img src={Icon} alt="monk logo" style={style.image} />
        <Typography>
          <Title level={2}>Login</Title>
        </Typography>
        <div style={style.formContainer}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input name="email" onChange={onChange} value={userDets.email} type="email" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            {errors?.email && <Text type="danger">{errors.email}</Text>}
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                name="password"
                type="password"
                placeholder="Password"
                value={userDets.password}
                onChange={onChange}
              />
            </Form.Item>
            {errors?.password && <Text type="danger">{errors.password}</Text>}
            <Form.Item style={style.forgot}>
              <a className="login-form-forgot" href="#*">
                <small>forgot password?</small>
              </a>
            </Form.Item>

            {errors?.error && <Text type="danger">{errors.error}</Text>}
            <br />
            <Form.Item>
              <Button type="primary" htmlType="submit" style={style.submit} className="login-form-button" disabled={loading}>
                {loading ? <Spin /> : 'Log in'}
              </Button>
              {" "}Or<br /> Don't have an account? <Link to="/signup">Register Now!</Link>
            </Form.Item>
          </Form>
        </div>
      </Col>
      <Col span={8}></Col>
    </Row>
  )
}

export default Login;
