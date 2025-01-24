import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import ReactStars from "react-rating-stars-component";

const MyEnrollClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [enrolledClass, setEnrolledClass] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const {user} = useAuth()
  const [assignmentSubmitLink, setAssignmentSubmitLink] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Fetch class info
    axiosSecure
      .get(`/enrolled-class/${id}`)
      .then((res) => {
        setEnrolledClass(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [axiosSecure, id]);

  useEffect(() => {
    if (enrolledClass && enrolledClass.classId) {
      axiosSecure
        .get(`/assignments/${enrolledClass.classId}`)
        .then((res) => {
          setAssignments(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [axiosSecure, enrolledClass]);


  const handleSubmit = (assignmentId) => {
    console.log(assignmentId)

    if (!assignmentSubmitLink) {
      Swal.fire({
        title: "Please Provide Submission Link.",
        icon: "error",
        draggable: true
      });
      return;
    }

   
    const submissionData = { assignmentId, studentEmail: user?.email, assignmentSubmitLink };

    axiosSecure
      .post('/submit-assignment', submissionData)
      .then((res) => {
        console.log(res)
        if(res.data.message === 'Submission-successful!'){
          Swal.fire({
            title: "Assignment Submited Successfully.",
            icon: "success",
            draggable: true
          });
          setAssignmentSubmitLink('')
        }
      })
      .catch((err) => {
        if(err.response.data.message === 'Already-submitted'){
          Swal.fire({
            title: "You Alredy Submited The Assignment.",
            icon: "error",
            draggable: true
          });
          setAssignmentSubmitLink('')
        }
      });
  };


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setReview("");
    setRating(0);
  };


  const handleSubmitReview = () => {
    if (!review || rating === 0) {
      Swal.fire("Error", "Please provide both a review and a star rating.", "error");
      return;
    }

    const reviewData = {
      classId: enrolledClass.classId,
      studentEmail: user?.email,
      review,
      rating,
    };

    axiosSecure
      .post("/submit-review", reviewData)
      .then((res) => {
        Swal.fire(
          "Thank You!",
          "Your teaching evaluation report has been submitted.",
          "success"
        );
        closeModal();
      })
      .catch((err) => {
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Class Details Section */}
      <div className="mt-8 flex justify-end">
          <button onClick={openModal} className="btn btn-primary">
            Teaching Evaluation Report
          </button>
        </div>
      {enrolledClass && (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center">
            <img
              src={enrolledClass.image}
              alt={enrolledClass.title}
              className="w-24 h-24 object-cover rounded-md shadow-lg"
            />
            <div className="ml-6">
              <h2 className="text-2xl font-semibold text-teal-600 mb-2">
                {enrolledClass.title}
              </h2>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Teacher:</span>{" "}
                {enrolledClass.name}
              </p>
              <p className="text-gray-600">{enrolledClass.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Assignments Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          Assignments
        </h2>
        {assignments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm border-collapse">
              <thead className="bg-teal-100 text-gray-800">
                <tr>
                  <th className="p-4 text-left font-semibold">Title</th>
                  <th className="p-4 text-left font-semibold">Description</th>
                  <th className="p-4 text-left font-semibold">Deadline</th>
                  <th className="p-4 text-left font-semibold">
                    Submit Assignment Link
                  </th>
                  <th className="p-4 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr
                    key={assignment._id}
                    className="hover:bg-gray-50 border-b"
                  >
                    <td className="p-4">{assignment.title}</td>
                    <td className="p-4">{assignment.description}</td>
                    <td className="p-4">{assignment.deadline}</td>
                    <td className="p-4">
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered  w-full max-w-xs"
                        onChange={(e) => setAssignmentSubmitLink(e.target.value)}
                      />
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => handleSubmit(assignment._id)} className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition">
                        Submit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">
            No assignments available for this class.
          </p>
        )}
      </div>
      {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">
                Teaching Evaluation Report
              </h3>
              <p className="mb-2">Rate your experience:</p>
              <ReactStars
                count={5}
                onChange={(newRating) => setRating(newRating)}
                size={30}
                activeColor="#ffd700"
              />
              <textarea
                className="textarea textarea-bordered w-full mt-4"
                placeholder="Write your review here..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <div className="modal-action">
                <button onClick={closeModal} className="btn btn-outline">
                  Cancel
                </button>
                <button onClick={handleSubmitReview} className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default MyEnrollClassDetails;
