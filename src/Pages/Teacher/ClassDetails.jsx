import { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md'; // Add icon from React Icons
import AssignmentModal from '../../components/AssignmentModal'; // Assume Modal is a separate component for the modal form
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ClassDetails = () => {
    const {id} = useParams()
    const [selectedClass, setSelectedClass] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [assignments, setAssignments] = useState([])
    const axiosSecure = useAxiosSecure()


  useEffect(() => {
    axiosSecure.get(`/class-details/${id}`)
    .then(res => {
        setSelectedClass(res.data)
    })
  }, [id, axiosSecure])
  // Dummy data, replace with actual data from API/database
  const classProgress = {
    totalEnrollment: 25,
    totalAssignments: 5,
    totalSubmissions: 20,
  };

  useEffect(() => {
    axiosSecure.get('/assignments')
    .then(res => {
        console.log(res)
        setAssignments(res.data)
    })
    .catch(error => {
        console.log(error.message)
    })
  }, [])

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  console.log('assignment', assignments)
  return (
    <div className="container mx-auto p-4">
        <h2>{selectedClass.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Class Progress Section */}
        <div className="card p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold">Total Enrollment</h3>
          <p className="text-2xl font-bold">{selectedClass.enrolled}</p>
        </div>

        <div className="card p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold">Total Assignments</h3>
          <p className="text-2xl font-bold">{classProgress.totalAssignments}</p>
        </div>

        <div className="card p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold">Total Submissions</h3>
          <p className="text-2xl font-bold">{classProgress.totalSubmissions}</p>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        {/* Add Assignment Section */}
        <button
          onClick={openModal}
          className="btn btn-primary px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center gap-2"
        >
          <MdAdd className="text-xl" /> Create Assignment
        </button>
      </div>

      {/* Modal Component */}
      {isModalOpen && <AssignmentModal closeModal={closeModal} classId={id}/>}


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
              <td>0
              </td>
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
