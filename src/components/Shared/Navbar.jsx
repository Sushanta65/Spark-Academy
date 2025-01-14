import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'All Classes', path: '/classes' },
    { name: 'Teach on Spark Academy', path: '/teach' },
    { name: 'Sign In', path: '/signin' },
  ];

  return (
    <div className="navbar bg-white shadow-md w-full">
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="flex items-center">
          {/* <img
            src="/logo.png"
            alt="Spark Academy Logo"
            className="h-10 w-10 mr-2"
          /> */}
          <span className="text-xl font-bold text-teal-600">
            Spark Academy
          </span>
        </div>

       
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-3">
            {links.map((link) => (
              <li key={link.path} className='text-[13px]'>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-white bg-teal-600 rounded-lg px-4 py-2'
                      : 'text-gray-700 hover:bg-teal-600 hover:text-white rounded-lg px-4 py-2 duration-500'
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

      
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
                      ? 'text-white bg-teal-600 hover:bg-teal-600 rounded-lg px-4 py-2'
                      : 'text-gray-700 hover:bg-teal-600 hover:text-white rounded-lg px-4 py-2'
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
