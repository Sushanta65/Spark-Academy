import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosPublic();
  const {userRole} = useAuth()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  useEffect(() => {
    axiosSecure.get("/users", {
      headers: {
        authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    }).then((res) => {
      setUsers(res.data);
    });
  }, [axiosSecure]);

  // Make Admin Handler
  const handleMakeAdmin = (userId, userName) => {
    const message = `Are you sure to make <b class="text-teal-600">${userName}</b> <span class="text-green-600">Admin<span>? `;
    const successMessage = `<b class="text-teal-600">${userName}</b> is <span class="text-green-600">Admin</span> Now. `;
    Swal.fire({
      title: `${message}`,
      icon: "question",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Update",
      denyButtonText: `Don't Update`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${userId}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              icon: "success",
              title: `${successMessage}`,
              text: "The user has been made an admin."
            });
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user._id === userId ? { ...user, role: "admin" } : user
              )
            );
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Not Updated", "", "info");
      }
    });
  };
  
  useEffect(() => {
    
      try {
        axiosSecure.get(`/users-search?search=${search}`)
        .then(res => {
          setUsers(res.data)
          console.log(res.data)
        })
        
      } catch (error) {
        console.error("Error fetching users:", error);
      }
  

  }, [search, axiosSecure]); 


  if(userRole === 'teacher' || userRole === 'student'){
    navigate('/dashboard')
    return
   }




  return (
    <div className="min-h-screen  p-4">
      <div className="flex justify-between items-center bg-white p-5 shadow-lg mb-4">
  <div className="text-xl flex justify-between gap-20">
  <div className="text-xl font-bold">Find User: <span className="text-teal-600"> {users.length}</span></div>
  <div className="text-xl font-bold">Find Admin: <span className="text-teal-600">{users.filter(user => user.role === 'admin').length} </span></div>
  </div>
  <input
    type="text"
    placeholder="Search by name or email"
    className="input input-bordered w-64"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
    </div>
      
      <h1 className="text-3xl font-semibold text-teal-600 text-center my-10 ">
        All Users
      </h1>

      {users.length > 0? <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm bg-white shadow-md rounded-lg">
          <thead className="bg-teal-600 text-white text-xs">
            <tr>
              <th className="px-3 py-2">Image</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center border-b">
                <td className="px-3 py-2">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mx-auto"
                  />
                </td>
                <td className="px-3 py-2">{user.name}</td>
                <td className="px-3 py-2">{user.email}</td>
                <td className="px-3 py-2 capitalize">{user.role || "user"}</td>
                <td className="px-3 py-2">
                  {user.role === "admin" ? (
                    <button
                      className="btn btn-disabled text-xs text-white bg-gray-400 cursor-not-allowed"
                      disabled
                    >
                      Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id, user.name)}
                      className="btn bg-teal-600 text-white text-xs px-3 py-1 rounded hover:bg-teal-700"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : <div >
            <div>
              <h2 className="w-full text-2xl text-center py-10 text-teal-700">No User Found</h2>
            </div>
        
        </div>}
    </div>
  );
};

export default Users;
