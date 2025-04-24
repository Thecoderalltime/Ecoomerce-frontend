import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, logoutUser } from "./authApi";
import { updateUser } from "../user/userApi";


export const createUserAsync = createAsyncThunk(
  "user/createUserAsync",
  async (userInfo) => {
    const response = await createUser(userInfo);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/createAsyncThunk",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(userInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error)

    }
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUserAsync",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const logoutUserAsync = createAsyncThunk(
  "user/logoutUserAsync",
  async () => {
    const response = await logoutUser()
    return response.data;
  })
const authSlice = createSlice({
  name: "user",
  initialState: {
    userLogin: null,
    isLoading: false,
    isError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.userLogin = action.payload;
        state.isLoading = false;
      })
      .addCase(checkUserAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.userLogin = action.payload;
        state.isLoading = false;
        

      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        

      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.userLogin = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.is = action.payload;
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.userLogin = null;
        state.isLoading = false;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.is = action.error.message;
      });
  },
});

export const sleletedUser = (state) => state.auth.userLogin;
export const loginUser = (state) => state.auth.userLogin
export const loginUserError = (state) => state.auth.isError

export default authSlice.reducer;
