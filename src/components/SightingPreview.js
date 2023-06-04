import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
// import Card from "react-bootstrap/Card";
// import { FormGroup } from 'react-bootstrap';
import axios from 'axios'
import { BACKEND_URL } from '../constants';

const SightingPreview = (props) => {
	const [sighting, setSighting] = useState([]);
	const navigate = useNavigate();

	// const [data, setData] = useState(undefined);
	// const [date, setDate] = useState(undefined);
	// const [location, setLocation] = useState(undefined);
	// const [notes, setNotes] = useState(undefined)
	// const [sighting, setSighting] = useState(undefined);

	const { sightingId } = useParams();
	// const navigate = useNavigate();
	useEffect(() => {
		const getSighting = async () => {
			const data = await axios.get(`${BACKEND_URL}/sightings/${sightingId}`)
			console.log(data)
			setSighting(data.data)
		}
		getSighting()
	}, [sightingId]);

	// 	axios.get(`${BACKEND_URL}/sightings/${sightingId}`)//location of the backend data
	// 		.then((res) => {
	// 			console.log(res.data)
	// 			setSighting(res.data)
	// 			setDate(res.data.date)
	// 			setLocation(res.data.location)
	// 			setNotes(res.data.notes)
	// 			console.log(res.data.notes)
	// 		})
	// 		.catch(err => {
	// 			console.log(err)
	// 		})
	// 	// }
	// 	// getSightings()
	// }, []);
	// navigate(`/sightings/${sightingId}`)
	return (
		<>

			{(sighting !== 0 ?
				<div>
					<button onClick={() => navigate(`/sightings/${sighting.id}/comments`)}>Comments</button>
					<p>{sighting.date}</p> <p>{sighting.location}</p><p>{sighting.notes}</p><br />
				</div> : null)}
			{/* {sighting} */}


		</>
		// <Card bg="dark">
		// 	<Card.Body>

		// 		<Card.Title>
		// 			{`${new Date(props.data.date).toDateString()} 
		// 			| ${props.data.location}`}
		// 		</Card.Title>
		// 	</Card.Body>
		// </Card>
	);
};

export default SightingPreview;
