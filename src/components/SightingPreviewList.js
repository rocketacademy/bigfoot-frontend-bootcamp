import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SightingPreview from "./SightingPreview";

const SightingPreviewList = () => {
	const [sightings, setSightings] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:8000/sightings`).then((response) => {
			setSightings(response.data);
		});
	}, []);

	const sightingPreviews = sightings.map((sighting) => {
		<Link to={`/sightings/${sighting.id}`} key={sighting.id}>
			<SightingPreview data={sighting} />
		</Link>
	});
	return (
		<div>{sightingPreviews}</div>
	)
}

export default SightingPreviewList;
