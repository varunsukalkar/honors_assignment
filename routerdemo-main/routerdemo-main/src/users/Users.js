import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserList from './UserList';

export default function Users() {
  
  const location = useLocation();
  const pathArr = location.pathname.split('/');
  const path = pathArr[pathArr.length - 1];

  return (
    <div>
      <Link to="/" style={{ padding: 5 }}>Home</Link>
      {/* hide add link if already on add new user component */}
      {path !== "add" ? <Link to="/users/add" style={{ padding: 5 }}>Add User</Link> : <Link to="/users" style={{ padding: 5 }}>User Management</Link>}
      {path !== 'add' ? <UserList/> : <h2>Add New User<br></br></h2>}
    </div>
  );
}