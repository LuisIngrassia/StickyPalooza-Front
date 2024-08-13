import React from 'react';
import LandingPage from './components/mainComponents/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
