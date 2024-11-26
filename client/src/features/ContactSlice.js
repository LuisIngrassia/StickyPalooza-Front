import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/Api";

export const createContact = createAsyncThunk(
  "contact/createContact",
  async (contactDTO, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await api.post("/contact", contactDTO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error("Error creating contact:", err);
      return rejectWithValue("Failed to create contact");
    }
  }
);

export const updateContact = createAsyncThunk(
  "contact/updateContact",
  async ({ id, contactDTO }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await api.put(`/contact/${id}`, contactDTO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error("Error updating contact:", err);
      return rejectWithValue("Failed to update contact");
    }
  }
);

export const fetchContactById = createAsyncThunk(
  "contact/fetchContactById",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await api.get(`/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching contact:", err);
      return rejectWithValue("Failed to fetch contact");
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contact: null,
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contact = action.payload;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(updateContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contact = action.payload;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchContactById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contact = action.payload;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default contactSlice.reducer;
