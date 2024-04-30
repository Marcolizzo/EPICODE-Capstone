import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../client/client";

export const getInvitations = createAsyncThunk(
  "getInvitations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AxiosClient.get(`/invitations`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getInvitationById = createAsyncThunk(
  "getInvitationById",
  async (invitationId, { rejectWithValue }) => {
    try {
      const res = await AxiosClient.get(`/invitations/${invitationId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createInvitation = createAsyncThunk(
  "createInvitation",
  async ([projectId, recipientEmail, message], { rejectWithValue }) => {
    try {
      const res = await AxiosClient.post(`projects/${projectId}/invitations`, {
        recipientEmail: recipientEmail,
        message: message,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateInvitation = createAsyncThunk(
  "updateInvitation",
  async (
    [invitationId, projectId, isRead, isAccepted],
    { rejectWithValue }
  ) => {
    try {
      const res = await AxiosClient.patch(
        `/projects/${projectId}/invitations/${invitationId}`,
        {
          isRead: isRead ? isRead : false,
          isAccepted: isAccepted ? isAccepted : false,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteInvitation = createAsyncThunk(
  "deleteInvitation",
  async (invitationId, { rejectWithValue }) => {
    try {
      const res = await AxiosClient.delete(`/invitations/${invitationId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  invitations: [],
  invitation: {},
  totalInvitations: 0,
  isLoading: false,
  error: null,
  message: "",
};

const invitationsSlice = createSlice({
  name: "invitations",
  initialState,
  extraReducers: (builder) => {
    builder
      // GET INVITATIONS
      .addCase(getInvitations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvitations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invitations = action.payload;
        state.totalInvitations = action.payload.length;
      })
      .addCase(getInvitations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // GET INVITATION BY ID
      .addCase(getInvitationById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvitationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invitation = action.payload;
      })
      .addCase(getInvitationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // CREATE INVITATION
      .addCase(createInvitation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInvitation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invitation = action.payload;
      })
      .addCase(createInvitation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // UPDATE INVITATION
      .addCase(updateInvitation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInvitation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invitation = action.payload;
      })
      .addCase(updateInvitation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // DELETE INVITATION
      .addCase(deleteInvitation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInvitation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteInvitation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default invitationsSlice.reducer;
