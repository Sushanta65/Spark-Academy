import React from 'react';
import { Helmet } from 'react-helmet-async';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>About Us | Spark Academy</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-teal-700 mb-4">About Spark Academy</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Spark Academy is a cutting-edge educational platform designed to make learning accessible, engaging, and innovative for students and educators worldwide.
          </p>
        </div>

        {/* Our Mission, Vision, and Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-white rounded-lg shadow-md text-center border-t-4 border-teal-700">
            <h3 className="text-2xl font-semibold text-teal-700 mb-3">Our Mission</h3>
            <p className="text-gray-600">Empowering students with high-quality education using modern technology and interactive tools.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md text-center border-t-4 border-teal-700">
            <h3 className="text-2xl font-semibold text-teal-700 mb-3">Our Vision</h3>
            <p className="text-gray-600">To become a global leader in online education by fostering creativity, innovation, and knowledge.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md text-center border-t-4 border-teal-700">
            <h3 className="text-2xl font-semibold text-teal-700 mb-3">Our Values</h3>
            <p className="text-gray-600">Innovation, accessibility, quality, and student-centered learning are the core of our approach.</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-teal-700 mb-6">Why Choose Spark Academy?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We offer an advanced learning platform with expert instructors, real-world projects, and a collaborative community to help students achieve success.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold text-teal-700 mb-3">Expert Instructors</h4>
            <p className="text-gray-600">Learn from the best educators with years of experience.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold text-teal-700 mb-3">Interactive Learning</h4>
            <p className="text-gray-600">Engage in real-world projects, quizzes, and collaborative sessions.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold text-teal-700 mb-3">Flexible Courses</h4>
            <p className="text-gray-600">Learn at your own pace with our flexible course structures.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold text-teal-700 mb-3">Community Support</h4>
            <p className="text-gray-600">Join a network of learners and professionals for guidance and mentorship.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold text-teal-700 mb-3">Career Opportunities</h4>
            <p className="text-gray-600">Get career guidance and placement assistance.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold text-teal-700 mb-3">Certification</h4>
            <p className="text-gray-600">Earn industry-recognized certificates upon course completion.</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-4xl font-bold text-teal-700 mb-4">Join Spark Academy Today!</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">Start your learning journey with us and gain the skills you need for a successful future.</p>
          <button className="bg-teal-700 text-white px-8 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-teal-800 transition">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
