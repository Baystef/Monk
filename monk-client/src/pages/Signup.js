import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Row, Col, Typography, Form, Input, Button, Spin } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import {  useSelector, useDispatch } from 'react-redux';

import { signupUser } from '../redux/actions/userActions';


import Icon from '../images/monk-icon.png';

const { Title, Text } = Typography;

const style = {
  signupContainer: {
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



const Signup = () => {
  const [userDets, setUserDets] = useState({ email: '', password: '', handle: '', confirmPassword: '' })
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, errors } = useSelector(state => state.UI);

  const onFinish = (values) => {
    console.log('Success:', values);
    dispatch(signupUser(values, history))
  };

  const onChange = ({ target: { name, value } }) => {
    setUserDets(prevState => ({ ...prevState, [name]: value }))
  }

  return (
    <Row style={{ textAlign: 'center' }}>
      <Col span={8}></Col>
      <Col span={8} style={style.signupContainer}>
        <img src={Icon} alt="monk logo" style={style.image} />
        <Typography>
          <Title level={2}>Signup</Title>
        </Typography>
        <div style={style.formContainer}>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
          >
             <Form.Item
              name="handle"
              rules={[
                {
                  required: true,
                  message: 'Please input your Handle!',
                },
              ]}
            >
              <Input name="handle" onChange={onChange} value={userDets.handle} type="text" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Handle" />
            </Form.Item>
            {errors?.handle && <Text type="danger">{errors.handle}</Text>}

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
            
           
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your ConfirmPassword!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={userDets.confirmPassword}
                onChange={onChange}
              />
            </Form.Item>
            {errors?.confirmPassword && <Text type="danger">{errors.confirmPassword}</Text>}
              
            {errors?.error && <Text type="danger">{errors.error}</Text>}
            <br />
            <Form.Item>
              <Button type="primary" htmlType="submit" style={style.submit} className="login-form-button" disabled={loading}>
               {loading ? <Spin /> :  'Signup' }
            </Button>
              {" "}Or<br />  Already have an account? <Link to="/login">Login</Link>
            </Form.Item>
          </Form>
        </div>
      </Col>
      <Col span={8}></Col>
    </Row>
  )
}

export default Signup;
