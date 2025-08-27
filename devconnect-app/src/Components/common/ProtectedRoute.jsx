import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  const location = useLocation();

  // If no user, redirect to login
  if (!user) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // If user exists, render the protected content
  return children;
};

export default ProtectedRoute;
