import React, { useEffect, useState } from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast'

const Posts = () => {
    const [posts, setPosts] = useState([]);
    // const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const handleCommentSubmit = async (id) => {
        // e.preventDefault();
        setComments((prevComments) => [...prevComments, newComment]);
        console.log(newComment, id)
        try {
            const response = await axios.post(`/posts/:${id}/comment`, { comment: newComment });
            // setPosts(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching:', error.message);
        }
        setNewComment('');
    };
    const fetchPosts = async () => {
        try {
            const response = await axios.get(`/posts`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching:', error.message);
        }
    };
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/posts/${id}`);
            toast.success(response.data.message)
            window.location.reload()
        } catch (error) {
            toast.error('Error fetching sightings:', error);
        }
    };
    const handleLike = async (id) => {
        try {
            const response = await axios.put(`/posts/${id}/like`);
            toast.success(response.data.message)
        } catch (error) {
            toast.error('Error fetching sightings:', error);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);


    return (
        <>
            <Link to="/addpost">
                <button >Add Post

                </button>
            </Link>
            {posts && posts?.map((p, i) => (

                <div
                    key={i}
                    className="post">
                    <h2 className="post-title">{p?.title}</h2>
                    <p className="post-desc">{p?.desc}</p>
                    {/* <p className="post-created-at">Created at: {createdAt}</p> */}
                    <div className="post-actions">
                        <button onClick={() => handleLike(p?.id)}>Like ({p?.likes})</button>
                        <button className='del' onClick={() => handleDelete(p?.id)}>Delete </button>
                    </div>
                    <div className="post-comments">
                        {/* {console.log(p?.comment)} */}
                        <h3>{p?.comment}</h3>
                        <ul>
                            {/* {comment.map((comment, index) => (
                                <li key={index}>{comment}</li>
                            ))} */}
                        </ul>
                        {/* <form > */}
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={() => handleCommentSubmit(p?.id)}>Submit</button>
                        {/* </form> */}
                    </div>
                </div >
            ))}

        </>
    );
};

export default Posts;
