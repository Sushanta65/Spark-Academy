import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AddClass = () => {
  const { user, userRole } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    name: user?.displayName || "",
    email: user?.email || "",
    price: "",
    description: "",
    image: "",
  });


  if(userRole === 'student' || userRole === 'admin'){
    navigate('/dashboard')
    return
   }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!formData.title || !formData.price || !formData.description || !formData.image) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill in all required fields.",
      });
      return;
    }

    // Create class with status "pending"
    const classData = {
      ...formData,
      status: "pending",
    };

    axiosPublic
      .post("/teacher-classes", classData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Class Added",
            text: "Your class has been added successfully and is pending approval.",
          });
          navigate("/dashboard/teacher/my-classes");
        }
      })
      .catch((error) => {
        console.error("Error adding class:", error);
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "Something went wrong. Please try again later.",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-teal-600 mb-6 text-center">
          Add a New Class
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="form-control">
              <label htmlFor="title" className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Class Title
                </span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter class title"
                required
              />
            </div>
  
            {/* Price */}
            <div className="form-control">
              <label htmlFor="price" className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Price ($)
                </span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter price"
                required
              />
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Your Name
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
  
            {/* Email */}
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Your Email
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
          </div>
  
          {/* Description */}
          <div className="form-control">
            <label htmlFor="description" className="label">
              <span className="label-text text-gray-700 font-semibold">
                Description
              </span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Enter class description"
              required
            />
          </div>
  
          {/* Image */}
          <div className="form-control">
            <label htmlFor="image" className="label">
              <span className="label-text text-gray-700 font-semibold">
                Image URL
              </span>
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter image URL"
              required
            />
          </div>
  
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn bg-teal-600 text-white hover:bg-teal-700 px-6 py-2 rounded-lg"
            >
              Add Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default AddClass;
