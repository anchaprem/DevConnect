import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { addUser } from '../../store/slices/userSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    emailId: 'sravanii@gmail.com',
    password: 'Sravani@999'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/feed';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await authAPI.login(formData);
      dispatch(addUser(res.data));
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-2xl glass">
        <div className="card-body">
          <h2 className="card-title self-center text-3xl font-bold font-mono mb-4">
            <span role="img" aria-label="laptop icon">💻</span> Auth Gateway
          </h2>

          {error && (
            <div className="alert alert-error mb-4">
              <span role="img" aria-label="error icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                name="emailId"
                placeholder="user@dev.io"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.emailId}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover text-primary">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full transition-transform duration-300 hover:scale-105 ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Access Account'}
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-base-content/70">
                Don't have an account?{' '}
                <Link to="/signup" className="link link-primary font-semibold">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
