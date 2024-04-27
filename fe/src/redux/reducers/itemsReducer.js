import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../client/client";

export const getItems = createAsyncThunk(
  "getItems",
  async (checklistId, { rejectWithValue }) => {
    try {
      const res = await AxiosClient.get(`/checklists/${checklistId}/items`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getItemById = createAsyncThunk(
  "getItemById",
  async (itemId, { rejectWithValue }) => {
    try {
      const res = await AxiosClient.get(`/items/${itemId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createItem = createAsyncThunk(
  "createItem",
  async ([checklistId, title], { rejectWithValue }) => {
    try {
      const res = await AxiosClient.post(`/checklists/${checklistId}/items`, {
        title: title,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateItem = createAsyncThunk(
  "updateItem",
  async ([itemId, payload], { rejectWithValue }) => {
    try {
      const res = await AxiosClient.patch(`/items/${itemId}`, payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "deleteItem",
  async ([checklistId, itemId], { rejectWithValue }) => {
    try {
      const res = await AxiosClient.delete(`/checklists/${checklistId}/items/${itemId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  items: [],
  item: null,
  isLoading: false,
  error: null,
  totalitems: 0,
  message: "",
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  extraReducers: (builder) => {
    builder
      // GET ITEMS
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.totalitems = action.payload.length;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // GET ITEM BY ID
      .addCase(getItemById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(getItemById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // CREATE ITEM
      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // UPDATE ITEM
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // DELETE ITEM
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default itemsSlice.reducer;
