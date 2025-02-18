import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";

const TeacherRoute = ({ children }) => {
  const { userRole, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loading />;
  }
  if (userRole === 'teacher') {
    return children;
  }
  location;

  return <Navigate to="/" />;
};

export default TeacherRoute;
