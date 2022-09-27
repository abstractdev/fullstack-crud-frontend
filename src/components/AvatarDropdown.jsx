import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedin } from "../features/userSlice";
import apiPaths from "../apiPaths";

function AvatarDropdown() {
  const dispatch = useDispatch();
  const paths = apiPaths();
  const userData = useSelector((state) => state.user);

  async function handleLogout() {
    const res = await fetch(paths.userLogoutPost, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const resData = await res.json();
    if ("200" in resData) {
      dispatch(setIsLoggedin());
    }
  }
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to="/dashboard">Dashboard</Link>,
        },
        {
          key: "2",
          label: (
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          ),
        },
      ]}
    />
  );
  return (
    <Dropdown overlay={menu}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {`${userData.user.name}`}
          <UserOutlined />
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}

export default AvatarDropdown;
