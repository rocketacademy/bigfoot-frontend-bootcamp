
import { useState, useEffect } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHeart as fasolHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faregHeart} from '@fortawesome/free-regular-svg-icons'
import axios from "axios";
import {BACKEND_URL} from '../constants.js';

//<LikeButton userId={userId} likeInfo = {likeInfo} sightingId={id}/>
export function LikeButton({ userId, likeInfo, sightingId}) { 
    console.log(likeInfo)
    const [isLiked, setIsLiked] = useState(false)
    const [currentLikes, setCurrentLikes] = useState(0)

    useEffect(() => {
        const likedUsers = likeInfo ? new Set(likeInfo.likes.map((like)=>like.userId)) : new Set()
        setIsLiked(likedUsers.has(userId))
        setCurrentLikes(likeInfo ? likeInfo.likes.length : 0)
      }, [likeInfo, userId])

    const handleClick = async() =>{
        if (!userId) {
        return
        }
        if (isLiked) {
            setCurrentLikes((prevState)=>prevState - 1)
            await axios.delete(`${BACKEND_URL}/sightings/${sightingId}/likes/${userId}`)
        } else {
            setCurrentLikes((prevState)=>prevState + 1)
            await axios.post(`${BACKEND_URL}/sightings/${sightingId}/likes`, {userId})
        }
        setIsLiked(!isLiked)      
    }
    return(
        <div>
        <p>Likes:{currentLikes}</p>
        <button onClick = {handleClick}>
        {isLiked ? 
        <FontAwesomeIcon icon={fasolHeart} style={{color: "#ff0000",}} /> 
        : <FontAwesomeIcon icon={faregHeart} style={{color: "#000000",}} /> 
        }
        </button>
        </div>
        
    )
}