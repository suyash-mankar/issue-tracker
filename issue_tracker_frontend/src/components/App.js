import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home } from "../pages";
import { Navbar } from "./";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />} />
      </Routes>
    </Router>
  );
}

export default App;
