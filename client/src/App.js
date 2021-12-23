import "./App.css";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    // <Signup />
  );
}

export default App;
