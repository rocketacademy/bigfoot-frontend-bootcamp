import React from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar-ctn">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <p>Bigfoot Wiki</p>
      <Link to="/sightings" className="nav-link">
        Sightings
      </Link>
      <Outlet />
    </div>
  );
}

export default Navbar;
