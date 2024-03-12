// PostForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './Addpost.css';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const [post, setPost] = useState({
        title: '',
        desc: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/posts', post, { likes: 0 });
            setPost({
                title: '',
                desc: '',
            });
            navigate('/posts')
            // alert('Post added successfully!');
            // onPostAdded(response.data); // Notify parent component about the new post
        } catch (error) {
            console.error('Error adding post:', error);
            // alert('Error adding post. Please check the console for details.');
        }
    };

    return (
        <div className="post-form-container">
            <h2>Add New Post</h2>
            <form
                onSubmit={handleSubmit}            >
                <label>
                    Title:
                    <input type="text" name="title" value={post.title} onChange={handleInputChange} />
                </label>
                <label>
                    Description:
                    <textarea name="desc" value={post.desc} onChange={handleInputChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddPost;
