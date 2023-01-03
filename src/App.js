import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SightingAll from "./components/SightingAll";
import SightingDetail from "./pages/SightingDetail";
import NavBar from "./pages/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<SightingAll />} />
        <Route path="/SightingDetail/:id" element={<SightingDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
