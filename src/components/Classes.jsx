import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { axiosPublic } from "../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import Loading from "./Loading";

const Classes = () => {
  const [sortOrder, setSortOrder] = useState("asc");

  const {
    data: classes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const response = await axiosPublic.get("/teacher-classes");
      return response.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>Failed to load classes. Please try again later.</p>;
  
  const sortedClasses = [...classes]
    .filter((cls) => cls.status === "approved")
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  return (
    <div className="container mx-auto min-h-screen py-12">
      <Helmet>
        <title>Classes | Spark Academy</title>
      </Helmet>

      <header className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-12 rounded-lg shadow-lg text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Explore Classes</h1>
        <p className="text-lg font-medium">
          Join our top-notch classes and start your learning journey today!
        </p>
      </header>
      <div className="flex justify-end mx-auto mb-6">
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
        >
          Sort by Price: {sortOrder === "asc" ? "Low to High" : "High to Low"}
        </button>
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedClasses.map((cls) => (
          <div
            key={cls._id}
            className="card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col h-full"
          >
            <div className="p-3">
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-56 object-cover rounded-lg"
              />
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                {cls.title}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                <span className="font-semibold">Teacher:</span> {cls.name}
              </p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {cls.description}
              </p>

              <div className="mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg font-bold text-teal-600">${cls.price}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{cls.enrolled}</span> Enrolled
                  </p>
                </div>

                <Link
                  to={`/class/${cls._id}`}
                  className="btn w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-lg"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
