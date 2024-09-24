import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

//import "./App.css";
import "./index.css";

import LandingPage from "./assets/mainComponents/LandingPage";
import LandingPage from "./assets/userComponents/Login";
import LandingPage from "./assets/userComponents/Register";

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
