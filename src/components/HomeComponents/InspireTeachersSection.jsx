import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import inspireImg from '../../assets/inspire.png'

const InspireTeachersSection = () => {
  return (
    <section className="bg-gradient-to-r from-teal-500 to-teal-600 text-white pt-16 pb-16 mb-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center space-x-8">
       
        <div className="w-full lg:w-1/2">
          <img src={inspireImg} alt="Inspiring Teacher" className="rounded-lg shadow-lg object-cover w-full h-96 lg:h-auto" />
        </div>

        
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl font-semibold leading-tight">
            Empower the Next Generation of Learners
          </h2>
          <p className="text-lg">
            Join a community of passionate educators who are transforming education with Spark Academy. Take control of your teaching career, reach students globally, and experience a supportive environment to grow and thrive.
          </p>

        
          <ul className="space-y-4 text-lg">
            <li className="flex items-center">
              <FaCheckCircle className="text-white mr-2" size={24} />
              <span>Teach and inspire students worldwide.</span>
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-white mr-2" size={24} />
              <span>Access powerful tools for class management.</span>
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-white mr-2" size={24} />
              <span>Get real-time updates on student progress.</span>
            </li>
          </ul>

         
          <div>
            <Link to="/teach-on-spark-academy" className="btn bg-teal-700 hover:bg-teal-900 border-none text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
              Start Teaching Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InspireTeachersSection;
