import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllOrder, fetchLoginInfo, updateUser } from "./userApi";


export const fetchAllOrderByUserAsync = createAsyncThunk(
    "order/fetchAllOrderByUserAsync",
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
        console.log(userId)
        const response = await updateUser(userId)
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
            .addCase(fetchAllOrderByUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllOrderByUserAsync.fulfilled, (state, action) => {
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