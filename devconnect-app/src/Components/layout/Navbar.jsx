import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { removeUser } from '../../store/slices/userSlice';
import { authAPI, userAPI } from '../../services/api';
import LogoutModal from '../../Components/common/LogoutModal';
import UserAvatar from '../../Components/common/UserAvatar';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [connections, setConnections] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const [requestsRes, connectionsRes] = await Promise.all([
        userAPI.getReceivedRequests(),
        userAPI.getConnections()
      ]);
      
      setPendingRequests(requestsRes.data?.length || 0);
      setConnections(connectionsRes.data?.length || 0);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.log('Logout API error:', error);
    } finally {
      dispatch(removeUser());
      localStorage.removeItem('user');
      sessionStorage.clear();
      setShowLogoutModal(false);
      navigate('/login');
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowMobileMenu(false);
  };
  const handleFeedClick = () => {
    navigate('/feed');
    setShowMobileMenu(false);
  };
  const handleConnectionsClick = () => {
    navigate('/connections');
    setShowMobileMenu(false);
  };
  const openLogoutModal = () => setShowLogoutModal(true);
  const closeLogoutModal = () => setShowLogoutModal(false);

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className="navbar bg-gradient-to-r from-base-300 to-base-200 shadow-lg border-b border-base-300">
        <div className="flex-1">
          <a 
            className="btn btn-ghost text-xl cursor-pointer font-mono hover:scale-105 transition-transform duration-200" 
            onClick={handleFeedClick}
          >
            <span role="img" aria-label="alien icon" className="mr-2">👽</span>
            <span className="text-primary font-bold">Dev</span>
            <span className="text-secondary">Connect</span>
            <span role="img" aria-label="link icon" className="ml-2">🔗</span>
          </a>
        </div>
        
        {user && (
          <div className="flex gap-2 items-center">
            {/* Mobile Menu Toggle */}
            <div className="block md:hidden">
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <span role="img" aria-label="menu icon">
                  {showMobileMenu ? '✕' : '☰'}
                </span>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex gap-1">
              <button 
                className={`btn btn-ghost btn-sm transition-all duration-200 ${
                  isActiveRoute('/feed') 
                    ? 'btn-active bg-primary text-primary-content shadow-lg' 
                    : 'hover:bg-base-100'
                }`}
                onClick={handleFeedClick}
              >
                <span role="img" aria-label="feed icon" className="mr-1">📰</span> 
                Feed
              </button>
              
              <button 
                className={`btn btn-ghost btn-sm transition-all duration-200 ${
                  isActiveRoute('/connections') 
                    ? 'btn-active bg-secondary text-secondary-content shadow-lg' 
                    : 'hover:bg-base-100'
                }`}
                onClick={handleConnectionsClick}
              >
                <span role="img" aria-label="connections icon" className="mr-1">🔗</span> 
                Connections
                {pendingRequests > 0 && (
                  <span className="badge badge-error badge-xs ml-1 animate-pulse">
                    {pendingRequests}
                  </span>
                )}
              </button>
              
              <button 
                className={`btn btn-ghost btn-sm transition-all duration-200 ${
                  isActiveRoute('/profile') 
                    ? 'btn-active bg-accent text-accent-content shadow-lg' 
                    : 'hover:bg-base-100'
                }`}
                onClick={handleProfileClick}
              >
                <span role="img" aria-label="profile icon" className="mr-1">👤</span> 
                Profile
              </button>
            </div>

            {/* User Stats - Hidden on mobile */}
            <div className="hidden lg:flex gap-4 items-center mr-4 text-sm">
              <div className="flex items-center gap-1 text-primary">
                <span role="img" aria-label="connections icon">🔗</span>
                <span className="font-semibold">{connections}</span>
                <span className="text-xs opacity-70">connections</span>
              </div>
              
              {pendingRequests > 0 && (
                <div className="flex items-center gap-1 text-secondary animate-pulse">
                  <span role="img" aria-label="requests icon">📨</span>
                  <span className="font-semibold">{pendingRequests}</span>
                  <span className="text-xs opacity-70">pending</span>
                </div>
              )}
            </div>
            
            {/* User Greeting - Hidden on mobile */}
            <div className="hidden sm:block mr-2">
              <p className='text-primary font-semibold text-sm'>
                Hello, <span className="text-secondary">{user.firstName}</span>! 👋
              </p>
            </div>
            
            {/* User Avatar */}
            <UserAvatar 
              user={user}
              onProfileClick={handleProfileClick}
              onLogoutClick={openLogoutModal}
            />
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowMobileMenu(false)}>
          <div className="absolute top-16 right-4 bg-base-100 rounded-lg shadow-xl p-4 min-w-[200px]" onClick={(e) => e.stopPropagation()}>
            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-2 mb-4">
              <button 
                className={`btn btn-ghost btn-sm justify-start w-full ${
                  isActiveRoute('/feed') 
                    ? 'btn-active bg-primary text-primary-content' 
                    : ''
                }`}
                onClick={handleFeedClick}
              >
                <span role="img" aria-label="feed icon" className="mr-2">📰</span> 
                Feed
              </button>
              
              <button 
                className={`btn btn-ghost btn-sm justify-start w-full ${
                  isActiveRoute('/connections') 
                    ? 'btn-active bg-secondary text-secondary-content' 
                    : ''
                }`}
                onClick={handleConnectionsClick}
              >
                <span role="img" aria-label="connections icon" className="mr-2">🔗</span> 
                Connections
                {pendingRequests > 0 && (
                  <span className="badge badge-error badge-xs ml-2 animate-pulse">
                    {pendingRequests}
                  </span>
                )}
              </button>
              
              <button 
                className={`btn btn-ghost btn-sm justify-start w-full ${
                  isActiveRoute('/profile') 
                    ? 'btn-active bg-accent text-accent-content' 
                    : ''
                }`}
                onClick={handleProfileClick}
              >
                <span role="img" aria-label="profile icon" className="mr-2">👤</span> 
                Profile
              </button>
            </div>

            {/* Mobile User Stats */}
            <div className="border-t border-base-300 pt-4 mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-primary">🔗 Connections:</span>
                <span className="font-semibold">{connections}</span>
              </div>
              {pendingRequests > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary">📨 Pending:</span>
                  <span className="font-semibold animate-pulse">{pendingRequests}</span>
                </div>
              )}
            </div>

            {/* Mobile User Greeting */}
            <div className="border-t border-base-300 pt-4 text-center">
              <p className='text-primary font-semibold text-sm mb-2'>
                Hello, <span className="text-secondary">{user.firstName}</span>! 👋
              </p>
            </div>
          </div>
        </div>
      )}

      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={closeLogoutModal}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Navbar;
