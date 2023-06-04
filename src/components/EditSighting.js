import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';

import { BACKEND_URL } from '../constants';

//PUT request
export const EditSighting = () => {
	const [date, setDate] = useState(undefined);
	const [location, setLocation] = useState(undefined);
	const [notes, setNotes] = useState(undefined);
	const [data, setData] = useState({});
	const navigate = useNavigate();
	const { sightingId } = useParams()

	useEffect(() => {
		axios.get(`${BACKEND_URL}/sightings/`)
			.then((res) => {
				console.log(res.data)
				setData(res.data.id);
			})
			.catch(err => {
				console.log(err);
			});
	}, [sightingId])

	const handleChange = (e) => {
		switch (e.target.name) {
			case "date":
				setDate(e.target.value);
				break;
			case "location":
				setLocation(e.target.value);
				break;
			case "notes":
				setNotes(e.target.value);
				break;
			default:
		}

	};

	const handleSubmit = (e) => {
		e.preventDefault();

		//send request to post new sighting to backend
		axios.put(`${BACKEND_URL}/sightings/editsighting/${sightingId}`, {
			//:sightingId
			// id,
			date,
			location,
			notes,
		})
			.then((res) => {
				//Clear form state
				setDate(undefined);
				setLocation(undefined);
				setNotes(undefined);

				//Navigate to sighting-specific page after submitting form
				navigate(`/sightings/${sightingId}`);
			});
		//${res.data.id}
	};


	return (
		<Form onSubmit={handleSubmit}>
			{/* <Form.Group> */}
			{/* <Form.Label>Which sighting?</Form.Label>
				<Form.Control
					//allow user to input local date and time
					type="text"
					name="id"
					// value={id}
					onChange={handleChange}
				/>
				<Form.Text className="text-muted">
					Which sighting needs amendments?
				</Form.Text>
			</Form.Group> */}
			<Form.Group>
				<Form.Label>Date and Time</Form.Label>
				<Form.Control
					//allow user to input local date and time
					type="datetime-local"
					name="date"
					value={date}
					onChange={handleChange}
				/>
				<Form.Text className="text-muted">
					When did this sighting happen?
				</Form.Text>
			</Form.Group>
			<Form.Group>
				<Form.Label>Location</Form.Label>
				<Form.Control
					type="text"
					name="location"
					value={location}
					onChange={handleChange}
					placeholder="Woodlands, Singapore"
				/>
				<Form.Text className="text-muted">
					Where did this sighting take place?
				</Form.Text>
			</Form.Group>
			<Form.Group>
				<Form.Label>Notes</Form.Label>
				<Form.Control
					//use textarea to give user more space to type
					as="textarea"
					name="notes"
					value={notes}
					onChange={handleChange}
					placeholder="Looks like a gigantic bear! Very scary!"
				/>
				<Form.Text className="text-muted">
					Describe what you saw.
				</Form.Text>
			</Form.Group>

			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	)
}