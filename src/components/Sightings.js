import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';

export const Sightings = () => {
	const [sighting, setSighting] = useState([]);
	// const [sightingIndex, setSightingIndex] = useState();

	useEffect(() => {
		const getSightings = async () => {
			const data = await axios.get(`http://localhost:8000/sightings`);//location of the backend data

			console.log(data)
			setSighting(data.data)
		}
		getSightings()

	}, []);
	return (
		<div>
			{
				sighting.map((sight) => {
					return (sighting.length !== 0 ? <div><p>{sight.date}</p> <p>{sight.location}</p><p>{sight.notes}</p><br />
						<hr /></div> : null)
				})
			}

		</div>
	)
}
