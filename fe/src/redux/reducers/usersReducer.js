import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../client/client";
const client = new AxiosClient();

export const getUserById = createAsyncThunk(
  "/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await client.get(`/users/${userId}`);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
    user: null,
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(getUserById.pending, state => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(getUserById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
            state.error = null;
        })
        .addCase(getUserById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
    }
})

export default userSlice.reducer