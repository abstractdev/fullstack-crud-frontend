import { Button, Form, Input, Checkbox, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiPaths from "../apiPaths";
import { setIsLoggedin } from "../features/userSlice";

function SignupForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const paths = apiPaths();
  const dispatch = useDispatch();

  async function handleFormSubmit(values) {
    //if both checkboxes are checked or neither are checked, return
    if (values.Admin === values.User) return;
    //if Admin is checked, remove Admin and User properties from values object and add role property with value "ADMIN"
    else if (values.Admin) {
      ["Admin", "User"].forEach((e) => delete values[e]);
      values.role = "ADMIN";
      //if User is checked, remove Admin and User properties from values object and add role property with value "USER"
    } else if (values.User) {
      ["Admin", "User"].forEach((e) => delete values[e]);
      values.role = "USER";
    }
    const res = await fetch(paths.userSignupPost, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(values),
    });
    const resData = await res.json();
    if ("200" in resData) {
      dispatch(setIsLoggedin());
      navigate("/dashboard");
    }
  }
  return (
    <Form
      form={form}
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
      autoComplete="off"
      onFinish={handleFormSubmit}
    >
      <Form.Item wrapperCol={{ sm: { offset: 8 } }}>
        <h1>
          <strong>Sign Up</strong>
        </h1>
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please enter your name",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please enter your email",
            type: "email",
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
      <Form.Item
        label="Confirm"
        name="passwordConfirmation"
        rules={[
          {
            required: true,
            message: "Please enter your password",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Row align="middle" justify="end">
        <Col span={10} type="flex">
          <Form.Item
            label="Admin"
            name="Admin"
            defaultValue={["ADMIN"]}
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </Col>

        <Col span={10} type="flex">
          <Form.Item
            label="User"
            name="User"
            defaultValue={["USER"]}
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item wrapperCol={{ sm: { offset: 8 } }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignupForm;
