import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const SignIn = () => {
  const {signInUser, googleSignIn, setLoading, setUser} = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
const navigate = useNavigate()



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = formData;
    
    signInUser(email, password)
    .then(data => {
                setLoading(false)
                setUser(data.user)
                Swal.fire({
                    position: "middle-center",
                    icon: "success",
                    title: "SignIn Successfull.",
                    showConfirmButton: false,
                    timer: 2000
                  });
                  navigate('/')
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text:  `${error.message}`,
                    footer: 'Try to use another email'
                  });
            })
  };

  const handleGoogleSignIn = () => {
    googleSignIn(navigate)
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Helmet>
              <title>Sign In | Spark Academy</title>
            </Helmet>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4" style={{ color: '#0D9488' }}>
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
              className="btn w-full"
              style={{ backgroundColor: '#0D9488', color: 'white' }}
            >
              Sign In
            </button>
          </div>
        </form>

       
        <div className="form-control mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full"
            style={{ borderColor: '#0D9488', color: '#0D9488' }}
          >
            Continue with Google
          </button>
        </div>

        
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
