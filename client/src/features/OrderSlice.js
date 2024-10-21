import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/Api';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('role');

    try {
      if (userRole === 'ADMIN') {
        const response = await api.get('/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } else if (userId) {
        const response = await api.get(`/orders/ordersFromUser/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      }
      return [];
    } catch (err) {
      console.error('Error fetching orders:', err);
      return rejectWithValue('Failed to fetch orders');
    }
  }
);

export const fetchOrdersByUserId = createAsyncThunk(
  'orders/fetchOrdersByUserId',
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    try {
      const response = await api.get(`/orders/ordersFromUser/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      console.error('Error fetching orders by user ID:', err);
      return rejectWithValue('Failed to fetch orders');
    }
  }
);

export const createOrderFromCart = createAsyncThunk(
  'orders/createOrderFromCart',
  async (cartId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    try {
      const response = await api.post(`/orders/fromCart/${cartId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      console.error('Error creating order from cart:', err);
      return rejectWithValue('Failed to create order');
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    try {
      await api.delete(`/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return orderId;
    } catch (err) {
      console.error('Error deleting order:', err);
      return rejectWithValue('Failed to delete order');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
    searchUserId: '',
  },
  reducers: {
    setSearchUserId(state, action) {
      state.searchUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(createOrderFromCart.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      });
  },
});

export const { setSearchUserId } = orderSlice.actions;
export default orderSlice.reducer;
