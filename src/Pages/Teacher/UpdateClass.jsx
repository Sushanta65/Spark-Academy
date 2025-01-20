import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const UpdateClass = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get(`/dashboard/my-class/${id}`)
      .then((res) => {
        const { title, price, description, image } = res.data;
        setFormData({ title, price, description, image }); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching class details:", error);
        setLoading(false);
      });
  }, [id, axiosPublic]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.description || !formData.image) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill in all fields.",
      });
      return;
    }

    axiosPublic
      .patch(`/teacher-class-update/${id}`, formData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Class Updated",
            text: "Your class has been successfully updated.",
          });
          navigate("/dashboard/my-class");
        } else {
          Swal.fire({
            icon: "info",
            title: "No Changes Made",
            text: "You didn't update any field.",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating class:", error);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Something went wrong. Please try again later.",
        });
      });
  };

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-teal-600"></div>
          <p className="mt-4 text-teal-600">Loading class details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-teal-600 mb-6 text-center">
          Update Class Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
      
          <div className="form-control">
            <label htmlFor="title" className="label">
              <span className="label-text text-gray-700 font-semibold">Class Title</span>
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

          <div className="form-control">
            <label htmlFor="price" className="label">
              <span className="label-text text-gray-700 font-semibold">Price ($)</span>
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

          <div className="form-control">
            <label htmlFor="description" className="label">
              <span className="label-text text-gray-700 font-semibold">Description</span>
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

          <div className="form-control">
            <label htmlFor="image" className="label">
              <span className="label-text text-gray-700 font-semibold">Image URL</span>
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

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn w-full bg-teal-600 text-white hover:bg-teal-700 py-2"
            >
              Update Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateClass;
