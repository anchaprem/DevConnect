import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { addUser } from '../../store/slices/userSlice';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.emailId.trim()) errors.emailId = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.emailId)) errors.emailId = 'Email is invalid';
    
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const { confirmPassword, ...signupData } = formData;
      const res = await authAPI.signup(signupData);
      
      dispatch(addUser(res.data));
      navigate('/feed', { replace: true });
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-2xl glass">
        <div className="card-body">
          <h2 className="card-title self-center text-3xl font-bold font-mono mb-4">
            <span role="img" aria-label="rocket icon">🚀</span> Join DevConnect
          </h2>

          {error && (
            <div className="alert alert-error mb-4">
              <span role="img" aria-label="error icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">First Name</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                    validationErrors.firstName ? 'input-error' : ''
                  }`}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
                {validationErrors.firstName && (
                  <label className="label">
                    <span className="label-text-alt text-error">{validationErrors.firstName}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Last Name</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                    validationErrors.lastName ? 'input-error' : ''
                  }`}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
                {validationErrors.lastName && (
                  <label className="label">
                    <span className="label-text-alt text-error">{validationErrors.lastName}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                name="emailId"
                placeholder="john@dev.io"
                className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                  validationErrors.emailId ? 'input-error' : ''
                }`}
                value={formData.emailId}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
              {validationErrors.emailId && (
                <label className="label">
                  <span className="label-text-alt text-error">{validationErrors.emailId}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                  validationErrors.password ? 'input-error' : ''
                }`}
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
              {validationErrors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{validationErrors.password}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                  validationErrors.confirmPassword ? 'input-error' : ''
                }`}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
              {validationErrors.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-error">{validationErrors.confirmPassword}</span>
                </label>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full transition-transform duration-300 hover:scale-105 ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-base-content/70">
                Already have an account?{' '}
                <Link to="/login" className="link link-primary font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
