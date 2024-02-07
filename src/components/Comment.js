import axios from "axios";
import React, { useState, useEffect } from "react";
import {BACKEND_URL} from '../constants.js';

export function Comment({comment, index, setCommentInfo }){
    const [isEditing, setIsEditing] = useState(false)
    const [newCommentText, setNewCommentText] = useState(null)

    //useEffect dependent on isEditing to set the edit box? because if open->edit->close, it will not refresh the comment
    useEffect(() => {
        setNewCommentText(comment.content)
      }, [isEditing])
    
    //integrate Comment component in for the edit and delete functionality
    const handleEdit = async () => {
        console.log('clicked edit')
        if(isEditing) { //currently editing
            const response = await axios.put(`${BACKEND_URL}/sightings/${comment.sightingId}/comments/${comment.id}`,{content:newCommentText});
            console.log(response.data.editedComment)
            setCommentInfo((prevState) => {
                prevState[index] = response.data.editedComment[1][0]; // will index move around?
                return [...prevState]
            })
        } 
        setIsEditing(!isEditing)  
    }

    const handleDelete = async () => { // delete works but need to rerender
        await axios.delete(`${BACKEND_URL}/sightings/${comment.sightingId}/comments/${comment.id}`)
        setCommentInfo((prevState) => {
            prevState.splice(index,1,0)
            return [...prevState]
        })
        
    }

    return (
        <tr key={`sighting${comment.sightingId}-${comment.id}`} className='text-black bg-green-300'>
          <td>{
            isEditing ? 
          <input
                className='border-black border-2'
                placeholder="Edit Comment"
                type="text"
                name="editComment"
                id="editComment"
                value={newCommentText}
                onChange={(e) => {
                    setNewCommentText(e.target.value);
                }}
            /> 
            : comment.content
            }
            </td>
          <td><button onClick={() => handleEdit()}>{isEditing ? 'Post' : 'Edit'}</button></td>
          <td><button onClick={() => handleDelete()}>Delete</button></td>
        </tr>
    )
}
