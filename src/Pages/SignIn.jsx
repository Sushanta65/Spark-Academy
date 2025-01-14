import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign In Data:', formData);
    // Add your sign-in logic here
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In clicked');
    // Add your Google Sign-In logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4" style={{ color: '#0D9488' }}>
          Welcome Back to Spark Academy
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn w-full"
              style={{ backgroundColor: '#0D9488', color: 'white' }}
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Google Sign-In Button */}
        <div className="form-control mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full"
            style={{ borderColor: '#0D9488', color: '#0D9488' }}
          >
            Continue with Google
          </button>
        </div>

        {/* Redirect to Signup */}
        <p className="text-center mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-teal-600 font-bold hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
