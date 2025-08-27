import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-6">
      <div className="card bg-base-100 shadow-2xl max-w-2xl">
        <div className="card-body text-center">
          {/* 404 Icon */}
          <div className="text-8xl mb-6 animate-bounce">
            🔍
          </div>
          
          {/* Error Code */}
          <h1 className="text-9xl font-bold font-mono text-error mb-4 tracking-wider">
            4<span className="text-warning">0</span>4
          </h1>
          
          {/* Title */}
          <h2 className="text-3xl font-bold font-mono text-primary mb-4">
            Page Not Found
          </h2>
          
          {/* Message */}
          <p className="text-lg text-base-content/70 mb-6">
            Oops! The page you're looking for doesn't exist in our developer network.
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          {/* Developer Joke */}
          <div className="alert alert-info mb-6">
            <span role="img" aria-label="joke icon">😄</span>
            <span className="font-mono text-sm">
              <strong>Developer Joke:</strong> Why do programmers prefer dark mode? 
              Because light attracts bugs! 🐛
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="card-actions justify-center gap-4">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/feed')}
            >
              <span role="img" aria-label="home icon">🏠</span> Go to Feed
            </button>
            
            <button 
              className="btn btn-secondary btn-lg"
              onClick={() => navigate('/connections')}
            >
              <span role="img" aria-label="connections icon">🔗</span> View Connections
            </button>
            
            <button 
              className="btn btn-outline btn-lg"
              onClick={() => window.history.back()}
            >
              <span role="img" aria-label="back icon">⬅️</span> Go Back
            </button>
          </div>
          
          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-base-300">
            <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => navigate('/profile')}
              >
                👤 Profile
              </button>
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => navigate('/feed')}
              >
                📰 Feed
              </button>
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => navigate('/connections')}
              >
                🔗 Connections
              </button>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-base-300">
            <p className="text-sm text-base-content/50 font-mono">
              Can't find what you're looking for? Try searching or contact support
            </p>
            <p className="text-xs text-base-content/40 mt-2">
              DevConnect - Where Developers Connect 👽🔗
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
