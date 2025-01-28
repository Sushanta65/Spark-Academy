import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const MyProfile = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/users/${user?.email}`)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Helmet>
        <title>My Profile | Spark Academy</title>
      </Helmet>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex items-center space-x-6">
          <div className="avatar">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-teal-500">
              {userInfo.photoURL ? (
                <img
                  src={userInfo.photoURL}
                  alt="User Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-teal-500" />
              )}
            </div>
          </div>

          <div className="text-sm">
            <h1 className="text-lg font-bold text-teal-600">{userInfo.name}</h1>
            <p className="text-gray-600">Email: {userInfo.email}</p>
            <p className="text-gray-600">Role: {userInfo.role}</p>
          </div>
        </div>
      </div>

      <div className="bg-teal-50 p-4 rounded-lg shadow-md">
        <h2 className="text-teal-600 font-semibold text-sm mb-2">
          Welcome back, {userInfo.name}!
        </h2>
        <p className="text-gray-500 text-xs">
          Thank you for being a part of our platform. Explore your dashboard and
          manage your profile here.
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
