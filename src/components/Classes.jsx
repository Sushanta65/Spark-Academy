import { useEffect, useState } from "react";
import useAxiosPublic, { axiosPublic } from "../hooks/useAxiosPublic";
import { Link } from "react-router-dom";



const Classes = () => {
const [classes, setClasses] = useState([])
const axiosPublic = useAxiosPublic()

    useEffect(() => {
      axiosPublic.get('/teacher-classes')
      .then(res => {
        setClasses(res.data)
      })
    }, [axiosPublic])
  
  return (
    <div className="min-h-screen  py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8" style={{ color: '#0D9488' }}>
        Approved Classes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes
          .filter((cls) => cls.status === "approved")
          .map((cls) => (
            <div key={cls._id} className="card bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{cls.title}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-medium">Teacher:</span> {cls.name}
                </p>
                <p className="text-gray-600 text-sm mb-4">{cls.description}</p>
                <p className="text-gray-700 font-medium">
                  Price: <span className="text-teal-600">${cls.price}</span>
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Total Enrollments: <span className="font-semibold">{cls.enrolled}</span>
                </p>
                <Link to={`/class/${cls._id}`}
                  className="btn w-full"
                  style={{ backgroundColor: '#0D9488', color: 'white' }}
                >
                  Enroll
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Classes;
