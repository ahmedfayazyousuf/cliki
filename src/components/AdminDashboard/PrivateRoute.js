import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return element;
  }
  return <Navigate to="/adminlogin" />;
};

export default PrivateRoute;
