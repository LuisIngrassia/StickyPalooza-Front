import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/Api';

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    try {
      const response = await api.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.warn('User not found, ignoring error.');
      } else {
        console.error('Error fetching user profile:', err);
        return rejectWithValue('Failed to fetch profile');
      }
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async ({ userId, updatedData }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    try {
      await api.put(`/users/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return updatedData; 
    } catch (err) {
      console.error('Error updating profile:', err);
      return rejectWithValue('Failed to update profile');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    loading: false,
    error: null,
    editing: false,
  },
  reducers: {
    setEditing(state, action) {
      state.editing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload }; 
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setEditing } = profileSlice.actions;
export default profileSlice.reducer;
