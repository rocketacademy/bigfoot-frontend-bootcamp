import { NavLink, useParams } from 'react-router-dom';
import React from 'react'

export const Navbar = () => {
	const { id } = useParams()
	return (
		<>
			<nav>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/sightings">Sightings</NavLink>
				<NavLink to="/newsighting">New Sighting</NavLink>
				<NavLink to="/editsighting">Edit Sighting</NavLink>
			</nav>
		</>

	)
}
