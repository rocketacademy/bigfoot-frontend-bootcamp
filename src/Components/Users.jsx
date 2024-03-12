import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
    const [usersLists, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users');
                // const response = await axios.get('http://localhost:5000/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {usersLists && usersLists?.map(user => (
                    <li key={user.id}>{user.id}. {user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
