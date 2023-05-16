import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Sighting from "./pages/Sighting";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sightings/:id" element={<Sighting />} />
      </Routes>
    </div>
  );
};

export default App;
