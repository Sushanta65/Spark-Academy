import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignmentModal = ({ closeModal, classId }) => {
  const axiosSecure = useAxiosSecure();
  const [assignment, setAssignment] = useState({
    title: "",
    deadline: "",
    description: "",
    classId,
    submission: 0,
    mark: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosSecure
      .post("/assignments", assignment)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Assignment Added Successfully.",
            icon: "success",
            draggable: true,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Something Went Wrong to Create Assignment",
          icon: "error",
          draggable: true,
        });
      });

  
    closeModal(); 
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="card bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Create New Assignment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Assignment Title
            </label>
            <input
              type="text"
              name="title"
              value={assignment.title}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Assignment Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={assignment.deadline}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Assignment Description
            </label>
            <textarea
              name="description"
              value={assignment.description}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-secondary py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentModal;
