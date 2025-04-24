import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCartItem,
  deleteItemFormCart,
  getCatItemsById,
  resetCart,
  updateCartItemByCartId,
} from "./CartApi";

export const addItemsAsync = createAsyncThunk(
  "addTocart/addItemsAsync",
  async (item) => {
    const response = await addCartItem(item);
    return response.data;
  }
);

export const getCatItemsByIdAsync = createAsyncThunk(
  "addTocart/getCatItemsByIdAsync",
  async (userId) => {
    const resposne = await getCatItemsById(userId);
    return resposne.data;
  }
);

export const updateCartItemByCartIdAsync = createAsyncThunk(
  "cart/updateCartItemByCartId",
  async (updateData) => {
    const response = await updateCartItemByCartId(updateData);
    return response.data;
  }
);

export const deleteItemFormCartAsync = createAsyncThunk(
  "cart/deleteItemFormCart",
  async (cartId) => {
    const response = await deleteItemFormCart(cartId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCartAsync",
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);

const addToCartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    isLoading: false,
    isError: null,
  },
  extraReducers: (builder) => {
    builder
      // .addCase(addItemsAsync.fulfilled, (state, action) => {
      //   state.items = [...state.items, action.payload];
      // })
      .addCase(addItemsAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addItemsAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCatItemsByIdAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCatItemsByIdAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(updateCartItemByCartIdAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateCartItemByCartIdAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteItemFormCartAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteItemFormCartAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
        state.isLoading = false;
      })
      .addCase(resetCartAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.items= []
        state.isLoading = false;
      });
  },
});

export default addToCartSlice.reducer;
export const cartItem = (state) => state.cart.items;
