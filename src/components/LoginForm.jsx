import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import apiPaths from "../apiPaths";

function LoginForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const paths = apiPaths();

  async function handleFormSubmit(values) {
    const res = await fetch(paths.userLoginPost, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(values),
    });
    const resData = await res.json();
    if ("200" in resData) {
      navigate("/dashboard");
    }
  }
  return (
    <Form
      name="login"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleFormSubmit}
      autoComplete="off"
      form={form}
    >
      <Form.Item wrapperCol={{ sm: { offset: 8 } }}>
        <h1>
          <strong>Log In</strong>
        </h1>
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please enter your email",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please enter your password",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ sm: { offset: 8 } }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
