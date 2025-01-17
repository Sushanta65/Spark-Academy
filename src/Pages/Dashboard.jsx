
import { NavLink, Outlet } from "react-router-dom";
import {
  FaUser,
  FaChalkboardTeacher,
  FaUsers,
  FaList,
  FaPlus,
  FaBook,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";


const Dashboard = () => {
 const {userRole = 'student'} = useAuth()
  

  // Determine user role (default to student if undefined)
  

  // Sidebar items based on role
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
            path: "/dashboard/add-classes",
            name: "Add Classes",
            icon: <FaPlus />,
          },
          {
            path: "/dashboard/my-classes",
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
            path: "/dashboard/my-enroll-classes",
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 border-t-2 border-teal-600">
      <div className="bg-teal-600 w-full lg:w-48 text-white">
        <div className="p-4 text-center font-bold border-b border-teal-500">
          Dashboard
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
        </ul>
      </div>

      <div className="flex-1 p-4 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
