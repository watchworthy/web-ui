import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

const LoginForm = () => {
  const LOGIN_ENDPOINT = 'http://localhost:8081/auth';
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: any) => {
    setLoading(true);
    const data = {
      username: values.username,
      password: values.password,
    };

    axios
      .post(LOGIN_ENDPOINT, data)
      .then((response) => {
        const token = response.data;
        message.success('Successfully logged in!');
        localStorage.setItem('token', token);
        router.push('http://localhost:3000');
      })
      .catch((error) => {
        message.success('Something went wrong!');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <div>
      <h1>Login</h1>
      <Form
        name="loginForm"
        initialValues={formValues}
        onFinish={handleSubmit}
        style={{ marginTop: '200px' }}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
          ]}
        >
          <Input
            size="large"
            placeholder="Username"
            onChange={(e) =>
              setFormValues({ ...formValues, username: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            size="large"
            placeholder="Password"
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={handleForgotPassword}>
        Forgot Password
      </Button>
    </div>
  );
};

export default LoginForm;
