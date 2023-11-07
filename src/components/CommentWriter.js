import axios from "axios";
import React, { useState } from "react";
import {BACKEND_URL} from '../constants.js';

export function CommentWriter({sightingId, setCommentInfo}) {
    const [comment, setComment] = useState('')

    const commentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${BACKEND_URL}/sightings/${sightingId}/comments`, { content: comment })
        //response = await axios.post(`${BACKEND_URL}/sightings/`,formInfo)
        console.log(response.data.newComment)
        setComment('');
        setCommentInfo((prevState) => {
            return [...prevState, response.data.newComment]
        })
    }

    return (
        <form method='post' id='sighting-filters' className='flex flex-col bg-gray-300 border-black border-2'>
            <input
                className='border-black border-2'
                placeholder="Comment?"
                type="text"
                name="comment"
                id="comment"
                value={comment}
                onChange={(e) => {
                    commentChange(e);
                }}
            />
            <button onClick={(e) => handleSubmit(e)}>Post comment</button>
        </form>
    )

}