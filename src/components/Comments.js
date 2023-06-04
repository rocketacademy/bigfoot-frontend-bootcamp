import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
// import Card from "react-bootstrap/Card";
// import { FormGroup } from 'react-bootstrap';
import axios from 'axios'
import { BACKEND_URL } from '../constants';
import SightingPreview from './SightingPreview';

export const Comments = (props) => {
	const [comments, setComments] = useState({});


	const { sightingId } = useParams();
	// const navigate = useNavigate();
	useEffect(() => {
		const getComments = async () => {
			const data = await axios.get(`${BACKEND_URL}/sightings/${sightingId}/comments`);
			console.log(data)
			setComments(data.data)
		}
		getComments()
	}, []);

	return (
		<>
			<SightingPreview />
			{comments.map((comment) => {
				return (comments.length !== 0 ?
					<div>
						<p>{comment.comments}</p>
					</div> : null)
			})
			}
		</>
	)
}