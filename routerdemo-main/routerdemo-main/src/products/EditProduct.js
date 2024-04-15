import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditProduct({ productId, onClose }) {
    const [product, setProduct] = useState({ name: '', price: 0 });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${productId}`);
                const { name, price } = response.data;
                console.log('Product:', response.data);
                setProduct({ name, price });
            } catch (error) {
                console.error('Error fetching product:', error);
                console.log('Error response:', error.response); // Log the error response
            }
        };

        fetchProduct();

        // No need to return a cleanup function since the product state will always be updated when the component re-renders
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/products/${productId}`, product);
            window.location.reload();
            onClose();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="edit-product-container">
            <h2>Edit Product</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="productName">Product Name</label>
                    <input type="text" className="form-control" id="productName" name="name" value={product.name || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="productPrice">Price</label>
                    <input type="number" className="form-control" id="productPrice" name="price" value={product.price || ''} onChange={handleChange} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default EditProduct;
