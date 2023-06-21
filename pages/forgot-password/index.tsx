import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ForgotPasswordForm = () => {
  const [formValues, setFormValues] = useState({ email: '' });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: any) => {
    setLoading(true);
    const data = {
      email: values.email,
    };

    axios
      .post(`http://localhost:8081/user/forgot-password`, data)
      .then((response) => {
        const token = response.data;
        message.success('Reset email send!');
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
      <h1>Reset your password</h1>
      <Form
        name="loginForm"
        initialValues={formValues}
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
            placeholder="email"
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
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
            Send reset link
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
