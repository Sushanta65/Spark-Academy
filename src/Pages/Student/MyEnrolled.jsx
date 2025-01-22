import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const MyEnrolled = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [enrolledClasses, setEnrolledClasses] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/enrolled-classes/${user?.email}`)
      .then((res) => {
        setEnrolledClasses(res.data);
      });
  }, [axiosSecure, user.email]);

  return (
    <div className="min-h-screen py-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-teal-600">
        My Enrolled Classes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledClasses.map((cls) => (
          <div
            key={cls._id}
            className="card bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={cls.image}
              alt={cls.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{cls.title}</h2>
              <p className="text-gray-600 text-sm mb-2">
                <span className="font-medium">Teacher:</span> {cls.name}
              </p>
              <p className="text-gray-600 text-sm mb-4">{cls.description}</p>
              <Link
                to={`/dashboard/myenroll-class/${cls.classId}`}
                className="btn w-full mt-4 bg-teal-600 text-white"
              >
                Continue
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrolled;
