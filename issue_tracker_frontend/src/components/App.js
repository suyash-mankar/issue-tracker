import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, CreateProject } from "../pages";
import { NavbarComp } from "./";

function App() {
  return (
    <Router>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Home />} />} />
        <Route path="/project/create" element={<CreateProject />} />} />
      </Routes>
    </Router>
  );
}

export default App;
