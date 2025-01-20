import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ClassesAdmin = () => {
  const axiosPublic = useAxiosPublic();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userRole} = useAuth()
  const navigate = useNavigate()


  useEffect(() => {
    axiosPublic
      .get("/teacher-classes")
      .then((res) => {
        setClasses(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
        setLoading(false);
      });
  }, [axiosPublic]);


  const handleApprove = (id) => {
    axiosPublic
      .patch(`/teacher-classes/${id}`, { status: "approved" })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Approved!", "The class has been approved.", "success");
          setClasses((prev) =>
            prev.map((cls) =>
              cls._id === id ? { ...cls, status: "approved" } : cls
            )
          );
        }
      })
      .catch((error) => {
        console.error("Error approving class:", error);
        Swal.fire("Error!", "Failed to approve the class.", "error");
      });
  };

 
  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this class!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .patch(`/teacher-classes/${id}`, { status: "rejected" })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire("Rejected!", "The class has been rejected.", "success");
              setClasses((prev) =>
                prev.map((cls) =>
                  cls._id === id ? { ...cls, status: "rejected" } : cls
                )
              );
            }
          })
          .catch((error) => {
            console.error("Error rejecting class:", error);
            Swal.fire("Error!", "Failed to reject the class.", "error");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-teal-600"></div>
          <p className="mt-4 text-teal-600">Loading classes...</p>
        </div>
      </div>
    );
  }

  if(userRole === 'teacher' || userRole === 'student'){
    navigate('/dashboard')
    return
   }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-teal-600 mb-6 text-center">
          All Classes
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse bg-gray-50">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Short Description</th>
                <th className="px-4 py-3">Actions</th>
                <th className="px-4 py-3">Progress</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls._id} className="text-center border-b">
                  <td className="px-4 py-3">{cls.title}</td>
                  <td className="px-4 py-3">
                    <img
                      src={cls.image}
                      alt={cls.title}
                      className="w-16 h-16 object-cover mx-auto rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-3">{cls.email}</td>
                  <td className="px-4 py-3">{cls.description.slice(0, 50)}...</td>
                  <td className="px-4 py-3 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleApprove(cls._id)}
                      disabled={cls.status === "approved"}
                      className={`btn text-xs px-3 py-1 rounded ${
                        cls.status === "approved"
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(cls._id)}
                      disabled={cls.status === "rejected"}
                      className={`btn text-xs px-3 py-1 rounded ${
                        cls.status === "rejected"
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                    >
                      Reject
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className={`w-full h-2 rounded bg-gray-300 ${
                        cls.status === "approved"
                          ? "bg-green-600"
                          : cls.status === "rejected"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <span className="text-xs">
                      {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                    </span>
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

export default ClassesAdmin;
