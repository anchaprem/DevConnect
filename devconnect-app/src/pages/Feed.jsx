import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userAPI, connectionAPI } from '../services/api';
import LoadingSpinner from '../Components/common/LoadingSpinner';

const Feed = () => {
  const user = useSelector((store) => store.user);
  const [feedData, setFeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pendingRequests, setPendingRequests] = useState(new Set());

  useEffect(() => {
    fetchFeedData();
  }, []);

  const fetchFeedData = async (page = 1, append = false) => {
    try {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      const res = await userAPI.getFeed(page, 10);
      const newUsers = res.data || [];
      
      if (append) {
        setFeedData(prev => [...prev, ...newUsers]);
      } else {
        setFeedData(newUsers);
      }
      
      setHasMore(newUsers.length === 10);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching feed:', error);
      setError('Failed to load feed data');
    } finally {
      setIsLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchFeedData(currentPage + 1, true);
    }
  };

  const handleConnectionRequest = async (userId, status) => {
    try {
      setPendingRequests(prev => new Set(prev).add(userId));
      
      await connectionAPI.sendRequest(status, userId);
      
      // Remove user from feed after sending request
      setFeedData(prev => prev.filter(u => u._id !== userId));
      
      // Show success message
      const action = status === 'interested' ? 'Connection request sent' : 'User ignored';
      console.log(`${action} to ${userId}`);
      
    } catch (error) {
      console.error('Error sending connection request:', error);
      // Show error message
      const action = status === 'interested' ? 'Failed to send connection request' : 'Failed to ignore user';
      console.error(`${action}:`, error.response?.data || error.message);
    } finally {
      setPendingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const getTechStackPreview = (skills) => {
    if (!skills || skills.length === 0) return 'No skills listed';
    return skills.slice(0, 3).join(', ') + (skills.length > 3 ? '...' : '');
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading developer feed..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="alert alert-error shadow-lg">
            <span role="img" aria-label="error icon">⚠️</span>
            <span>{error}</span>
            <button 
              className="btn btn-sm btn-outline ml-2"
              onClick={() => fetchFeedData()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-mono text-primary mb-2">
            <span role="img" aria-label="developers icon">👥</span> Developer Network
          </h1>
          <p className="text-base-content/70 text-lg">
            Discover and connect with amazing developers from around the world
          </p>
        </div>

        {/* Stats */}
        <div className="stats shadow-lg mb-8 w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <span role="img" aria-label="users icon">👤</span>
            </div>
            <div className="stat-title">Developers Found</div>
            <div className="stat-value text-primary">{feedData.length}</div>
            <div className="stat-desc">Available for connections</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-secondary">
              <span role="img" aria-label="connections icon">🔗</span>
            </div>
            <div className="stat-title">Your Network</div>
            <div className="stat-value text-secondary">0</div>
            <div className="stat-desc">Active connections</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-accent">
              <span role="img" aria-label="requests icon">📨</span>
            </div>
            <div className="stat-title">Pending Requests</div>
            <div className="stat-value text-accent">0</div>
            <div className="stat-desc">Awaiting response</div>
          </div>
        </div>

        {/* Feed Content */}
        {feedData.length === 0 ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="card-title justify-center text-2xl">No More Developers!</h2>
              <p className="text-base-content/70 mb-4">
                You've seen all available developers in your network. 
                Check back later for new connections or expand your search criteria.
              </p>
              <div className="card-actions justify-center">
                <button 
                  className="btn btn-primary"
                  onClick={() => fetchFeedData()}
                >
                  <span role="img" aria-label="refresh icon">🔄</span> Refresh Feed
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Developer Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {feedData.map((developer) => (
                <div key={developer._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="card-body">
                    {/* Profile Header */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={developer.photoUrl} alt={`${developer.firstName} ${developer.lastName}`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">
                          {developer.firstName} {developer.lastName}
                        </h3>
                        <p className="text-sm text-base-content/60">
                          {developer.age && `${developer.age} years old`}
                          {developer.gender && ` • ${developer.gender}`}
                        </p>
                      </div>
                    </div>
                    
                    {/* About Section */}
                    {developer.about && (
                      <div className="mb-4">
                        <p className="text-base-content/80 text-sm leading-relaxed">
                          {developer.about.length > 120 
                            ? `${developer.about.substring(0, 120)}...` 
                            : developer.about
                          }
                        </p>
                      </div>
                    )}
                    
                    {/* Skills Section */}
                    {developer.skills && developer.skills.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm mb-2 text-primary">
                          <span role="img" aria-label="skills icon">⚡</span> Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {developer.skills.slice(0, 4).map((skill, index) => (
                            <span key={index} className="badge badge-outline badge-sm">
                              {skill}
                            </span>
                          ))}
                          {developer.skills.length > 4 && (
                            <span className="badge badge-outline badge-sm">
                              +{developer.skills.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="card-actions justify-between mt-4">
                      <button
                        className={`btn btn-primary btn-sm flex-1 ${
                          pendingRequests.has(developer._id) ? 'loading' : ''
                        }`}
                        onClick={() => handleConnectionRequest(developer._id, 'interested')}
                        disabled={pendingRequests.has(developer._id)}
                      >
                        <span role="img" aria-label="connect icon">🤝</span>
                        {pendingRequests.has(developer._id) ? 'Sending...' : 'Connect'}
                      </button>
                      
                      <button
                        className="btn btn-outline btn-sm flex-1"
                        onClick={() => handleConnectionRequest(developer._id, 'ignored')}
                        disabled={pendingRequests.has(developer._id)}
                      >
                        <span role="img" aria-label="ignore icon">❌</span>
                        Ignore
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  className={`btn btn-outline btn-lg ${loadingMore ? 'loading' : ''}`}
                  onClick={loadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? 'Loading...' : 'Load More Developers'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;
