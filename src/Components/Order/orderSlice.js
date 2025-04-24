import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminOrderUpdata, creatOrder, fetchAllOrder } from "./orderApi";

export const createOrderAsync = createAsyncThunk(
  "order/createOrderAsync",
  async (order) => {
    const response = await creatOrder(order);
    return response.data;
  }
);

export const fetchAllOrderByAdminAsync = createAsyncThunk(
  "order/fetchAllOrderByAdminAsync",
  async (pagination) => {
    const response = await fetchAllOrder(pagination);
    return response.data;
  }
);
export const adminOrderUpdataAsync = createAsyncThunk(
  "order/adminOrderUpdataAsync",
  async (order) => {
    const response = await adminOrderUpdata(order)
    return response.data;
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    isLoading: false,
    isError: null,
    currentOrder: null,
    totalOrder: 0,
  },
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrderByAdminAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOrderByAdminAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order
        state.totalOrder = action.payload.totalOrder;
      })
      .addCase(adminOrderUpdataAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.order.findIndex((order)=>order.id=== action.payload.id)
        state.totalOrder[index] = action.payload ;
      })
  },
});


export const { resetOrder } = orderSlice.actions;

export const order = (state) => state.order.order;
export const currentOrder = (state) => state.order.currentOrder;
export const selectedOrder = (state) => state.order.order;
export const seletedTotalOrder = (state) => state.order.totalOrder;

export default orderSlice.reducer;