import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllOrder, fetchLoginInfo, updateUser } from "./userApi";


export const fetchAllOrderAsync = createAsyncThunk(
    "order/fetchAllOrderAsync",
    async (userId) => {
    const response = await fetchAllOrder(userId);
    return response.data;
});


 export const fetchLoginInfoAsync = createAsyncThunk(
    "user/fetchLoginInfoAsync", 
    async(id)=>{
        const response = await fetchLoginInfo(id)       
        return response.data ;
    })

export const updateUserAsync = createAsyncThunk(
    "user/updateUserAsync",
    async (userId) => {
        const response = await updateUser(userId)
        // const data = await response.json();
        // return { data };
        return response.data;
    })



const initialState = {
    userOrders: [],
    isLoading: false,
    isError: null,
    userLoginInfo: null,
};

// create order slice 
const myOrderSlice = createSlice({
    name: "myOrder",
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrderAsync.pending, (state) => {
                state.isLoading = true;
            }).addCase(fetchAllOrderAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userOrders = action.payload;
            })
            .addCase(fetchLoginInfoAsync.pending, (state) => {
                state.isLoading = true;
            }).addCase(fetchLoginInfoAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userLoginInfo = action.payload;
            })
    }
})



export const myOrder = (state) => state.myOrder.userOrders
export const selectedUserLoginInfo = (state) => state.myOrder.userLoginInfo

export default myOrderSlice.reducer