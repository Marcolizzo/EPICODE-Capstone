import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../client/client";
const client = new AxiosClient();

export const getProjects = createAsyncThunk(
  "getProjects",
  async (_, { rejectWithValue }) => {
    try {
      const res = await client.get(`/projects`);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  projects: [],
  isLoading: false,
  error: null,
  totalProjects: 0,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(getProjects.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false
        state.projects = action.payload
        state.totalProjects = action.payload.length
    })
    .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
    })
  },
});

export default projectsSlice.reducer