import { NavLink } from 'react-router-dom';
import React from 'react'

export const Navbar = () => {
	return (
		<>
			<nav>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/sightings">Sightings</NavLink>
				<NavLink to="/newsighting">New Sighting</NavLink>
				<NavLink to="/sightings/:sightingID/edit">Edit Sighting</NavLink>
			</nav>
		</>

	)
}
