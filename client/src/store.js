import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './features/LoginSlice';
import signupReducer from './features/SignupSlice';
import usersReducer from './features/UsersSlice'; 

const store = configureStore({
  reducer: {
    login: LoginReducer,
    signup: signupReducer,
    users: usersReducer, 
  },
});

export default store;
