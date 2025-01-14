import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photoURL: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
};

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In clicked');
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4" style={{ color: '#0D9488' }}>
          Sign Up for Spark Academy
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter your name"
              required
            />
          </div>

         
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

          
          <div className="form-control">
            <label htmlFor="photoURL" className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="url"
              id="photoURL"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter photo URL"
            />
          </div>

         
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn w-full"
              style={{ backgroundColor: '#0D9488', color: 'white' }}
            >
              Sign Up
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
          Already have an account?{' '}
          <Link to="/signin" className="text-teal-600 font-bold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
