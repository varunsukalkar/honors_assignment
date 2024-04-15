import React, { useState } from 'react';
import axios from 'axios';
import "./AddProduct.css";



function AddProduct() {
    const [formData, setFormData] = useState({
        name: '',
        price: ''
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
            await axios.post('http://localhost:5000/products', formData);
            window.location.href = '/products';
            
            
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };



    return (
        <div className="add-product-container">
           
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:&nbsp;&nbsp;&nbsp;</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div><br></br>
                <div>
                    <label>Price:&nbsp;&nbsp;&nbsp;</label>
                    <input type="text" name="price" value={formData.price} onChange={handleChange} />
                </div><br></br>
                <div>
                    <button type="submit" className="btn btn-primary">Save</button>&nbsp;&nbsp;&nbsp;
                    <button type="button" className="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct;
