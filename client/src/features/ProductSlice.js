import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/Api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    try {
      const response = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error fetching products:', err);
      return rejectWithValue('Failed to fetch products');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    try {
      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (err) {
      console.error('Error deleting product:', err);
      return rejectWithValue('Failed to delete product');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (searchTerm, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    try {
      const response = await api.get(`/products/search?name=${encodeURIComponent(searchTerm)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error searching products:', err);
      return rejectWithValue('Failed to search products');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
    editingProduct: null,
    searchTerm: '',
    selectedCategory: '',
    minPrice: '',
    maxPrice: '',
  },
  reducers: {
    setEditingProduct(state, action) {
      state.editingProduct = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setMinPrice(state, action) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action) {
      state.maxPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export const { setEditingProduct, setSearchTerm, setSelectedCategory, setMinPrice, setMaxPrice } = productSlice.actions;
export default productSlice.reducer;
