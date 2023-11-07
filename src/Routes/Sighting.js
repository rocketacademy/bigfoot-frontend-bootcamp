import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {BACKEND_URL} from '../constants.js';
import {CommentWriter} from '../components/CommentWriter.js'
import {Comment} from '../components/Comment.js'
import {LikeButton} from '../components/LikeButton.js'


export function Sighting() {
    const {id} = useParams()
    const [sightingInfo, setSightingInfo] = useState(null)
    const [commentInfo, setCommentInfo] = useState(null)
    const [likeInfo, setLikeInfo] = useState(null)
    const userId = 'dummyuser2' // to replace with auth later

    useEffect(() => { //async returns a promise -- I should convert this to a loader function
        const getSightingAndComments = async () => {
          //query the backend(axios.get) and setSightings
          if (id) {
          const [sighting, comments, likes] = await Promise.all([
            axios.get(`${BACKEND_URL}/sightings/${id}`),
            axios.get(`${BACKEND_URL}/sightings/${id}/comments`),
            axios.get(`${BACKEND_URL}/sightings/${id}/likes`)
          ]) 
          setSightingInfo(sighting.data)
          setCommentInfo(comments.data.comments)
          setLikeInfo(likes.data)
          console.log(likes.data)
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
    {console.log(likeInfo)}
    
    <LikeButton userId={userId} likeInfo = {likeInfo} sightingId={id}/>
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
