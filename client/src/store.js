import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/UserSlice';  
//import productReducer from './features/ProductSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    //product: productReducer,
  },
});

export default store;