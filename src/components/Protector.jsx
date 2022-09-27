import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Protector({ children }) {
  const userData = useSelector((state) => state.user);
  console.log(userData)
  if (!userData.isLoggedin) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default Protector;
