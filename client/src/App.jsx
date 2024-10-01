import { useState } from "react";

import "./index.css";

import LandingPage from "./views/landingPage/LandingPage";
import LandingPage from "./views/user/Login";
import LandingPage from "./views/user/Register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Route>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Route>
  );
}

export default App;
