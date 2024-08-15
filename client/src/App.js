import React from 'react';
import LandingPage from './components/mainComponents/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import './App.css';
import './index.css';
import Login from './components/userComponents/Login';
import Register from './components/userComponents/Register';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
