import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/UserSlice'; 
import signupReducer from './features/SignupSlice'; 

const store = configureStore({
  reducer: {
    user: userReducer,
    signup: signupReducer, 
  },
});

export default store;
