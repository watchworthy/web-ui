import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

const LoginForm = () => {
  const LOGIN_ENDPOINT = 'http://localhost:8081/user/login';
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: any) => {
    setLoading(true);
    const data = {
      email: values.email,
      password: values.password,
    };

    axios
      .post(LOGIN_ENDPOINT, data)
      .then((response) => {
        const token = response.data.token;
        message.success('Successfully logged in!');
        localStorage.setItem('token', token);
        router.push('/');
      })
      .catch((error) => {
        message.success('Something went wrong!');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email address!' },
          ]}
        >
          <Input
            size="large"
            placeholder="Email"
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
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
    </div>
  );
};

export default LoginForm;
