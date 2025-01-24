import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyEnrollClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [enrolledClass, setEnrolledClass] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const {user} = useAuth()
  const [assignmentSubmitLink, setAssignmentSubmitLink] = useState('')

  useEffect(() => {
    // Fetch class info
    axiosSecure
      .get(`/enrolled-class/${id}`)
      .then((res) => {
        setEnrolledClass(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [axiosSecure, id]);

  useEffect(() => {
    if (enrolledClass && enrolledClass.classId) {
      axiosSecure
        .get(`/assignments/${enrolledClass.classId}`)
        .then((res) => {
          setAssignments(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [axiosSecure, enrolledClass]);


  const handleSubmit = (assignmentId) => {
    console.log(assignmentId)

    if (!assignmentSubmitLink) {
      alert('Please provide a submission link!');
      return;
    }

   

    const submissionData = { assignmentId, studentEmail: user?.email, assignmentSubmitLink };

    axiosSecure
      .post('/submit-assignment', submissionData)
      .then((res) => console.log(res.data.message || 'Submission successful'))
      .catch((err) => console.log(err.response.data.message || 'Submission failed'));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Class Details Section */}
      {enrolledClass && (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center">
            <img
              src={enrolledClass.image}
              alt={enrolledClass.title}
              className="w-24 h-24 object-cover rounded-md shadow-lg"
            />
            <div className="ml-6">
              <h2 className="text-2xl font-semibold text-teal-600 mb-2">
                {enrolledClass.title}
              </h2>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Teacher:</span>{" "}
                {enrolledClass.name}
              </p>
              <p className="text-gray-600">{enrolledClass.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Assignments Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          Assignments
        </h2>
        {assignments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm border-collapse">
              <thead className="bg-teal-100 text-gray-800">
                <tr>
                  <th className="p-4 text-left font-semibold">Title</th>
                  <th className="p-4 text-left font-semibold">Description</th>
                  <th className="p-4 text-left font-semibold">Deadline</th>
                  <th className="p-4 text-left font-semibold">
                    Submit Assignment Link
                  </th>
                  <th className="p-4 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr
                    key={assignment._id}
                    className="hover:bg-gray-50 border-b"
                  >
                    <td className="p-4">{assignment.title}</td>
                    <td className="p-4">{assignment.description}</td>
                    <td className="p-4">{assignment.deadline}</td>
                    <td className="p-4">
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered  w-full max-w-xs"
                        onChange={(e) => setAssignmentSubmitLink(e.target.value)}
                      />
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => handleSubmit(assignment._id)} className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition">
                        Submit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">
            No assignments available for this class.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyEnrollClassDetails;
