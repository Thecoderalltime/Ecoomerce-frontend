import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { creatOrder, fetchAllOrder } from "./orderApi";

export const createOrderAsync = createAsyncThunk(
  "order/createOrderAsync",
  async (order) => {
    const response = await creatOrder(order);
    return response.data;
  }
);

export const fetchAllOrderAsync = createAsyncThunk(
  "product/fetchAllOrderAsync",
  async ( pagination ) => {
    const response = await fetchAllOrder(pagination);
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
    totalOrder:0,
  },
  reducers:{
    resetOrder:(state)=>{
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
      }).addCase(fetchAllOrderAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOrderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order
        state.totalOrder = action.payload.totalOrder;
      });
  },
});


export const {resetOrder}= orderSlice.actions;

export const order = (state) => state.order.order;
export const currentOrder = (state) => state.order.currentOrder;
export const selectedOrder = (state) => state.order.order;
export const seletedTotalOrder = (state) => state.order.totalOrder;

export default orderSlice.reducer;