import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const TeacherRequest = () => {
  const axiosPublic = useAxiosPublic();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userRole} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    axiosPublic
      .get("/teacher-requests")
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
        setLoading(false);
      });
  }, [axiosPublic]);

  // Handle approve button click
  const handleApprove = (id, email) => {
    axiosPublic
      .patch(`/teacher-requests/${id}`, {status: 'accepted'})
      .then((res) => {
        if (res.data.modifiedCount > 0) {

            axiosPublic.patch(`/users/${email}`, {role: 'teacher'})
            .then(res => {
                console.log(res)
            })

          Swal.fire({
            icon: "success",
            title: "Request Approved",
            text: "The teacher request has been approved.",
          });
          setRequests((prev) =>
            prev.map((req) =>
              req._id === id ? { ...req, status: "accepted" } : req
            )
          );
        }
      })
      .catch((error) => {
        console.error("Error approving request:", error);
        Swal.fire({
          icon: "error",
          title: "Approval Failed",
          text: "Something went wrong. Please try again.",
        });
      });
  };

  // Handle reject button click
  const handleReject = (id, email) => {
    axiosPublic
      .patch(`/teacher-requests/${id}`, {status: 'rejected'})
      .then((res) => {
        if (res.data.modifiedCount > 0) {

            axiosPublic.patch(`/users/${email}`, {role: 'rejected'})
            .then(res => {
                console.log(res)
            })
          Swal.fire({
            icon: "success",
            title: "Request Rejected",
            text: "The teacher request has been rejected.",
          });
          setRequests((prev) =>
            prev.map((req) =>
              req._id === id ? { ...req, status: "rejected" } : req
            )
          );
        
        }
        console.log(res)
      })
      .catch((error) => {
        console.error("Error rejecting request:", error);
        Swal.fire({
          icon: "error",
          title: "Rejection Failed",
          text: "Something went wrong. Please try again.",
        });
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-teal-600"></div>
          <p className="mt-4 text-teal-600">Loading requests...</p>
        </div>
      </div>
    );
  }

  if(userRole === 'teacher' || userRole === 'student'){
    navigate('/dashboard')
    return
   }

  return (
    <div className=" bg-gray-100 p-4 flex items-center justify-center">
    <div className="w-full  bg-white rounded-lg shadow-md p-4">
      <h1 className="text-xl font-bold text-teal-600 mb-4 text-center">
        Teacher Requests
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm border-collapse bg-gray-50">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-2 py-3 text-left">Name</th>
              <th className="px-2 py-3 text-center">Image</th>
              <th className="px-2 py-3 text-center">Experience</th>
              <th className="px-2 py-3 text-center">Title</th>
              <th className="px-2 py-3 text-center">Category</th>
              <th className="px-2 py-3 text-center">Status</th>
              <th className="px-2 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((requestedUser) => (
              <tr key={requestedUser._id} className="border-b">
                <td className="px-2 py-2">{requestedUser.name}</td>
                <td className="px-2 py-2 text-center">
                  <img
                    src={requestedUser.photoURL || "/default-avatar.png"}
                    alt={requestedUser.name}
                    className="w-8 h-8 rounded-full mx-auto"
                  />
                </td>
                <td className="px-2 py-2 text-center capitalize">
                  {requestedUser.experience}
                </td>
                <td className="px-2 py-2 text-center">{requestedUser.title}</td>
                <td className="px-2 py-2 text-center">{requestedUser.category}</td>
                <td
                  className={`px-2 py-2 text-center capitalize ${
                    requestedUser.status === "rejected"
                      ? "text-red-600"
                      : requestedUser.status === "accepted"
                      ? "text-green-600"
                      : "text-teal-600"
                  }`}
                >
                  {requestedUser.status}
                </td>
                <td className="px-2 py-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      disabled={
                        requestedUser.status === "accepted" ||
                        requestedUser.status === "rejected"
                      }
                      onClick={() =>
                        handleApprove(requestedUser._id, requestedUser.email)
                      }
                      className="btn bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs"
                    >
                      Approve
                    </button>
                    <button
                      disabled={
                        requestedUser.status === "accepted" ||
                        requestedUser.status === "rejected"
                      }
                      onClick={() =>
                        handleReject(requestedUser._id, requestedUser.email)
                      }
                      className="btn bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default TeacherRequest;
