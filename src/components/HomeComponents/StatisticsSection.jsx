import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUserGraduate, FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import educationImg from '../../assets/education.png'

const StatisticsSection = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({});

  useEffect(() => {
  
    axiosSecure
      .get("/statistics")
      .then((res) => {
        setStats(res.data)
      })
      .catch((err) => {
        console.error( err.message);
      });
  }, [axiosSecure]);

  return (
    <div className="py-12 my-20 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
      
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
          
          <div className="card bg-white shadow-lg rounded-lg p-3 flex items-center gap-4">
            <FaUsers className="text-4xl text-teal-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">Total Users</h3>
              <p className="text-3xl text-center font-semibold text-teal-600">
                {stats.totalUsers}
              </p>
            </div>
          </div>
      
          <div className="card bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
            <FaChalkboardTeacher className="text-4xl text-teal-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">Total Classes</h3>
              <p className="text-3xl font-semibold text-center text-teal-600">
                {stats.totalClasses}
              </p>
            </div>
          </div>
          
          <div className="card bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
            <FaUserGraduate className="text-4xl text-teal-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Total Enrollments
              </h3>
              <p className="text-3xl font-semibold text-center text-teal-600">
                {stats.totalEnrolled}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="flex-1">
          <img
            src={educationImg}
            alt="Educational Illustration"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
