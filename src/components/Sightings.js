import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Sightings = () => {
	const [sighting, setSighting] = useState([]);
	// const [sightingIndex, setSightingIndex] = useState();
	const navigate = useNavigate()

	useEffect(() => {
		const getSightings = async () => {
			const data = await axios.get(`http://localhost:8000/sightings`);//location of the backend data

			console.log(data)
			setSighting(data.data)
		}
		getSightings()

	}, []);

	//The following are for tests only:
	// const handleEdit = () => {
	// 	console.log('this post is selected for editing')
	// }
	// const handleDelete = () => {
	// 	console.log('this post is selected for deleting')
	// }
	// route for deletesighting not yet created


	return (
		<div>
			{
				sighting.map((sight) => {
					return (sighting.length !== 0 ?
						<div>
							<div>
								<button onClick={() => navigate('/editsighting')}>Edit</button>
								<button onClick={() => navigate('/deletesighting')}>Delete</button>
							</div>

							<p>{sight.date}</p> <p>{sight.location}</p><p>{sight.notes}</p><br />
							<hr />
						</div> : null)
				})
			}

		</div>
	)
}
