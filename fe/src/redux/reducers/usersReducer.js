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

export const updateUser = createAsyncThunk(
  "updateUser",
  async ([userId, formdata], { rejectWithValue }) => {
    try {
      const res = await AxiosClient.patch(`/users/${userId}`, formdata);
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

export const deleteProfileImage = createAsyncThunk(
  "deleteProfileImage",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await AxiosClient.post(`/users/${userId}/removeProfileImage`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "updatePassword",
  async ([userId, formdata], { rejectWithValue }) => {
    try {
      const res = await AxiosClient.patch(
        `/users/${userId}/changePassword`,
        formdata
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await AxiosClient.delete(`/users/${userId}`);
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
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      // GET USER BY ID
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

      // UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.errors;
      })

      // UPDATE PROFILE IMAGE
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
      })

      // DELETE PROFILE IMAGE
      .addCase(deleteProfileImage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteProfileImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload;
        state.error = null;
      })
      .addCase(deleteProfileImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // UPDATE PASSWORD
      .addCase(updatePassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })

      // DELETE USER
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload
        state.error = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
  },
});

export default userSlice.reducer;
