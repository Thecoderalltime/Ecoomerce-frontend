import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync, sleletedUser } from "../authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const user = useSelector(sleletedUser);
  const dispath = useDispatch();
  useEffect(() => {
    dispath(logoutUserAsync());
  }, []);
  return <>{!user && <Navigate to={"/login"} replace={true}></Navigate>}</>;
};

export default Logout;
