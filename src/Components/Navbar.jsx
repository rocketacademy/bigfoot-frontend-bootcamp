// Navbar.js

import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">Bigfoot App</div>
                <ul className="navbar-links">
                    {/* Add navigation links as needed */}
                    {/* <li>
                        <Link to="/">Home</Link>
                    </li> */}
                    <li>
                        <Link to="/">Sightings</Link>
                    </li>
                    <li>
                        <Link to="/add-sighting">Add Sighting</Link>
                    </li>
                    {/* <li>
                        <Link to="/posts">Posts</Link>
                    </li> */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
