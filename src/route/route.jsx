import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";

import CheckOutPage from "../Components/CheckOutPage/CheckOutPage";
import ProductDetailsPage from "../Pages/ProductDetailsPage";
import Login from "../Pages/LoginPage/Login";
import SignUp from "../Pages/LoginPage/SignUp";
import ProtectRoute from "./protectRouter/ProtectRoute";
import CartPage from "../Components/Cart/CartPage";
import Page404 from "../Pages/Page404";
import MyOrder from "../Components/user/component/MyOrder";
import MyProfile from "../Components/user/component/MyProfile";
import OrderSuccessPage from "../Components/Order/OrderSuccessPage";
import LogoutPage from "../Pages/LoginPage/LogoutPage";
import ForgotPassword from "../Pages/LoginPage/ForgotPassword";
import AdminProtect from "./AdminProtect";
import AdminHomePage from "../Pages/AdminHonePage";
import AdminProductDetails from "../Components/admin/component/AdminProductDetails";
import AddProductFrom from "../Components/admin/component/AddProductFrom";
import AdminOrderPage from "../Pages/AdminOrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute>
        <HomePage />
      </ProtectRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/cart",
    element: (
      <ProtectRoute>
        <CartPage />
      </ProtectRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectRoute>
        <CheckOutPage />
      </ProtectRoute>
    ),
  },
  {
    path: "/productdetails/:id",
    element: (
      <ProtectRoute>
        <ProductDetailsPage />,
      </ProtectRoute>
    ),
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />,
  },
  {
    path: "/my-profile",
    element: <MyProfile />,
  },
  {
    path: "/my-order",
    element: <MyOrder />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  // admin rute start here
  {
    path: "/admin",
    element: (
      <AdminProtect>
        <AdminHomePage />
      </AdminProtect>
    ),
  },
  {
    path: "/admin/product-details/:id",
    element: (
      <AdminProtect>
        <AdminProductDetails />
      </AdminProtect>
    ),
  },
  {
    path: "/admin/addProduct-form",
    element: (
      <AdminProtect>
        <AddProductFrom />
      </AdminProtect>
    ),
  },
  {
    path: "/admin/addProduct-form/:id",
    element: (
      <AdminProtect>
        <AddProductFrom />
      </AdminProtect>
    ),
  },
  {
    path: "/admin/order",
    element: (
      <AdminProtect>
        <AdminOrderPage/>
      </AdminProtect>
    ),
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default router;
