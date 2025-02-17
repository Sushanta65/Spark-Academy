import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { axiosPublic } from "../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Classes = () => {
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

  if (isLoading) return <p>Loading classes...</p>;
  if (isError) return <p>Failed to load classes. Please try again later.</p>;

  return (
    <div className="container mx-auto min-h-screen py-12 p">
      <Helmet>
        <title>Classes | Spark Academy</title>
      </Helmet>
      <header className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-12 rounded-lg shadow-lg text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Explore Classes</h1>
        <p className="text-lg font-medium">
          Join our top-notch classes and start your learning journey today!
        </p>
      </header>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes
            .filter((cls) => cls.status === "approved")
            .map((cls) => (
              <div
                key={cls._id}
                className="card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="p-3">
                  <img
                    src={cls.image}
                    alt={cls.title}
                    className="w-full h-56 object-cover"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">
                    {cls.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-semibold">Teacher:</span> {cls.name}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {cls.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-bold text-teal-600">
                      ${cls.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">{cls.enrolled}</span>{" "}
                      Enrolled
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
            ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
