import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const getErrorMessage = () => {
    if (error?.status === 404) {
      return "The page you're looking for doesn't exist in our developer network.";
    }
    if (error?.status === 401) {
      return "You need to be authenticated to access this resource.";
    }
    if (error?.status === 403) {
      return "You don't have permission to access this resource.";
    }
    if (error?.status >= 500) {
      return "Our servers are experiencing some issues. Please try again later.";
    }
    return "Something unexpected happened. Please try again.";
  };

  const getErrorIcon = () => {
    if (error?.status === 404) return "🔍";
    if (error?.status === 401) return "🔒";
    if (error?.status === 403) return "🚫";
    if (error?.status >= 500) return "⚡";
    return "💥";
  };

  const getErrorTitle = () => {
    if (error?.status === 404) return "Page Not Found";
    if (error?.status === 401) return "Unauthorized Access";
    if (error?.status === 403) return "Access Forbidden";
    if (error?.status >= 500) return "Server Error";
    return "Unexpected Error";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-6">
      <div className="card bg-base-100 shadow-2xl max-w-2xl">
        <div className="card-body text-center">
          {/* Error Icon */}
          <div className="text-8xl mb-6 animate-bounce">
            {getErrorIcon()}
          </div>
          
          {/* Error Title */}
          <h1 className="text-4xl font-bold font-mono text-error mb-4">
            {getErrorTitle()}
          </h1>
          
          {/* Error Message */}
          <p className="text-lg text-base-content/70 mb-6">
            {getErrorMessage()}
          </p>
          
          {/* Error Details */}
          {error?.status && (
            <div className="alert alert-info mb-6">
              <span role="img" aria-label="info icon">ℹ️</span>
              <span>
                <strong>Error Code:</strong> {error.status} - {error.statusText || 'Unknown Error'}
              </span>
            </div>
          )}
          
          {/* Debug Info (only in development) */}
          {process.env.NODE_ENV === 'development' && error?.message && (
            <details className="collapse collapse-arrow bg-base-200 mb-6">
              <summary className="collapse-title font-medium">
                Debug Information (Development Only)
              </summary>
              <div className="collapse-content text-left">
                <pre className="text-xs bg-base-300 p-3 rounded-lg overflow-x-auto">
                  {error.message}
                </pre>
              </div>
            </details>
          )}
          
          {/* Action Buttons */}
          <div className="card-actions justify-center gap-4">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/feed')}
            >
              <span role="img" aria-label="home icon">🏠</span> Go to Feed
            </button>
            
            <button 
              className="btn btn-outline btn-lg"
              onClick={() => window.history.back()}
            >
              <span role="img" aria-label="back icon">⬅️</span> Go Back
            </button>
            
            <button 
              className="btn btn-ghost btn-lg"
              onClick={() => window.location.reload()}
            >
              <span role="img" aria-label="refresh icon">🔄</span> Refresh
            </button>
          </div>
          
          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-base-300">
            <p className="text-sm text-base-content/50 font-mono">
              If this problem persists, please contact our support team
            </p>
            <p className="text-xs text-base-content/40 mt-2">
              DevConnect - Connecting Developers Worldwide 👽🔗
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
