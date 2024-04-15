import React from 'react';
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex justify-content-center">&nbsp;</div>
      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-primary" onClick={() => navigate("/users")}>User Management</button>
        &nbsp;&nbsp;
        <button type="button" className="btn btn-primary" onClick={() => navigate("/products")}>Product Management</button>
      </div>
      
    </div>
    
  );
}