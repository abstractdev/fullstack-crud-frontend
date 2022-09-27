import { Link } from "react-router-dom";
import AvatarDropdown from "../AvatarDropdown";
import styles from "./Nav.module.css";
import { useSelector } from "react-redux";
import { Typography } from "antd";

function Nav() {
  const { Title } = Typography;
  const userData = useSelector((state) => state.user);
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <Title level={3}>CRUD</Title>
      </Link>
      {userData.isLoggedin ? (
        <AvatarDropdown />
      ) : (
        <div className={styles["btn-container"]}>
          <Link to="/signup">
            <Title level={5}>Sign Up</Title>
          </Link>
          <Link to="/login">
            <Title level={5}>Log In</Title>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;
