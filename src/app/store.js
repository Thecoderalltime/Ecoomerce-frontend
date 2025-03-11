import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Components/ProductPage/productSlice";
import authReducer from "../Components/auth/authSlice";
import cartReducer from "../Components/Cart/CartSlice"
import createOrder from "../Components/Order/orderSlice";
import myOrder from "../Components/user/userSilce"

// create store
const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: createOrder,
    myOrder: myOrder
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
