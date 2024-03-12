import React from "react";
import logo from "./logo.png";
import "./App.css";
import Users from "./Components/Users";
import AddSightings from "./pages/AddSightings";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Sightings from "./pages/Sightings";
import Posts from "./pages/Posts";
import AddPost from "./pages/Addpost";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Users />}></Route> */}
        <Route path="/add-sighting" element={<AddSightings />}></Route>
        <Route path="/addpost" element={<AddPost />}></Route>
        <Route path="/" element={<Sightings />}></Route>
        {/* <Route path="/posts" element={<Posts />}></Route> */}
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
