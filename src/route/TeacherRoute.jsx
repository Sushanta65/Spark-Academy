import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const TeacherRoute = ({ children }) => {
  const { userRole, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (userRole === 'teacher') {
    return children;
  }
  location;

  return <Navigate to="/" />;
};

export default TeacherRoute;
