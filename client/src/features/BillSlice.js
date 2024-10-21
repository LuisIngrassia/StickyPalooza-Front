import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/Api';

export const fetchBills = createAsyncThunk(
  'bills/fetchBills',
  async (userIdToSearch = null, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('role');

    try {
      let response;
      if (userRole === 'ADMIN' && !userIdToSearch) {
        response = await api.get('/bills', {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (userIdToSearch) {
        response = await api.get(`/bills/billsFromUser/${userIdToSearch}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (userId) {
        response = await api.get(`/bills/billsFromUser/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      return response.data;
    } catch (err) {
      console.error('Error fetching bills:', err);
      return rejectWithValue('Failed to fetch bills');
    }
  }
);

export const markBillAsPaid = createAsyncThunk(
  'bills/markBillAsPaid',
  async (billId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    try {
      await api.post(`/bills/markAsPaid/${billId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return billId;
    } catch (err) {
      console.error('Error marking bill as paid:', err);
      return rejectWithValue('Failed to mark bill as paid');
    }
  }
);

const billSlice = createSlice({
  name: 'bills',
  initialState: {
    bills: [],
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
      .addCase(fetchBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = action.payload;
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markBillAsPaid.fulfilled, (state, action) => {
        const billId = action.payload;
        state.bills = state.bills.map(bill => 
          bill.id === billId ? { ...bill, paid: true } : bill
        );
      });
  },
});

export const { setSearchUserId } = billSlice.actions;
export default billSlice.reducer;
