import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const SignIn = () => {
  const { signInUser, googleSignIn, setLoading, setUser } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    signInUser(email, password)
      .then((data) => {
        setLoading(false);
        setUser(data.user);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sign-In Successful',
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          footer: 'Try another email',
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn(navigate);
  };

  const handleCredential = (email, password) => {
    setFormData({email: email, password: password})
    console.log('user called', email, password)
  }
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Helmet>
        <title>Sign In | Spark Academy</title>
      </Helmet>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center mb-6 text-teal-700">
            Welcome Back to Spark Academy
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn w-full bg-teal-700 text-white hover:bg-teal-800"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="form-control mt-4">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white"
            >
              Continue with Google
            </button>
          </div>
          <p className="text-center mt-4">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-teal-700 font-bold hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
        {/* Right Side - Credential Buttons */}
        <div className="w-1/2 bg-teal-700 text-white flex flex-col items-center justify-center p-6 space-y-4">
          <h3 className="text-xl font-semibold">Login Credentials</h3>
          <button onClick={() => handleCredential('susanto.chandra.das@gmail.com', '1234567890')} className="btn bg-white text-teal-700 w-full max-w-xs hover:bg-gray-200">
            User Credential
          </button> 
          <button onClick={() => handleCredential('susanto999@gmail.com', '12345678')} className="btn bg-white text-teal-700 w-full max-w-xs hover:bg-gray-200">
            Teacher Credential
          </button>
          <button onClick={() => handleCredential('susanto.chandra@gmail.com', 'Susanto$400D')} className="btn bg-white text-teal-700 w-full max-w-xs hover:bg-gray-200">
            Admin Credential
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
