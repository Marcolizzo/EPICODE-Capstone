// const client = new AxiosClient();
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../client/client";


export const signupUser = createAsyncThunk(
  "signup",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await AxiosClient.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users`,
        userData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  status: 'idle'
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.user = action.payload
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default signupSlice.reducer;