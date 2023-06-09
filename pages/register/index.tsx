import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SigninForm = () => {
  const SINGUP_ENDPOINT = 'http://localhost:8081/user/signup';
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (values: any) => {
    setLoading(true);
    const data = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    axios
      .post(SINGUP_ENDPOINT, data)
      .then((response) => {
        message.success('Register successfully, please login!');
        router.push('/login');
        console.log(response, 'RESPONSE FROM SIGNUP');
      })
      .catch((error) => {
        message.error('Something went wrong, please try again!');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <Form
        name="registerForm"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        style={{ marginTop: '100px' }}
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
          name="firstName"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input
            size="large"
            placeholder="Name"
            onChange={(e) =>
              setFormValues({ ...formValues, firstName: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input
            size="large"
            placeholder="Last Name"
            onChange={(e) =>
              setFormValues({ ...formValues, lastName: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters long' },
          ]}
          hasFeedback
        >
          <Input.Password
            size="large"
            placeholder="Password"
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords do not match!')
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            size="large"
            placeholder="Confirm Password"
            onChange={(e) =>
              setFormValues({ ...formValues, confirmPassword: e.target.value })
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
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SigninForm;
