import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";

const TeachOnSparkAcademy = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true); // Loading state
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
          });
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-600">
            Become a Teacher at Spark Academy
          </h1>
          <p className="text-gray-600 mt-2">
            Share your knowledge and inspire students around the world. Join
            Spark Academy as a teacher today!
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text text-gray-700 font-semibold">Name</span>
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

          {/* Email */}
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text text-gray-700 font-semibold">Email</span>
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

          {/* Experience Level */}
          <div className="form-control">
            <label htmlFor="experience" className="label">
              <span className="label-text text-gray-700 font-semibold">Experience Level</span>
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

          {/* Title */}
          <div className="form-control">
            <label htmlFor="title" className="label">
              <span className="label-text text-gray-700 font-semibold">Title</span>
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

          {/* Category */}
          <div className="form-control md:col-span-2">
            <label htmlFor="category" className="label">
              <span className="label-text text-gray-700 font-semibold">Category</span>
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

          {/* Submit Button */}
          <div className="form-control md:col-span-2 mt-4">
            <button
              type="submit"
              className="btn w-full bg-teal-600 text-white hover:bg-teal-700 py-3"
            >
              Submit for Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeachOnSparkAcademy;
