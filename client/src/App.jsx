import { useState } from "react";

import "./index.css";

import LandingPage from "./views/main/LandingPage";
import LandingPage from "./views/user/Login";
import LandingPage from "./views/user/Register";
import MainPage from "./views/main/Main";

function App() {

  return (
    <Route>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/main' element={<MainPage />} />
        </Routes>
      </div>
    </Route>
  );
}

export default App;
