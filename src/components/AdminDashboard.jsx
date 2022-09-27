import { Button, Form, Input, Modal, Row, Col, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiPaths from "../apiPaths";
import { setName } from "../features/userSlice";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function AdminDashboard() {
  const [form] = Form.useForm();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState(null);
  const [currentDataId, setCurrentDataId] = useState(null);

  useEffect(() => {
    const paths = apiPaths(userData.user.id);
    (async () => {
      const res = await fetch(paths.allUsersGet, {
        method: "GET",
        credentials: "include",
      });
      const userData = await res.json();
      setAllUsers(userData);
    })();
  }, []);

  const showModal = (event) => {
    setCurrentDataId(event.target.closest("[data-id]").dataset.id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function handleFormSubmit(values) {
    const paths = apiPaths(currentDataId);
    const res = await fetch(paths.userEditPut, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(values),
    });
    const resData = await res.json();
    //if put is successful, refetch all users
    if ("name" in resData) {
      const res = await fetch(paths.allUsersGet, {
        method: "GET",
        credentials: "include",
      });
      const resGet = await res.json();
      setAllUsers(resGet);
      //if the data-id of the put request matches the currently logged in user, update name in redux state
      if (currentDataId === userData.user.id) {
        dispatch(setName(resData.name));
      }
    }
    form.resetFields();
    setIsModalOpen(false);
  }

  async function handleDelete(event) {
    const paths = apiPaths(event.target.closest("[data-id]").dataset.id);
    const res = await fetch(paths.userDelete, {
      method: "DELETE",
      credentials: "include",
    });
    const resData = await res.json();
    //if delete is successful, remove user from local state to make ui update
    if ("200" in resData) {
      setAllUsers(allUsers.filter((e) => e.id !== resData["200"]));
    } else return;
  }

  return (
    <Col>
      {allUsers?.map((e) => {
        return (
          <Row type="flex" align="middle" justify="space-between" key={e.id}>
            {e.name}
            <Space>
              <Row key={e.id}>
                <button data-id={e.id}>
                  <EditOutlined
                    onClick={(event) => showModal(event)}
                    data-id={e.id}
                  >
                    Edit Name
                  </EditOutlined>
                </button>
                <button onClick={(event) => handleDelete(event)} data-id={e.id}>
                  <DeleteOutlined />
                </button>
              </Row>
            </Space>
            <Modal
              title="Edit Name"
              open={isModalOpen}
              onCancel={handleCancel}
              footer={[]}
            >
              <Form form={form} autoComplete="off" onFinish={handleFormSubmit}>
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
                    <Button type="primary" htmlType="submit" data-id={e.id}>
                      Submit
                    </Button>
                  </Form.Item>
                </Row>
              </Form>
            </Modal>
          </Row>
        );
      })}
    </Col>
  );
}

export default AdminDashboard;
