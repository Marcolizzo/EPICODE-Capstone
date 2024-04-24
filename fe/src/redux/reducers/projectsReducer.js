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

export const getProjectById = createAsyncThunk(
  "getProjectById",
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await AxiosClient.get(`/projects/${projectId}`);
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
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  "updateProject",
  async ([formData, projectId], { rejectWithValue }) => {
    try {
      // client.setHeaders({
      //   Authorization: JSON.parse(localStorage.getItem("auth")),
      // });
      const res = await AxiosClient.patch(`/projects/${projectId}`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      // client.setHeaders({
      //   Authorization: JSON.parse(localStorage.getItem("auth")),
      // });
      const res = await AxiosClient.delete(`/projects/${projectId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  projects: [],
  project: {},
  totalProjects: 0,
  isLoading: false,
  error: null,
  message: '',
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  extraReducers: (builder) => {
    builder
      // GET PROJECTS
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

      // GET PROJECT BY ID
      .addCase(getProjectById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.project = action.payload;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // CREATE PROJECT
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
      })

      // UPDATE PROJECT
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.project = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // DELETE PROJECT
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default projectsSlice.reducer;
