// const client = new AxiosClient();
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../client/client";
import axios from "axios";

export const getUserById = createAsyncThunk(
  "getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await AxiosClient.get(`/users/${userId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  "updateProfileImage",
  async ([userId, fileData], { rejectWithValue }) => {
    try {
      const res = await AxiosClient.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users/${userId}/updateProfileImage`,
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  status: "idle",
  error: null,
  image: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(updateProfileImage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.image = action.payload;
        state.error = null;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
