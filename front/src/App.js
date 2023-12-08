import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dash from "./Component/Dash/Dash.js";
import Signup from "./Component/Signup/Signup.js";
import Signin from "./Component/Signin/Signin.js";



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Signin />} />

          <Route path="/dash" element={<Dash />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
