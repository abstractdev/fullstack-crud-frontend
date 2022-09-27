import { Button, Form, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiPaths from "../apiPaths";
import { setName } from "../features/userSlice";

function UserDashboard() {
  const [form] = Form.useForm();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const paths = apiPaths(userData.user.id);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function handleFormSubmit(values) {
    const res = await fetch(paths.userEditPut, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(values),
    });
    const resData = await res.json();
    dispatch(setName(resData.name));
    setIsModalOpen(false);
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit Name
      </Button>
      <Modal
        title="Edit Name"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form
          initialValues={{
            remember: true,
            name: userData.user.name,
          }}
          form={form}
          autoComplete="off"
          onFinish={handleFormSubmit}
        >
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
          <Row justify="end">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default UserDashboard;
