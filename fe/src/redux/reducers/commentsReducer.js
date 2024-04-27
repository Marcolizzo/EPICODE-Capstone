import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../client/client";

export const getComments = createAsyncThunk(
  "getComments",
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await AxiosClient.get(`/tasks/${taskId}/comments`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCommentById = createAsyncThunk(
  "getCommentById",
  async (commentId, { rejectWithValue }) => {
    try {
      const res = await AxiosClient.get(`/comments/${commentId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createComment = createAsyncThunk(
  "createComment",
  async ([taskId, text], { rejectWithValue }) => {
    try {
      const res = await AxiosClient.post(`/tasks/${taskId}/comments`, {
        text: text,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateComment = createAsyncThunk(
  "updateComment",
  async ([commentId, text], { rejectWithValue }) => {
    try {
      const res = await AxiosClient.patch(`/comments/${commentId}`, { text: text });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "deleteComment",
  async ([taskId, commentId], { rejectWithValue }) => {
    try {
      const res = await AxiosClient.delete(`/tasks/${taskId}/comments/${commentId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  comments: [],
  comment: null,
  isLoading: false,
  error: null,
  totalComments: 0,
  message: "",
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: (builder) => {
    builder
      // GET COMMENTS
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
        state.totalComments = action.payload.length;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // GET COMMENT BY ID
      .addCase(getCommentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comment = action.payload;
      })
      .addCase(getCommentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // CREATE COMMENT
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comment = action.payload;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // UPDATE COMMENT
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comment = action.payload;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // DELETE COMMENT
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default commentsSlice.reducer;
