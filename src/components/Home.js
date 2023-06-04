import React from 'react';
import { Link } from "react-router-dom";
import SightingPreviewList from "./SightingPreviewList";
import bigfoot from './bigfoot.png';


export const Home = () => {
	return (
		<div>
			<h1 className="home-title">Big Foot Sightings!</h1>
			{/* <Link to="/new">Record New Sighting</Link> */}
			<img src={bigfoot} className="bigfoot" alt="bigfoot" width="500" height="600" />
		</div>
	)
}
