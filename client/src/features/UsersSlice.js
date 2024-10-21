import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers, getUserById, deleteUser } from '../components/users/UsersLogic';

const initialState = {
  users: [],
  user: null,
  loading: false,
  error: null,
  token: localStorage.getItem('token') || null, 
};

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async ({ page, size }, { getState }) => {
    const token = getState().users.token; 
    const response = await getAllUsers(token, page, size);
    return response;
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId, { getState }) => {
    const token = getState().users.token; 
    const response = await getUserById(token, userId);
    return response;
  }
);

export const removeUser = createAsyncThunk(
  'users/removeUser',
  async (userId, { getState }) => {
    const token = getState().users.token; 
    await deleteUser(token, userId);
    return userId; 
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Sync with localStorage
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token'); // Remove from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError, setToken, clearToken } = usersSlice.actions;
export default usersSlice.reducer;
