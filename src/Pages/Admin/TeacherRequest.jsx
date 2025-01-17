import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const TeacherRequest = () => {
  const axiosPublic = useAxiosPublic();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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
      .patch(`/teacher-requests/approved/${id}`)
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
  const handleReject = (id) => {
    axiosPublic
      .patch(`/teacher-requests/rejected/${id}`)
      .then((res) => {
        // if (res.data.modifiedCount > 0) {
        //   Swal.fire({
        //     icon: "success",
        //     title: "Request Rejected",
        //     text: "The teacher request has been rejected.",
        //   });
        //   setRequests((prev) =>
        //     prev.filter((req) => req._id !== id)
        //   ); // Remove rejected request from the UI
        // }
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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-teal-600 mb-6 text-center">
          Teacher Requests
        </h1>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse bg-gray-50 rounded-lg">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Experience</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((requestedUser) => (
                <tr key={requestedUser._id} className="text-center border-b">
                  <td className="px-4 py-2">{requestedUser.name}</td>
                  <td className="px-4 py-2">
                    <img
                      src={requestedUser.photoURL || "/default-avatar.png"}
                      alt={requestedUser.name}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 capitalize">{requestedUser.experience}</td>
                  <td className="px-4 py-2">{requestedUser.title}</td>
                  <td className="px-4 py-2">{requestedUser.category}</td>
                  <td className="px-4 py-2 capitalize">{requestedUser.status}</td>
                  <td className="px-4 py-2">
                    {requestedUser.status === "pending"?(
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleApprove(requestedUser._id, requestedUser.email)}
                          className="btn bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(requestedUser._id)}
                          className="btn bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    ): <span className="text-green-600">Accepted</span>}
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
