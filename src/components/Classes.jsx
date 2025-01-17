

// Example JSON data (replace with fetched data from your backend)
const classData = [
  {
    id: "1",
    title: "Web Development Bootcamp",
    teacherName: "John Doe",
    image: "https://example.com/images/web-development.jpg",
    price: 200,
    shortDescription: "Learn the basics of web development, including HTML, CSS, and JavaScript.",
    totalEnrollment: 50,
    status: "approved"
  },
  {
    id: "2",
    title: "Graphic Design Masterclass",
    teacherName: "Jane Smith",
    image: "https://example.com/images/graphic-design.jpg",
    price: 150,
    shortDescription: "Master graphic design tools and techniques to create stunning visuals.",
    totalEnrollment: 30,
    status: "approved"
  },
  {
    id: "3",
    title: "Digital Marketing 101",
    teacherName: "Emily Johnson",
    image: "https://example.com/images/digital-marketing.jpg",
    price: 100,
    shortDescription: "Explore the fundamentals of digital marketing, including SEO and social media.",
    totalEnrollment: 45,
    status: "approved"
  },
  {
    id: "4",
    title: "Photography Basics",
    teacherName: "Mark Wilson",
    image: "https://example.com/images/photography.jpg",
    price: 120,
    shortDescription: "Understand the art of photography, from camera settings to composition.",
    totalEnrollment: 25,
    status: "approved"
  },
  {
    id: "5",
    title: "Python Programming for Beginners",
    teacherName: "Alice Brown",
    image: "https://example.com/images/python-programming.jpg",
    price: 180,
    shortDescription: "Start your programming journey with Python, one of the most versatile languages.",
    totalEnrollment: 60,
    status: "approved"
  }
];

const Classes = () => {
  
  return (
    <div className="min-h-screen  py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8" style={{ color: '#0D9488' }}>
        Approved Classes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classData
          .filter((classItem) => classItem.status === "approved")
          .map((classItem) => (
            <div key={classItem.id} className="card bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={classItem.image}
                alt={classItem.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{classItem.title}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-medium">Teacher:</span> {classItem.teacherName}
                </p>
                <p className="text-gray-600 text-sm mb-4">{classItem.shortDescription}</p>
                <p className="text-gray-700 font-medium">
                  Price: <span className="text-teal-600">${classItem.price}</span>
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Total Enrollments: <span className="font-semibold">{classItem.totalEnrollment}</span>
                </p>
                <button
                  className="btn w-full"
                  style={{ backgroundColor: '#0D9488', color: 'white' }}
                >
                  Enroll
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Classes;
