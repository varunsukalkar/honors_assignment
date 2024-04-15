import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductList from './ProductList';

export default function Products() {
  // get current location path
  const location = useLocation();
  const pathArr = location.pathname.split('/');
  const path = pathArr[pathArr.length - 1];

  return (
    <div>
      <Link to="/" style={{ padding: 5 }}>Home</Link>
      {/* hide add link if already on add new product component */}
      {path !== 'add' ? <Link to="/products/add" style={{ padding: 5 }}>Add Product</Link> : <Link to="/products" style={{ padding: 5 }}>Product Management</Link>}
      {path !== 'add' ? <ProductList/> : <h2>Add New Product</h2>}
    </div>
  );
}