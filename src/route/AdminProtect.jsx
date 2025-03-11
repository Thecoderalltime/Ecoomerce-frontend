import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { sleletedUser } from "../Components/auth/authSlice";

const AdminProtect = ({ children }) => {
  const user = useSelector(sleletedUser);
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  console.log(user && user.role=="admin")
  if (user && user.role !== "admin") {
    return <Navigate to="/"  replace={true} ></Navigate>;
  }
  
  return children;
};

export default AdminProtect;
