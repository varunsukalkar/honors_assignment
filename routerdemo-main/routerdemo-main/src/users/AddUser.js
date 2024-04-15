import React, { useState } from 'react';
import axios from 'axios';
import "./AddUser.css";

function AddUser({ onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', formData);
            window.location.href = '/users';
            onClose();
            
            
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className="add-user-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:&nbsp;&nbsp;</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div><br></br>
                <div>
                    <label>Email:&nbsp;&nbsp;</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div><br></br>
                <div>
                    <label>Phone:&nbsp;&nbsp;</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </div><br></br>
                <div>
                    <label>Password:&nbsp;&nbsp;</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div><br></br>
                <div>
                    <button type="submit" className="btn btn-primary">Save</button>&nbsp;&nbsp;&nbsp;
                    <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddUser;
