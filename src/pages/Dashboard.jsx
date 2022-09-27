import { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { Col, Row, Space, Typography } from "antd";
import { getUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";

function Dashboard() {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  useEffect(() => {
    if (userData.isLoggedin) {
      dispatch(getUser());
    }
  }, []);

  return (
    <AppLayout>
      {userData.isLoggedin && (
        <>
          <Col>
            <Row>
              <Title>{`${userData.user.role} DASHBOARD`}</Title>
            </Row>
            <Row align="middle" justify="center">
              {userData.user.role === "USER" && (
                <Space>
                  <strong>{userData.user.name}</strong>
                  <UserDashboard />
                </Space>
              )}
            </Row>
          </Col>
          {userData.user.role === "ADMIN" && (
            <Space>
              <Row justify="center">
                <AdminDashboard />
              </Row>
            </Space>
          )}
        </>
      )}
    </AppLayout>
  );
}

export default Dashboard;
