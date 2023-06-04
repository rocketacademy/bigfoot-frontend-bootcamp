import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import { BACKEND_URL } from '../constants';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Form from 'react-bootstrap/Form';
// import ListGroup from 'react-bootstrap/ListGroup';


export const Sightings = () => {
	const [sighting, setSighting] = useState([]);

	const { sightingId } = useParams();
	// const [sightingId, setSightingId] = useState("");
	// const [comments, setComments] = useState("");
	// const [commentContent, setCommentContent] = useState("");
	// const [sightingIndex, setSightingIndex] = useState();
	const navigate = useNavigate()

	//GET all sightings (original code):
	useEffect(() => {
		const getSightings = async () => {
			const data = await axios.get(`${BACKEND_URL}/sightings`);//location of the backend data

			console.log(data)
			setSighting(data.data)
		}
		getSightings()
	}, []);



	// const getOneSighting = () => {
	// 	const getSighting = async () => {
	// 		const data = await axios.get(`${BACKEND_URL}/sightings/sightingpreview/${sightingId}`)
	// 		console.log(data);
	// 		setSighting(data.data);
	// 	}
	// 	getSighting();
	// }









	//The following are for tests only:
	// const handleEdit = () => {
	// 	console.log('this post is selected for editing')
	// }
	// const handleDelete = () => {
	// 	console.log('this post is selected for deleting')
	// }
	// route for deletesighting not yet created

	// useEffect(() => {
	// 	//If sightingId is available, retrieve sighting data
	// 	if (sightingId) {
	// 		axios.get(`http://localhost:8000/sightings/${sightingId}`).then((response) => {
	// 			setSighting(response.data);
	// 		});
	// 		axios.get(`http://localhost:8000/sightings/${sightingId}/comments`).then((response) => {
	// 			setComments(response.data);
	// 		});
	// 	}
	// }, [sightingId])

	//update sighting ID in state if needed to trigger data retrieval
	// const params = useParams();
	// if (sightingId !== params.SightingId) {
	// 	setSightingId(params.sightingId);
	// }

	//create a new JSX element for each property in sighting details
	// const sightingDetails = [];
	// if (sighting) {
	// 	for (const key in sighting) {
	//logic to render categories:
	// if (key === "Categories") {
	// 	//only show categories label if there are any
	// 	if (sighting[key].length > 0) {
	// 		const categoryNames = sighting[key].map((category) => category.name);
	// sightingDetails.push(
	// 	<Card.Text key={key}>{`${key}: ${categoryNames.join(", "
	// 	)}`}</Card.Text>
	// );

	// 	sightingDetails.push(
	// 		<Card.Text key={key}>{`${key}: ${sighting[key]}`}</Card.Text>
	// 	);

	// }

	// }


	// const handleChange = (event) => {
	// 	setCommentContent(event.target.value);
	// }

	// const handleSubmit = (e) => {
	// 	e.preventDefault();

	//send a request to create new comment in backend
	// 	axios.post(`http://localhost:8000/sightings/${sightingId}/comments`, {
	// 		content: commentContent,
	// 	}).then((res) => {
	// 		//make form empty again
	// 		setCommentContent("");

	// 		//refresh local comment list
	// 		return axios.get(`http://localhost:8000/sightings/${sightingId}/comments`);
	// 	}).then((response) => {
	// 		setComments(response.data);
	// 	})
	// }

	//Store a new JSX element for each comment
	// const commentElements = comments ? comments.map((comment) => (
	// 	<ListGroup.Item key={comment.id}>
	// 		{comment.createdAt} | {comment.content}
	// 	</ListGroup.Item>
	// ))
	// 	: [];



	//DELETE request
	const handleDelete = async (sightingId) => {
		console.log(`${sightingId}`)
		const data = await axios.delete(`http://localhost:8000/sightings/${sightingId}`);//location of the backend data
		navigate(`/sightings/`);
	}


	return (
		<div>
			{ //original code:
				sighting.map((sight) => {
					return (sighting.length !== 0 ?
						<div>
							<div>

								{/*The following button will navigate to a page that shows the individual sighting */}
								<button onClick={() => navigate(`/sightings/sightingpreview/${sight.id}`)}>Details</button>

								<button onClick={() => navigate(`/sightings/editsighting/${sight.id}`)}>Edit</button>

								<button onClick={() => handleDelete(sight.id)}>Delete</button>
								{/* <button onClick={() => navigate(`/sightings/${sight.id}/comments`)}>Comments</button> */}
							</div>

							<p>{sight.date}</p> <p>{sight.location}</p><p>{sight.notes}</p><br />
							<hr />
						</div> : null)
				})
			}


			{/* The following is the 1-M code:
			<Link to="/">Home</Link>
			<Card bg="dark">
				<Card.Body>{sightingDetails}</Card.Body>
			</Card>
			<br />
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Leave a comment</Form.Label>
					<Form.Control
						//use textarea to give user more space to type
						as="textarea"
						name="content"
						value={commentContent}
						onChange={handleChange}
						placeholder="It looked like a big bear!"
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
			<br />
			<ListGroup>{commentElements}</ListGroup>
			<br /> */}


		</div>
	);
};