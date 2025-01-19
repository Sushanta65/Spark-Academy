import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const MyClasses = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axiosPublic.get('/teacher-classes')
    .then(res => {
      setClasses(res.data)
    })
  }, [axiosPublic])

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-teal-600 mb-6 text-center">
          My Classes
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls._id}
              className="bg-gray-50 rounded-lg shadow-md p-4 flex flex-col justify-between"
            >
              <img
                src={cls.image}
                alt={cls.title}
                className="rounded-lg mb-4 w-full h-40 object-cover"
              />
              <h2 className="text-lg font-bold text-teal-600">{cls.title}</h2>
              <p className="text-gray-700">
                <strong>Price:</strong> ${cls.price}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong>{" "}
                <span
                  className={`font-bold ${
                    cls.status === "pending"
                      ? "text-orange-500"
                      : cls.status === "approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {cls.status}
                </span>
              </p>
              <p className="text-gray-600">{cls.description}</p>
              <div className="flex justify-between mt-4">
                
                <button
                  onClick={() => handleUpdate(cls._id)}
                  className="btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update
                </button>

                
                <button
                  onClick={() => handleDelete(cls._id)}
                  className="btn bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
              
              <button
                onClick={() => navigate(`/dashboard/my-class/${cls._id}`)}
                disabled={cls.status !== "approved"}
                className={`btn w-full mt-4 ${
                  cls.status === "approved"
                    ? "bg-teal-600 text-white hover:bg-teal-700"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              >
                See Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyClasses;
