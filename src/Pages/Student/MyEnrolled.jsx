import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MyEnrolled = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [enrolledClasses, setEnrolledClasses] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/enrolled-classes/${user?.email}`).then((res) => {
      setEnrolledClasses(res.data);
    });
  }, [axiosSecure, user?.email]);

  return (
    <div className="min-h-screen p-5  ">
      <Helmet>
        <title>My Enrolled | Spark Academy</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">
            My Enrolled Classes
          </h2>
          <Link
            className="px-5 py-2 bg-teal-600 rounded-xl text-white text-sm hover:bg-teal-700 transition-all shadow-md"
            to="/dashboard/payment-history"
          >
            Payment History
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledClasses.map((cls) => (
            <div
              key={cls._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {cls.title}
                </h2>
                <p className="text-gray-600 text-sm my-2">
                  <span className="font-medium">Teacher:</span> {cls.name}
                </p>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {cls.description}
                </p>

                <Link
                  to={`/dashboard/myenroll-class/${cls._id}`}
                  className="block w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded-lg transition-all shadow-md"
                >
                  Continue Learning
                </Link>
              </div>
            </div>
          ))}
        </div>

        {enrolledClasses.length === 0 && (
          <p className="text-center text-gray-500 mt-12 text-lg">
            You haven’t enrolled in any classes yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyEnrolled;
