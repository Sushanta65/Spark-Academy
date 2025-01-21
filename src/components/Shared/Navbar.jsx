import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import userImg from "../../assets/user.png";

const Navbar = () => {
  const { user, signOutUser, userRole } = useAuth();
  
  "From navbar", user;
  const links = [
    { name: "Home", path: "/" },
    { name: "All Classes", path: "/classes" },
    { name: "Teach on Spark Academy", path: "/teach-on-spark-academy" },
  ];

  if (user?.email) {
    links.push({ name: "Dashboard", path: "/dashboard/my-profile" });
  } else {
    links.push(
      { name: "Sign In", path: "/signin" },
      { name: "Sign Up", path: "/signup" }
    );
  }


  return (
    <>{userRole === 'admin' || <div className="navbar bg-white shadow-md w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-xl font-bold text-teal-600">Spark Academy</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-3">
            {links.map((link) => (
              <li key={link.path} className="text-[13px]">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-teal-600 rounded-lg px-4 py-2"
                      : "text-gray-700 hover:bg-teal-600 hover:text-white rounded-lg px-4 py-2 duration-500"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            {/* User Dropdown */}
            {user?.email && (
              <li className="dropdown dropdown-hover relative">
                <img
                  className="w-10 p-0 rounded-full cursor-pointer"
                  src={user.photoURL ? user.photoURL : userImg}
                  alt=""
                  tabIndex={0}
                />
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-white  w-52  absolute right-0"
                >
                  <li className="text-gray-700 font-semibold px-4 py-2">
                    {user.displayName}
                  </li>
                  <li>
                    <button
                      onClick={signOutUser}
                      className="text-gray-700 hover:bg-teal-600 hover:text-white px-4 py-2 rounded-lg duration-300"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 right-5"
          >
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-teal-600 hover:bg-teal-600 rounded-lg px-4 py-2"
                      : "text-gray-700 hover:bg-teal-600 hover:text-white rounded-lg px-4 py-2"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            {/* Mobile User Dropdown */}
            {user?.email && (
              <li>
                <button
                  className="text-gray-700 hover:bg-teal-600 hover:text-white px-4 py-2 rounded-lg duration-300"
                  onClick={signOutUser}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>}</>
  );
};

export default Navbar;
