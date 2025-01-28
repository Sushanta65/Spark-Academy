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
    <div className="min-h-screen  p-4">
  <div className="max mx-auto  p-4">
    <h1 className="text-3xl font-bold text-teal-600 mb-4 text-center ">All Classes</h1>
    <div className="overflow-x-auto">
      {classes.length > 0 ? <table className="table-auto w-full border-collapse bg-gray-50 text-sm mt-10">
        <thead className="bg-teal-600  text-white">
          <tr>
            <th className="px-3 py-2">No</th>
            <th className="px-3 py-2">Title</th>
            <th className="px-3 py-2">Image</th>
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Short Description</th>
            <th className="px-3 py-2">Actions</th>
            <th className="px-3 py-2">Progress</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, index) => (
            <tr key={cls._id} className="text-center border-b hover:bg-gray-100">
              <td>{index + 1}</td>
              <td className="px-3 py-2 font-medium text-gray-700">{cls.title}</td>
              <td className="px-3 py-2">
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-12 h-12 object-cover mx-auto rounded-md"
                />
              </td>
              <td className="px-3 py-2 text-gray-600">{cls.name}</td>
              <td className="px-3 py-2 text-gray-500">
                {cls.description.slice(0, 50)}...
              </td>
              <td className="px-3 py-2 flex items-center justify-center gap-2">
                <button
                  onClick={() => handleApprove(cls._id)}
                  disabled={cls.status === "approved"}
                  className={`text-xs px-2 py-1 rounded ${
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
                  className={`text-xs px-2 py-1 rounded ${
                    cls.status === "rejected"
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  Reject
                </button>
              </td>
              <td className="px-3 py-2">
                <div
                  className={`w-full h-2 rounded bg-gray-300 mb-1 ${
                    cls.status === "approved"
                      ? "bg-green-600"
                      : cls.status === "rejected"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                ></div>
                <span className="text-xs text-gray-600">
                  {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table> : <div >
            <div>
              <h2 className="w-full text-2xl text-center py-10 text-teal-700">No Classes Found</h2>
            </div>
        
        </div>}
    </div>
  </div>
</div>

  );
};

export default ClassesAdmin;
