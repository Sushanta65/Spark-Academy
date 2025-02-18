import React from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DashboardOverview = () => {
  const { data: stats = {} } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/statistics");
      return data;
    },
  });

  const enrollmentsData = [
    { month: "Jan", enrollments: 2 },
    { month: "Feb", enrollments: 3 },
    { month: "Mar", enrollments: 2 },
    { month: "Apr", enrollments: 4 },
    { month: "May", enrollments: 5 },
    { month: "Jun", enrollments: 1 },
  ];

  const userData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Classes", value: stats.totalClasses },
    { name: "Enrollments", value: stats.totalEnrolled },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <FaUserGraduate className="text-blue-500 text-4xl mr-4" />
          <div>
            <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
            <p className="text-gray-600">Total Users</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <FaChalkboardTeacher className="text-green-500 text-4xl mr-4" />
          <div>
            <h2 className="text-2xl font-bold">{stats.totalEnrolled}</h2>
            <p className="text-gray-600">Total Enrollments</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <FaBookOpen className="text-yellow-500 text-4xl mr-4" />
          <div>
            <h2 className="text-2xl font-bold">{stats.totalClasses}</h2>
            <p className="text-gray-600">Total Classes</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Enrollment Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enrollmentsData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="enrollments" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">User Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                dataKey="value"
              >
                {userData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
