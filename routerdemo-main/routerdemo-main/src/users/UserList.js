import React, { useState } from 'react';
import axios from 'axios';
import { useAxios } from "../useAxios";
import EditUser from './EditUser'; 
import "./UserList.css"; 

function UserList() {
    const { response, error, loading } = useAxios('http://localhost:5000/users', 'get'); 
    const [editingUserId, setEditingUserId] = useState(null);

    const handleEdit = (userId) => {
        setEditingUserId(userId);
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/users/${userId}`); 
            window.location.reload();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleCloseEdit = () => {
        setEditingUserId(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <table className="user-table table"> 
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {response.data.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleEdit(user._id)}>Edit</button> 
                                <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingUserId && <EditUser userId={editingUserId} onClose={handleCloseEdit} />}
        </div>
    );
}

export default UserList;
