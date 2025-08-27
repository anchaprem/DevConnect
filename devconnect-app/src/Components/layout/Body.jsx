import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { profileAPI } from '../../services/api';
import { addUser } from '../../store/slices/userSlice';
import Navbar from '../../Components/layout/Navbar';
import LoadingSpinner from '../../Components/common/LoadingSpinner';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    try {
      setError('');
      const res = await profileAPI.view();
      dispatch(addUser(res.data));
      setAuthChecked(true);
    } catch (err) {
      console.error('Auth check error:', err);
      if (err.response?.status === 401) {
        setError('Your session has expired. Please log in again.');
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError('Failed to verify your account. Please try again.');
        setTimeout(() => navigate("/login"), 3000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user && !authChecked) {
      fetchUser();
    } else if (user) {
      setIsLoading(false);
      setAuthChecked(true);
    } else if (authChecked && !user) {
      setIsLoading(false);
      navigate("/login");
    }
  }, [user, authChecked, dispatch, navigate]);

  if (isLoading) {
    return <LoadingSpinner message="Connecting to DevConnect..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-6">
        <div className="card bg-base-100 shadow-xl max-w-md">
          <div className="card-body text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="card-title justify-center text-xl text-error mb-4">
              Authentication Error
            </h2>
            <p className="text-base-content/70 mb-6">
              {error}
            </p>
            <div className="card-actions justify-center">
              <button 
                className="btn btn-primary"
                onClick={() => navigate("/login")}
              >
                <span role="img" aria-label="login icon">🔑</span> Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Body;
