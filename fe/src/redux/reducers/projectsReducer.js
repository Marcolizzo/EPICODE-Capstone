// const client = new AxiosClient();
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../client/client";

export const getProjects = createAsyncThunk(
  "getProjects",
  async (_, { rejectWithValue }) => {
    try {
      // client.setHeaders({
      //   Authorization: JSON.parse(localStorage.getItem("auth")),
      // });
      const res = await AxiosClient.get(`/projects`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProject = createAsyncThunk(
  "createProject",
  async (formData, { rejectWithValue }) => {
    try {
      // client.setHeaders({
      //   Authorization: JSON.parse(localStorage.getItem("auth")),
      // });
      const res = await AxiosClient.post("/projects", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

const initialState = {
  projects: [],
  isLoading: false,
  error: null,
  totalProjects: 0,

  project: null,
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
        state.isLoading = false;
        state.projects = action.payload;
        state.totalProjects = action.payload.length;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.project = action.payload;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default projectsSlice.reducer;
