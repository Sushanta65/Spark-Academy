
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaChalkboardTeacher,
  FaUsers,
  FaList,
  FaPlus,
  FaBook,
  FaSignOutAlt,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";


const Dashboard = () => {
 const {userRole = 'student', signOutUser} = useAuth()

  const routes = [
    ...(userRole === "admin"
      ? [
          {
            path: "/dashboard/teacher-request",
            name: "Teacher Request",
            icon: <FaChalkboardTeacher />,
          },
          { path: "/dashboard/users", name: "Users", icon: <FaUsers /> },
          {
            path: "/dashboard/all-classes",
            name: "All Classes",
            icon: <FaList />,
          },
          {
            path: "/dashboard/my-profile",
            name: "My Profile",
            icon: <FaUser />,
          },
        ]
      : []),

    ...(userRole === "teacher"
      ? [
          {
            path: "/dashboard/add-class",
            name: "Add Classes",
            icon: <FaPlus />,
          },
          {
            path: "/dashboard/my-class",
            name: "My Classes",
            icon: <FaChalkboardTeacher />,
          },
          {
            path: "/dashboard/my-profile",
            name: "My Profile",
            icon: <FaUser />,
          },
        ]
      : []),

    ...(userRole === "student"
      ? [
          {
            path: "/dashboard/my-enroll",
            name: "My Enroll Classes",
            icon: <FaBook />,
          },
          {
            path: "/dashboard/my-profile",
            name: "My Profile",
            icon: <FaUser />,
          },
        ]
      : []),

      ...(userRole === "rejected"
        ? [
            {
              path: "/dashboard/my-enroll",
              name: "My Enroll Classes",
              icon: <FaBook />,
            },
            {
              path: "/dashboard/my-profile",
              name: "My Profile",
              icon: <FaUser />,
            },
          ]
        : []),
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row  border-t-2 border-teal-600">
      <Helmet>
              <title>Dashboard | Spark Academy</title>
            </Helmet>
      <div className="bg-teal-600 w-full lg:w-48 text-white relative">
        <div className="p-4 text-center font-bold border-b border-teal-500">
          Dashboard
          
        </div>
        <div className="text-center py-2 border-b-2">
        <p>{userRole === 'student'? 'Student': ''}</p>
          <p>{userRole === 'teacher'? 'Teacher': ''}</p>
          <p>{userRole === 'admin'? 'Admin': ''}</p>
        </div>
        <ul className="flex lg:flex-col text-sm">
          {routes.map((route) => (
            <li key={route.path} className="border-b border-teal-500">
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  `block py-2 px-4 flex items-center gap-2 transition ${
                    isActive ? "bg-teal-700 font-semibold" : "hover:bg-teal-700"
                  }`
                }
              >
                {route.icon} {route.name}
              </NavLink>
            </li>
          ))}
          <div className="absolute top-3 right-2 lg:right-0 lg:top-3/4 lg:bottom-20 text-center lg:w-full">
      <li className="bg-teal-800">
        <button
          onClick={signOutUser}
          className="btn btn-sm w-full rounded-none bg-teal-800 border-none text-white hover:bg-teal-900 flex items-center justify-center gap-2"
        >
          <FaSignOutAlt className="text-white" />
          Logout
        </button>
      </li>
      
    </div>
        </ul>
      </div>

      <div className="flex-1 p-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
