import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Bill from './views/bill/Bill';
import Cart from './views/cart/Cart';
import Order from './views/order/Order';
import Product from './views/product/Product';
import Profile from './views/profile/Profile';
import Login from './views/user/Login';
import Signup from './views/user/Signup';
import Main from './views/main/Main';
import Users from './views/user/Users';
import Category from './views/category/Category';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />  
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/products" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/categories" element={<Category />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;