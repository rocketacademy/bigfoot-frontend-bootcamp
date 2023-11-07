import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import {Link} from 'react-router-dom';
import { Routes, Route, useParams } from 'react-router-dom';
import {BACKEND_URL} from '../constants.js';
import {CommentWriter} from '../components/CommentWriter.js'
import {Comment} from '../components/Comment.js'

// {
//   "id": 1,
//   "date": "1990-09-30T16:00:00.000Z",
//   "location": "East side of Prince William Sound, Alaska, USA",
//   "notes": "Ed L. was salmon fishing with a companion in Prince William Sound. After anchoring off shore, his companion took a small boat up a river to check on the state of the salmon run. As the day wore on toward evening and he didn't come back at the expected time, Ed scanned upriver and across the adjacent land with binoculars. There he saw a sasquatch walking across the tundra, with long, smooth steps and with dark hair flowing from its shoulders, bouncing behind \"like a cape\" at every step. The sasquatch paid no attention to the boat (distance about 1,000').",
//   "createdAt": "2023-10-30T07:56:44.706Z",
//   "updatedAt": "2023-10-30T07:56:44.706Z"
// }

export function Sighting() {
    const {id} = useParams()
    const [sightingInfo, setSightingInfo] = useState(null)
    const [commentInfo, setCommentInfo] = useState(null)

    useEffect(() => { //async returns a promise -- I should convert this to a loader function
        const getSightingAndComments = async () => {
          //query the backend(axios.get) and setSightings
          if (id) {
          const [sighting, comments] = await Promise.all([
            axios.get(`${BACKEND_URL}/sightings/${id}`),
            axios.get(`${BACKEND_URL}/sightings/${id}/comments`)
          ]) 
          setSightingInfo(sighting.data)
          setCommentInfo(comments.data.comments)
        }}
        getSightingAndComments()
      }, [])
    
    console.log(commentInfo)
      //render basic sighting info
      const sightingData = sightingInfo ? Object.keys(sightingInfo).map((key) =>
        <tr key={`sighting${id}-${key}`} className='text-black bg-green-300'>
          <td>{key}</td>
          <td>{sightingInfo[key]}</td>
        </tr>
      ) : null
      //render comments - to separate this out into its own component. It has an outlet to display the 
      const commentData = commentInfo ? commentInfo.map((comment, index) =>
      <Comment comment = {comment} index={index} setCommentInfo = {setCommentInfo}/>
        // <tr key={`sighting${id}-${comment.id}`} className='text-black bg-green-300'>
        //   <td>{comment.content}</td>
        //   <td>Edit Link</td>
        //   <td>Delete Link</td>
        // </tr>
      ) : null

  return (
   <div>
    <Link to={`/`}> Home </Link>
    <table>
    <tbody>
        <tr className='bg-blue-300'>
          <th>Circumstance</th>
          <th>Details</th>
        </tr>
        {sightingData}
      </tbody>
    </table>
    <Link to={`edit`}> Edit Sighting</Link>
    <CommentWriter sightingId = {id} setCommentInfo={setCommentInfo}/>
    <table>
    <tbody>
        <tr className='bg-yellow-300'>
          <th>Comment</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {commentData}
      </tbody>
    </table>
   </div>
  );
}
