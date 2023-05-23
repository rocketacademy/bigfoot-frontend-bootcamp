import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar-ctn">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <div className="navbar-right">
        <Link to="/new" className="nav-link">
          Report
        </Link>
        {/* <p>Bigfoot Wiki</p> */}
        <Link to="/sightings" className="nav-link">
          Sightings
        </Link>
        <Link to="/filter" className="nav-link">
          Search
        </Link>
      </div>

      <Outlet />
    </div>
  );
}

export default Navbar;
