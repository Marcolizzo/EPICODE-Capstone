import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../client/client";

export const getLists = createAsyncThunk(
  "getLists",
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await AxiosClient.get(`/projects/${projectId}/lists`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getListById = createAsyncThunk(
  "getListById",
  async (listId, { rejectWithValue }) => {
    try {
      const res = await AxiosClient.get(`/lists/${listId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createList = createAsyncThunk(
  "createList",
  async ([projectId, title], { rejectWithValue }) => {
    try {
      const res = await AxiosClient.post(`/projects/${projectId}/lists`, {
        title: title,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateList = createAsyncThunk(
  "updateList",
  async ([listId, title], { rejectWithValue }) => {
    try {
      const res = await AxiosClient.patch(`/lists/${listId}`, { title: title });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteList = createAsyncThunk(
  "deleteList",
  async ([projectId, listId], { rejectWithValue }) => {
    try {
      const res = await AxiosClient.delete(`/projects/${projectId}/lists/${listId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  lists: [],
  list: null,
  isLoading: false,
  error: null,
  totalLists: 0,
  message: "",
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  extraReducers: (builder) => {
    builder
      // GET LISTS
      .addCase(getLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lists = action.payload;
        state.totalLists = action.payload.length;
      })
      .addCase(getLists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // GET LIST BY ID
      .addCase(getListById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(getListById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // CREATE LIST
      .addCase(createList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(createList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // UPDATE LIST
      .addCase(updateList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(updateList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // DELETE LIST
      .addCase(deleteList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default listsSlice.reducer;
