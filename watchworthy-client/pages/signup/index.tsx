import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';

const signup = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div style={{ margin: '30px', width: '400px' }}>
      <Form
        name="signup"
        onFinish={onFinish}
        initialValues={{ remmber: true }}
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="username"
          label="User Name"
          rules={[
            { required: true, message: 'Please input your first username!' },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="User Name" />
        </Form.Item>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button style={{ flex: 1 }} type="primary" htmlType="submit">
            Sign Up
          </Button>
          <br />
          <Link style={{ color: 'black' }} href="/sigin">
            Already have an account! Sign In
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default signup;
