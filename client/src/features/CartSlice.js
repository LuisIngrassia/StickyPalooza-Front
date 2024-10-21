import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/Api';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    try {
      const response = await api.get(`/carts/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error fetching cart:', err);
      return rejectWithValue('Failed to fetch cart');
    }
  }
);

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async ({ cartId, productId, quantity }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    try {
      await api.post('/carts/addProduct', {
        cartId,
        productId,
        quantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { cartId, productId, quantity };
    } catch (err) {
      console.error('Error adding product:', err);
      return rejectWithValue('Error adding product: ' + (err.response?.data || err.message));
    }
  }
);

export const deleteCart = createAsyncThunk(
  'cart/deleteCart',
  async (cartId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    try {
      await api.delete(`/carts/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return cartId;
    } catch (err) {
      console.error('Error deleting cart:', err);
      return rejectWithValue('Failed to delete cart: ' + (err.response?.data || err.message));
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCart(state) {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        // Optionally update the cart in the state if needed
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.cart = null;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
