import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./route/route";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getCatItemsByIdAsync } from "./Components/Cart/CartSlice";
import { fetchLoginInfoAsync } from "./Components/user/userSilce";
import { sleletedUser } from "./Components/auth/authSlice";

function App() {
  const user = useSelector(sleletedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getCatItemsByIdAsync(user.id));
      dispatch(fetchLoginInfoAsync(user.id))
    }
  }, [dispatch, user]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
