import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./index.css";

import LandingPage from "./views/main/LandingPage";
import Login from "./views/user/Login.jsx";
import Register from "./views/user/Register.jsx";
import MainPage from "./views/main/Main.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/main' element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
