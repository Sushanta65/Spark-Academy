import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import userImg from "../../assets/user.png";

const Navbar = () => {
  const { user, signOutUser, userRole } = useAuth();

  const links = [
    { name: "Home", path: "/" },
    { name: "All Classes", path: "/classes" },
    { name: "Teach on Spark Academy", path: "/teach-on-spark-academy" },
    { name: "About Us", path: "/aboutUs" },
  ];

  if (user?.email) {
    links.push({ name: "Dashboard", path: "/dashboard/overview" });
  } else {
    links.push(
      { name: "Sign In", path: "/signin" },
      { name: "Sign Up", path: "/signup" }
    );
  }

  const linkClass =
    "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300";
  const activeClass = "bg-white text-teal-600";
  const inactiveClass = "text-white hover:bg-white hover:text-teal-600";

  return (
    <>
      {userRole !== "admin" && (
        <div className="navbar bg-teal-600 text-white fixed top-0 w-full z-50">
          <div className="container mx-auto flex justify-between items-center px-4 py-2">
            <span className="text-xl font-bold">Spark Academy</span>

            <div className="hidden lg:flex">
              <ul className="flex gap-3 items-center">
                {links.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `${linkClass} ${isActive ? activeClass : inactiveClass}`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {user?.email && (
                  <li className="relative group">
                    <img
                      src={user.photoURL || userImg}
                      alt="User"
                      className="w-10 h-10 rounded-full cursor-pointer"
                    />
                    <ul className="absolute right-0 mt- hidden group-hover:block bg-white text-gray-800 shadow rounded-md w-48 z-50">
                      <li className="px-4 py-2 font-semibold">
                        {user.displayName}
                      </li>
                      <li>
                        <button
                          onClick={signOutUser}
                          className="w-full text-left px-4 py-2 hover:bg-teal-600 hover:text-white rounded-b-md"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>

            <div className="lg:hidden dropdown">
              <label tabIndex={0} className="btn btn-ghost text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 right-0 absolute z-50"
              >
                {links.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `${linkClass} ${
                          isActive
                            ? "bg-teal-600 text-white"
                            : "text-gray-800 hover:bg-teal-600 hover:text-white"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {user?.email && (
                  <li>
                    <button
                      onClick={signOutUser}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-teal-600 hover:text-white rounded-md"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
