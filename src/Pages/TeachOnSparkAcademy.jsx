import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const TeachOnSparkAcademy = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const [requestStatus, setRequestStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    experience: "",
    title: "",
    category: "",
  });

  const categories = [
    "Web Development",
    "Digital Marketing",
    "Graphic Design",
    "Data Science",
    "Content Writing",
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        name: user.displayName || "",
        photoURL: user.photoURL || "",
        experience: "",
        title: "",
        category: "",
        status: "pending",
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.experience || !formData.title || !formData.category) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill in all fields.",
      });
      return;
    }

    axiosPublic
      .post("/teacher-request", formData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Request Submitted",
            text: "Your application has been submitted for review.",
          });
          setFormData({
            name: user?.displayName || "",
            email: user?.email || "",
            photoURL: user?.photoURL || "",
            experience: "",
            title: "",
            category: "",
            status: "pending",
          });
          setRequestStatus("pending");
        }
      })
      .catch((error) => {
        console.error("Error submitting request:", error);
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "Something went wrong. Please try again later.",
        });
      });
  };

  useEffect(() => {
    axiosPublic.get(`/teacher-request/${user.email}`).then((res) => {
      console.log("from get status", res);
      setRequestStatus(res.data.status || "");
    });
  }, [axiosPublic, user.email]);


  const handleAnotherRequest = () => {
    axiosPublic.patch(`/teacher-request/${user.email}`, {status: 'pending'})
    .then(res => {
      console.log('from patach', res)
      if(res.data.modifiedCount > 0){
        Swal.fire({
          icon: "success",
          title: "Request Submitted",
          text: "Your application has been submitted again for review.",
        });
        setRequestStatus('pending')
      }
      
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-teal-600"></div>
          <p className="mt-4 text-teal-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-100 flex items-center justify-center">
      <Helmet>
        <title>Teach on Spark Academy | Spark Academy</title>
      </Helmet>
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
       
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-600">
            Become a Teacher at Spark Academy
          </h1>
          <p className="text-gray-600 mt-2">
            Share your knowledge and inspire students around the world. Join
            Spark Academy as a teacher today!
          </p>
        </div>

        
        {requestStatus === "" && (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
           
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Name
                </span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                readOnly
                className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
              />
            </div>

            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Email
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                readOnly
                className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
              />
            </div>

            
            <div className="form-control">
              <label htmlFor="experience" className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Experience Level
                </span>
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled>
                  Select your experience
                </option>
                <option value="beginner">Beginner</option>
                <option value="mid-level">Mid-Level</option>
                <option value="experienced">Experienced</option>
              </select>
            </div>

            
            <div className="form-control">
              <label htmlFor="title" className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Title
                </span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter your teaching title"
                required
              />
            </div>

            
            <div className="form-control md:col-span-2">
              <label htmlFor="category" className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Category
                </span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

          
            <div className="form-control md:col-span-2 mt-4">
              <button
                type="submit"
                className="btn w-full bg-teal-600 text-white hover:bg-teal-700 py-3"
              >
                Submit for Review
              </button>
            </div>
          </form>
        )}
        {requestStatus === "pending" && (
          <div>
            <div className="flex flex-col items-center justify-center p-8">
              <h2 className="text-2xl capitalize text-green-600 pb-5">{requestStatus}</h2>
              <h2 className="text-2xl font-bold text-teal-600 my-5">
                Your Request is Under Review
              </h2>
              <p className="text-gray-600 text-center max-w-md">
                Thank you for submitting your application to become a teacher at
                Spark Academy. Our team is currently reviewing your request. You
                will be notified once the process is complete.
              </p>
            </div>
          </div>
        )}
        {requestStatus === "accepted" && (
          <div>
            <div className="flex flex-col items-center justify-center p-8">
              <h2 className="text-2xl font-bold text-green-600 my-10">
                Congratulations! 🎉
              </h2>
              <p className="text-gray-600 text-center max-w-md">
                Your application to become a teacher at Spark Academy has been
                approved! You can now start creating and managing your classes
                to inspire students worldwide.
              </p>
              <button className="mt-6 px-6 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition duration-300">
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
        {requestStatus === "rejected" && (
          <div>
            <div className="flex flex-col items-center justify-center  p-8">
              
              <h2 className="text-2xl font-bold text-red-600 my-10">
                Your Request Was Rejected 😞
              </h2>
              <p className="text-gray-600 text-center max-w-md">
                Unfortunately, your application to become a teacher at Spark
                Academy was not approved. Don't worry! You can review your
                details and submit a new request.
              </p>
              <button
                className="mt-6 px-6 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition duration-300"
                onClick={handleAnotherRequest}
              >
                Request to Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachOnSparkAcademy;
