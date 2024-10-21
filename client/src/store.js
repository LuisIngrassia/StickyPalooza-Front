import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './features/LoginSlice';
import signupReducer from './features/SignupSlice';
import usersReducer from './features/UsersSlice';
import profileReducer from './features/ProfileSlice';
import productReducer from './features/ProductSlice'; 
import orderReducer from './features/OrderSlice'; 

const store = configureStore({
  reducer: {
    login: LoginReducer,
    signup: signupReducer,
    users: usersReducer,
    profile: profileReducer,
    products: productReducer, 
    orders: orderReducer, 
  },
});

export default store;
