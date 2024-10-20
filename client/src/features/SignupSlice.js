import { createSlice } from '@reduxjs/toolkit';
import api from '../api/Api'; 

const initialState = {
  loading: false,
  error: null,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signupRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signupRequest, signupSuccess, signupFailure } = signupSlice.actions;

export const signupUser = (firstname, lastname, email, password, role) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    const response = await api.post("/api/v1/auth/register", {
      firstname,
      lastname,
      email,
      password,
      role,
    });

    const { userId, access_token, role } = response.data;

    if (!access_token || !userId) {
      throw new Error("Missing access token or userId.");
    }

    localStorage.setItem("token", access_token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);

    dispatch(signupSuccess());
  } catch (err) {
    dispatch(signupFailure("Failed to register. Please try again."));
  }
};

export default signupSlice.reducer;
