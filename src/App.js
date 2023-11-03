import React from "react";
import "./App.css";
import {Outlet, Link} from 'react-router-dom';

  const App = () => {

    const Navbar = () =>{
      return (
          <div>
              <Link to='newsighting'>Register New Sighting</Link>
              <Link to='getsightings'>Retrieve Sightings</Link>
          </div>
      )
  }

    return (
      <div>
      <Navbar />
      <Outlet />
      </div>
    );
  }

export default App;
