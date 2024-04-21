import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../client/client";
const client = new AxiosClient();

export const loginUser = createAsyncThunk(
  "/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await client.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/login`,
        userData
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("auth"),
  isLoading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("Logging out, clearing state and local storage");
      localStorage.removeItem("auth");
      localStorage.removeItem("userFirstName");
      state.user = null;
      state.token = null;
      state.isLoading = false
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("auth", JSON.stringify(action.payload.token));
        localStorage.setItem("userFirstName", action.payload.user.firstName);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default loginSlice.reducer;
