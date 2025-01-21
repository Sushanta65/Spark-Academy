import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa"; // React Icon for teacher avatar
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ClassDetails = () => {
  const { id } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Fetch class info
    axiosSecure
      .get(`/class-details/${id}`)
      .then((res) => {
        setClassInfo(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    // Fetch assignments for this class
    axiosSecure
      .get(`/assignments/${id}`)
      .then((res) => {
        setAssignments(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id]);

  if (!classInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
  {/* Class Header Section */}
  <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-teal-500 to-blue-600 p-6 rounded-lg shadow-lg text-white">
    {/* Class Title */}
    <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
      <h1 className="text-2xl sm:text-3xl font-bold">{classInfo.title}</h1>
    </div>

    {/* Teacher Info */}
    <div className="flex items-center space-x-4">
      {/* Teacher Avatar */}
      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
        <img src={classInfo.image} alt="Teacher" className="object-cover" />
      </div>
      {/* Teacher Name */}
      <div>
        <p className="text-lg sm:text-xl font-medium">
          Posted by: <span className="font-semibold">{classInfo.name}</span>
        </p>
      </div>
    </div>
  </div>

  {/* Price and Enrollment Section */}
  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
    <div>
      <p className="text-lg text-gray-700 font-medium">
        Price: <span className="text-teal-600 font-bold">${classInfo.price}</span>
      </p>
    </div>
    <div>
      <p className="text-lg text-gray-700 font-medium">
        Total Enrollment:{" "}
        <span className="text-teal-600 font-bold">{classInfo.enrolled}</span>
      </p>
    </div>
  </div>

  {/* Short Description Section */}
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Short Description</h2>
    <p className="text-gray-600 leading-relaxed">{classInfo.description}</p>
  </div>

  {/* Enroll Button Section */}
  <div className="flex justify-center">
    <Link to={`/class/payment/${classInfo._id}`}>
    <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-teal-600 hover:to-blue-700 transition duration-200">
      Enroll in Class
    </button>
    </Link>
  </div>

  {/* Assignments Section */}
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Assignments</h2>
    {assignments.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="p-4 text-left font-semibold">Assignment Title</th>
              <th className="p-4 text-left font-semibold">Description</th>
              <th className="p-4 text-left font-semibold">Deadline</th>
              <th className="p-4 text-left font-semibold">Marks</th>
              <th className="p-4 text-center font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id} className="hover:bg-gray-50 border-b">
                <td className="p-4">{assignment.title}</td>
                <td className="p-4">{assignment.description}</td>
                <td className="p-4">{assignment.deadline}</td>
                <td className="p-4">{assignment.marks}</td>
                <td className="p-4 text-center">
                  <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition">
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-gray-600">No assignments available for this class.</p>
    )}
  </div>
</div>

  );
};

export default ClassDetails;
