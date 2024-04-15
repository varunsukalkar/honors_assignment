// ProductList.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAxios } from "../useAxios";
import EditProduct from './EditProduct';
import "./ProductList.css";

function ProductList() {
    const { response, error, loading } = useAxios('http://localhost:5000/products', 'get');
    const [editingProductId, setEditingProductId] = useState(null);

    const handleEdit = (productId) => {
        setEditingProductId(productId);
        
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/products/${productId}`);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="product-list-container">
            <h2>Product List</h2>
            <table className="product-table table" border='1'> 
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {response.data.map(product => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleEdit(product._id)}>Edit</button> 
                                <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingProductId && <EditProduct productId={editingProductId} onClose={() => setEditingProductId(null)} />}
        </div>
    );
}

export default ProductList;
