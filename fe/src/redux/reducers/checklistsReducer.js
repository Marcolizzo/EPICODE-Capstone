import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../client/client";

export const getChecklists = createAsyncThunk(
  "getChecklists",
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await AxiosClient.get(`/tasks/${taskId}/checklists`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getChecklistById = createAsyncThunk(
  "getChecklistById",
  async (checklistId, { rejectWithValue }) => {
    try {
      const res = await AxiosClient.get(`/checklists/${checklistId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createChecklist = createAsyncThunk(
  "createChecklist",
  async ([taskId, title], { rejectWithValue }) => {
    try {
      const res = await AxiosClient.post(`/tasks/${taskId}/checklists`, {
        title: title,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateChecklist = createAsyncThunk(
  "updateChecklist",
  async ([checklistId, title], { rejectWithValue }) => {
    try {
      const res = await AxiosClient.patch(`/checklists/${checklistId}`, { title: title });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteChecklist = createAsyncThunk(
  "deleteChecklist",
  async ([taskid, checklistId], { rejectWithValue }) => {
    try {
      const res = await AxiosClient.delete(`/tasks/${taskid}/checklists/${checklistId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  checklists: [],
  checklist: null,
  isLoading: false,
  error: null,
  totalChecklists: 0,
  message: "",
};

const checklistsSlice = createSlice({
  name: "checklists",
  initialState,
  extraReducers: (builder) => {
    builder
      // GET CHECKLISTS
      .addCase(getChecklists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChecklists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checklists = action.payload;
        state.totalChecklists = action.payload.length;
      })
      .addCase(getChecklists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // GET CHECKLIST BY ID
      .addCase(getChecklistById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChecklistById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checklist = action.payload;
      })
      .addCase(getChecklistById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // CREATE CHECKLIST
      .addCase(createChecklist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createChecklist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checklist = action.payload;
      })
      .addCase(createChecklist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // UPDATE CHECKLIST
      .addCase(updateChecklist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateChecklist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checklist = action.payload;
      })
      .addCase(updateChecklist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // DELETE CHECKLIST
      .addCase(deleteChecklist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteChecklist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteChecklist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default checklistsSlice.reducer;
