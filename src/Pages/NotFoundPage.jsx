import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center">
        <FaExclamationTriangle className="text-teal-600 text-6xl mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <button
          onClick={handleGoHome}
          className="btn bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
