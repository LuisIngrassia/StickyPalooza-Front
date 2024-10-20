import { createSlice } from '@reduxjs/toolkit';
import api from '../api/Api'; 

const initialState = {
  userInfo: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = userSlice.actions;

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await api.post("/api/v1/auth/authenticate", { email, password });

    const { userId, access_token, role } = response.data;
    
    if (!access_token || !userId) {
      throw new Error("Missing access token, userId, or cartId.");
    }

    localStorage.setItem("token", access_token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);

    dispatch(loginSuccess({ userId, access_token, role }));
  } catch (err) {
    dispatch(loginFailure("Failed to log in. Please check your credentials."));
  }
};

export default userSlice.reducer;
