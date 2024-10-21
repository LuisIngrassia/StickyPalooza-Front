import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/Api';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get('/categories/getAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.content; // Adjust based on your API response structure
    } catch (err) {
      console.error('Error fetching categories:', err);
      return rejectWithValue('Failed to fetch categories');
    }
  }
);

export const searchCategories = createAsyncThunk(
  'categories/searchCategories',
  async (searchTerm, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get(`/categories/search?description=${encodeURIComponent(searchTerm)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.content; // Adjust based on your API response structure
    } catch (err) {
      console.error('Error searching categories:', err);
      return rejectWithValue('Failed to search categories');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      await api.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (err) {
      console.error('Error deleting category:', err);
      return rejectWithValue('Failed to delete category');
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCategories(state) {
      state.categories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchCategories.fulfilled, (state, action) => {
        state.categories = action.payload; // Update the categories with the search results
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category.id !== action.payload);
      });
  },
});

export const { clearCategories } = categorySlice.actions;
export default categorySlice.reducer;
