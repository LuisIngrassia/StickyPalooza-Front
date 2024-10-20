import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './features/LoginSlice'; 
import signupReducer from './features/SignupSlice'; 

const store = configureStore({
  reducer: {
    user: LoginReducer,
    signup: signupReducer, 
  },
});

export default store;
