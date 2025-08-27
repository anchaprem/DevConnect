import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAPI, connectionAPI } from '../services/api';
import LoadingSpinner from '../Components/common/LoadingSpinner';

const Connections = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  
  // State management
  const [connections, setConnections] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [pendingConnections, setPendingConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('connections');
  const [processingRequest, setProcessingRequest] = useState(null);
  const [debugInfo, setDebugInfo] = useState({});
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Always log the current state for debugging
  console.log('🔍 Connections Component Debug:', {
    user: user,
    userType: typeof user,
    userKeys: user ? Object.keys(user) : 'No user',
    userHasId: user && user._id ? 'Yes' : 'No',
    userHasEmail: user && user.emailId ? 'Yes' : 'No',
    connectionsCount: connections.length,
    requestsCount: receivedRequests.length,
    pendingCount: pendingConnections.length,
    isLoading,
    error,
    activeTab,
    showMobileMenu
  });

  useEffect(() => {
    console.log('🔄 useEffect triggered with user:', user);
    
    // Always try to fetch data, even if user seems invalid
    fetchData();
  }, []); // Remove user dependency to avoid infinite loops

  const fetchData = async () => {
    try {
      console.log('🚀 Starting fetchData...');
      setIsLoading(true);
      setError('');
      
      // Test basic connectivity first
      try {
        const healthCheck = await fetch('http://localhost:3000/health');
        console.log('✅ Health check successful:', healthCheck.status);
      } catch (healthError) {
        console.error('❌ Health check failed:', healthError);
        setError('Server is not accessible. Please check if the backend is running.');
        setIsLoading(false);
        return;
      }

      // Check if we have a valid user
      if (!user || !user._id) {
        console.log('⚠️ No valid user found, but continuing with API calls...');
        setError('User not authenticated. Please log in again.');
        setIsLoading(false);
        return;
      }

      console.log('👤 Fetching data for user:', user._id);
      
      // Fetch all data with proper error handling
      const [connectionsRes, requestsRes, pendingRes] = await Promise.allSettled([
        userAPI.getConnections(),
        userAPI.getReceivedRequests(),
        userAPI.getPendingConnections()
      ]);
      
      console.log('📡 API Responses:', {
        connections: connectionsRes,
        requests: requestsRes,
        pending: pendingRes
      });
      
      // Process connections response
      let connectionsData = [];
      if (connectionsRes.status === 'fulfilled' && connectionsRes.value?.data) {
        connectionsData = connectionsRes.value.data;
        console.log('✅ Connections loaded:', connectionsData.length);
      } else {
        console.error('❌ Connections failed:', connectionsRes.reason);
      }
      
      // Process requests response
      let requestsData = [];
      if (requestsRes.status === 'fulfilled' && requestsRes.value?.data) {
        requestsData = requestsRes.value.data;
        console.log('✅ Requests loaded:', requestsData.length);
      } else {
        console.error('❌ Requests failed:', requestsRes.reason);
      }
      
      // Process pending response
      let pendingData = [];
      if (pendingRes.status === 'fulfilled' && pendingRes.value?.data) {
        pendingData = pendingRes.value.data;
        console.log('✅ Pending loaded:', pendingData.length);
      } else {
        console.error('❌ Pending failed:', pendingRes.reason);
      }
      
      // Update state
      setConnections(connectionsData);
      setReceivedRequests(requestsData);
      setPendingConnections(pendingData);
      
      // Update debug info
      setDebugInfo({
        connectionsCount: connectionsData.length,
        requestsCount: requestsData.length,
        pendingCount: pendingData.length,
        lastFetch: new Date().toISOString(),
        apiStatus: {
          connections: connectionsRes.status,
          requests: requestsRes.status,
          pending: pendingRes.status
        },
        errors: {
          connections: connectionsRes.status === 'rejected' ? connectionsRes.reason?.message : null,
          requests: requestsRes.status === 'rejected' ? requestsRes.reason?.message : null,
          pending: pendingRes.status === 'rejected' ? pendingRes.reason?.message : null
        }
      });
      
    } catch (error) {
      console.error('💥 Error in fetchData:', error);
      setError(`Failed to load data: ${error.message}`);
    } finally {
      setIsLoading(false);
      console.log('🏁 fetchData completed');
    }
  };

  const handleRequestAction = async (requestId, status) => {
    try {
      setProcessingRequest(requestId);
      setError('');
      
      console.log(`🔄 Processing request ${requestId} with status: ${status}`);
      
      const response = await connectionAPI.reviewRequest(status, requestId);
      console.log('✅ Request action successful:', response);
      
      // Remove the processed request
      setReceivedRequests(prev => prev.filter(req => req._id !== requestId));
      
      // Refresh data if accepted
      if (status === 'accepted') {
        setTimeout(() => fetchData(), 1000);
      }
      
    } catch (error) {
      console.error('❌ Error handling request:', error);
      setError(`Failed to process request: ${error.message}`);
    } finally {
      setProcessingRequest(null);
    }
  };

  const testConnection = async () => {
    try {
      console.log('🧪 Testing API connection...');
      const response = await fetch('http://localhost:3000/health');
      const data = await response.json();
      console.log('✅ Health check response:', data);
      
      alert(`API Status: ${response.status} - ${data.status}`);
    } catch (error) {
      console.error('❌ Health check failed:', error);
      alert(`API Connection Failed: ${error.message}`);
    }
  };

  const goToLogin = () => navigate('/login');
  const goToFeed = () => navigate('/feed');

  // Always render something - this is key for debugging
  console.log('🎨 Rendering Connections component...');

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 p-4">
        <div className="max-w-4xl mx-auto">
          <LoadingSpinner message="Loading your network..." />
        </div>
      </div>
    );
  }

  // Main render - always show something
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Debug Info Panel */}
        <div className="alert alert-info mb-4">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold">🔍 Debug Information</span>
              <button 
                className="btn btn-xs btn-outline"
                onClick={() => setDebugInfo({})}
              >
                Clear
              </button>
            </div>
            <div className="text-xs space-y-1">
              <div><strong>User Status:</strong> {user ? '✅ Logged In' : '❌ Not Logged In'}</div>
              {user && (
                <>
                  <div><strong>User ID:</strong> {user._id || 'Missing'}</div>
                  <div><strong>User Email:</strong> {user.emailId || 'Missing'}</div>
                  <div><strong>User Name:</strong> {user.firstName || 'Missing'} {user.lastName || ''}</div>
                </>
              )}
              <div><strong>Connections:</strong> {connections.length}</div>
              <div><strong>Requests:</strong> {receivedRequests.length}</div>
              <div><strong>Pending:</strong> {pendingConnections.length}</div>
              <div><strong>Last Fetch:</strong> {debugInfo.lastFetch || 'Never'}</div>
              {error && <div className="text-red-500"><strong>Error:</strong> {error}</div>}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="alert alert-success mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2">
            <span className="text-sm sm:text-base">🎯 Component is rendering! Use these buttons to test:</span>
            <div className="flex flex-wrap gap-2">
              <button 
                className="btn btn-sm btn-outline"
                onClick={testConnection}
              >
                🧪 Test API
              </button>
              <button 
                className="btn btn-sm btn-outline"
                onClick={fetchData}
              >
                🔄 Refresh Data
              </button>
              <button 
                className="btn btn-sm btn-outline"
                onClick={() => console.log('Current state:', { user, connections, receivedRequests, pendingConnections })}
              >
                📊 Log State
              </button>
            </div>
          </div>
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="alert alert-error shadow-lg mb-4">
            <span role="img" aria-label="error icon">⚠️</span>
            <span className="text-sm">{error}</span>
            <button 
              className="btn btn-sm btn-outline ml-2"
              onClick={fetchData}
            >
              Retry
            </button>
          </div>
        )}
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold font-mono text-primary mb-2">
            <span role="img" aria-label="network icon">🌐</span> Your Network
          </h1>
          <p className="text-base-content/70 text-sm sm:text-lg px-2">
            Manage your connections and review pending requests
          </p>
        </div>

        {/* Network Stats */}
        <div className="stats shadow-lg mb-6 sm:mb-8 w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <span role="img" aria-label="connections icon">🔗</span>
            </div>
            <div className="stat-title text-xs sm:text-sm">Active Connections</div>
            <div className="stat-value text-lg sm:text-2xl text-primary">{connections.length}</div>
            <div className="stat-desc text-xs">Mutual connections</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-secondary">
              <span role="img" aria-label="requests icon">📨</span>
            </div>
            <div className="stat-title text-xs sm:text-sm">Pending Requests</div>
            <div className="stat-value text-lg sm:text-2xl text-secondary">{receivedRequests.length}</div>
            <div className="stat-desc text-xs">Awaiting response</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-accent">
              <span role="img" aria-label="pending icon">⏳</span>
            </div>
            <div className="stat-title text-xs sm:text-sm">Pending Mutual</div>
            <div className="stat-value text-lg sm:text-2xl text-accent">{pendingConnections.length}</div>
            <div className="stat-desc text-xs">Waiting for response</div>
          </div>
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="block sm:hidden mb-4">
          <button 
            className="btn btn-primary w-full"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <span role="img" aria-label="menu icon">📱</span>
            {showMobileMenu ? 'Hide Menu' : 'Show Menu'}
          </button>
        </div>
        
        {/* Tab Navigation - Hidden on mobile when menu is closed */}
        <div className={`tabs tabs-boxed justify-center mb-6 bg-base-100 shadow-lg ${showMobileMenu ? 'block' : 'hidden sm:flex'}`}>
          <button 
            className={`tab ${activeTab === 'connections' ? 'tab-active' : ''}`}
            onClick={() => {
              setActiveTab('connections');
              setShowMobileMenu(false);
            }}
          >
            <span role="img" aria-label="connections icon">🔗</span> 
            <span className="hidden xs:inline">My Connections</span>
            <span className="xs:hidden">Connections</span>
            ({connections.length})
          </button>
          <button 
            className={`tab ${activeTab === 'requests' ? 'tab-active' : ''}`}
            onClick={() => {
              setActiveTab('requests');
              setShowMobileMenu(false);
            }}
          >
            <span role="img" aria-label="requests icon">📨</span> 
            <span className="hidden xs:inline">Connection Requests</span>
            <span className="xs:hidden">Requests</span>
            ({receivedRequests.length})
          </button>
          <button 
            className={`tab ${activeTab === 'pending' ? 'tab-active' : ''}`}
            onClick={() => {
              setActiveTab('pending');
              setShowMobileMenu(false);
            }}
          >
            <span role="img" aria-label="pending icon">⏳</span> 
            <span className="hidden xs:inline">Pending Mutual</span>
            <span className="xs:hidden">Pending</span>
            ({pendingConnections.length})
          </button>
        </div>

        {/* Connections Tab */}
        {activeTab === 'connections' && (
          <div>
            {connections.length === 0 ? (
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center p-4 sm:p-6">
                  <div className="text-4xl sm:text-6xl mb-4">🔗</div>
                  <h2 className="card-title justify-center text-xl sm:text-2xl">No Connections Yet</h2>
                  <p className="text-base-content/70 mb-4 text-sm sm:text-base">
                    {user ? 
                      'Start connecting with other developers to build your professional network!' :
                      'Please log in to view your connections.'
                    }
                  </p>
                  <div className="card-actions justify-center">
                    {user ? (
                      <button 
                        className="btn btn-primary btn-sm sm:btn-md"
                        onClick={goToFeed}
                      >
                        <span role="img" aria-label="feed icon">📰</span> 
                        <span className="hidden sm:inline">Explore Feed</span>
                        <span className="sm:hidden">Feed</span>
                      </button>
                    ) : (
                      <button 
                        className="btn btn-primary btn-sm sm:btn-md"
                        onClick={goToLogin}
                      >
                        <span role="img" aria-label="login icon">🔐</span> 
                        <span className="hidden sm:inline">Login</span>
                        <span className="sm:hidden">Login</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {connections.map((connection, index) => (
                  <div key={connection._id || index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="card-body p-4 sm:p-6">
                      <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
                        <div className="avatar">
                          <div className="w-12 sm:w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img 
                              src={connection.photoUrl || 'https://via.placeholder.com/150'} 
                              alt={`${connection.firstName || 'User'} ${connection.lastName || ''}`}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/150';
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base sm:text-lg truncate">
                            {connection.firstName || 'Unknown'} {connection.lastName || ''}
                          </h3>
                          <p className="text-xs sm:text-sm text-base-content/60 truncate">
                            {connection.emailId || 'No email'}
                          </p>
                          {connection.age && (
                            <p className="text-xs text-base-content/50">
                              {connection.age} years old
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {connection.about && (
                        <p className="text-xs sm:text-sm text-base-content/70 mb-4 line-clamp-2">
                          {connection.about}
                        </p>
                      )}
                      
                      {connection.skills && connection.skills.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {connection.skills.slice(0, 3).map((skill, skillIndex) => (
                              <span key={skillIndex} className="badge badge-primary badge-outline badge-xs">
                                {skill}
                              </span>
                            ))}
                            {connection.skills.length > 3 && (
                              <span className="badge badge-outline badge-xs">
                                +{connection.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="card-actions justify-center">
                        <button className="btn btn-outline btn-xs sm:btn-sm">
                          <span role="img" aria-label="message icon">💬</span> 
                          <span className="hidden sm:inline">Message</span>
                          <span className="sm:hidden">Msg</span>
                        </button>
                        <button className="btn btn-outline btn-xs sm:btn-sm">
                          <span role="img" aria-label="profile icon">👤</span> 
                          <span className="hidden sm:inline">View Profile</span>
                          <span className="sm:hidden">Profile</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div>
            {receivedRequests.length === 0 ? (
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center p-4 sm:p-6">
                  <div className="text-4xl sm:text-6xl mb-4">📭</div>
                  <h2 className="card-title justify-center text-xl sm:text-2xl">No Pending Requests</h2>
                  <p className="text-base-content/70 mb-4 text-sm sm:text-base">
                    You don't have any pending connection requests at the moment.
                    Keep networking to receive more requests!
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                {receivedRequests.map((request, index) => (
                  <div key={request._id || index} className="card bg-base-100 shadow-xl">
                    <div className="card-body p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                          <div className="avatar">
                            <div className="w-12 sm:w-16 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                              <img 
                                src={request.fromUserId?.photoUrl || 'https://via.placeholder.com/150'} 
                                alt="Request from"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/150';
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base sm:text-lg truncate">
                              {request.fromUserId?.firstName || 'Unknown'} {request.fromUserId?.lastName || ''}
                            </h3>
                            <p className="text-xs sm:text-sm text-base-content/60 truncate">
                              {request.fromUserId?.emailId || 'No email'}
                            </p>
                            <p className="text-xs sm:text-sm text-base-content/70 mt-1">
                              <span role="img" aria-label="handshake icon">🤝</span>
                              Wants to connect with you
                            </p>
                            <p className="text-xs text-base-content/50 mt-1">
                              Requested {new Date(request.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 w-full sm:w-auto">
                          <button 
                            className={`btn btn-success btn-sm flex-1 sm:flex-none ${
                              processingRequest === request._id ? 'loading' : ''
                            }`}
                            onClick={() => handleRequestAction(request._id, 'accepted')}
                            disabled={processingRequest === request._id}
                          >
                            <span role="img" aria-label="accept icon">✅</span> 
                            <span className="hidden sm:inline">
                              {processingRequest === request._id ? 'Processing...' : 'Accept'}
                            </span>
                            <span className="sm:hidden">
                              {processingRequest === request._id ? '...' : 'Accept'}
                            </span>
                          </button>
                          <button 
                            className={`btn btn-error btn-sm flex-1 sm:flex-none ${
                              processingRequest === request._id ? 'loading' : ''
                            }`}
                            onClick={() => handleRequestAction(request._id, 'rejected')}
                            disabled={processingRequest === request._id}
                          >
                            <span role="img" aria-label="reject icon">❌</span> 
                            <span className="hidden sm:inline">
                              {processingRequest === request._id ? 'Processing...' : 'Reject'}
                            </span>
                            <span className="sm:hidden">
                              {processingRequest === request._id ? '...' : 'Reject'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pending Mutual Connections Tab */}
        {activeTab === 'pending' && (
          <div>
            {pendingConnections.length === 0 ? (
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center p-4 sm:p-6">
                  <div className="text-4xl sm:text-6xl mb-4">⏳</div>
                  <h2 className="card-title justify-center text-xl sm:text-2xl">No Pending Mutual Connections</h2>
                  <p className="text-base-content/70 mb-4 text-sm sm:text-base">
                    You don't have any pending mutual connections at the moment.
                    These appear when you accept a connection request and are waiting for the other person to respond.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                {pendingConnections.map((connection, index) => (
                  <div key={connection._id || index} className="card bg-base-100 shadow-xl">
                    <div className="card-body p-4 sm:p-6">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="avatar">
                          <div className="w-12 sm:w-16 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                            <img 
                              src={connection.toUserId?.photoUrl || 'https://via.placeholder.com/150'} 
                              alt="Pending connection"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/150';
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base sm:text-lg truncate">
                            {connection.toUserId?.firstName || 'Unknown'} {connection.toUserId?.lastName || ''}
                          </h3>
                          <p className="text-xs sm:text-sm text-base-content/60 truncate">
                            {connection.toUserId?.emailId || 'No email'}
                          </p>
                          <p className="text-xs sm:text-sm text-accent mt-1">
                            <span role="img" aria-label="pending icon">⏳</span>
                            Waiting for their response to your connection request
                          </p>
                          <p className="text-xs text-base-content/50 mt-1">
                            You accepted on {new Date(connection.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
