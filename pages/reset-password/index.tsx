import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ResetPasswordForm = () => {
  const RESET_ENDPOINT = 'http://localhost:8081/user/reset-password';
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (values: any) => {
    setLoading(true);
    const data = {
      password: values.password,
      token: router.query.token,
    };

    axios
      .post(RESET_ENDPOINT, data)
      .then((response) => {
        message.success('Reset password successfully, please login!');
        router.push('/login');
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
      <h1>Reset Password</h1>
      <Form
        name="registerForm"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        style={{ marginTop: '100px' }}
      >
        
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
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
