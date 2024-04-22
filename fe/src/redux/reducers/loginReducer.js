import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import AxiosClient from "../../client/client";
import { getProjects } from "./projectsReducer";
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
        localStorage.setItem("auth", JSON.stringify(action.payload.token));
        state.status = "succeeded";
        state.isLoading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default loginSlice.reducer;
