import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md"; // Add icon from React Icons
import AssignmentModal from "../../components/AssignmentModal"; // Assume Modal is a separate component for the modal form
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ClassDetails = () => {
  const { id } = useParams();
  const [selectedClass, setSelectedClass] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/class-details/${id}`).then((res) => {
      setSelectedClass(res.data);
    });
  }, [id, axiosSecure]);

  useEffect(() => {
    axiosSecure
      .get(`/assignments/${id}`)
      .then((res) => {
        console.log(res);
        setAssignments(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [axiosSecure, id]);

  const totalSubmissions = assignments.reduce(
    (totalSubmission, assignment) =>
      totalSubmission + (assignment.submission || 0),
    0
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Class Details | Spark Academy</title>
      </Helmet>
      <h2>{selectedClass.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold">Total Enrollment</h3>
          <p className="text-2xl font-bold">{selectedClass.enrolled}</p>
        </div>

        <div className="card p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold">Total Assignments</h3>
          <p className="text-2xl font-bold">{assignments.length}</p>
        </div>

        <div className="card p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold">Total Submissions</h3>
          <p className="text-2xl font-bold">{totalSubmissions}</p>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={openModal}
          className="btn btn-primary px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center gap-2"
        >
          <MdAdd className="text-xl" /> Create Assignment
        </button>
      </div>

      {isModalOpen && <AssignmentModal closeModal={closeModal} classId={id} />}

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Assignment Title</th>
              <th>Description</th>
              <th>Marks</th>
              <th>Deadline</th>
              <th>Submit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={index}>
                <td>{assignment.title}</td>
                <td>{assignment.description}</td>
                <td>{assignment.marks}</td>
                <td>{assignment.deadline}</td>
                <td>{assignment.submission}</td>
                <td>
                  <button className="btn btn-outline btn-warning btn-sm">
                    <i className="ri-check-line"></i> Check
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassDetails;
