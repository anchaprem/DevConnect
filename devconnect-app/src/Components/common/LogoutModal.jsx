import React from 'react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-base-300">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">👋</div>
          <h3 className="font-bold text-xl font-mono text-primary">
            Leaving So Soon?
          </h3>
        </div>
        
        {/* Content */}
        <div className="text-center mb-6">
          <p className="text-base-content/80 mb-3">
            Are you sure you want to disconnect from the developer network?
          </p>
          <p className="text-sm text-base-content/60 font-mono">
            You'll need to log in again to access your connections and profile.
          </p>
        </div>
        
        {/* Stats Preview */}
        <div className="stats stats-horizontal shadow mb-6">
          <div className="stat">
            <div className="stat-figure text-primary">
              <span role="img" aria-label="connections icon">🔗</span>
            </div>
            <div className="stat-title text-xs">Connections</div>
            <div className="stat-value text-primary text-lg">0</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-secondary">
              <span role="img" aria-label="requests icon">📨</span>
            </div>
            <div className="stat-title text-xs">Requests</div>
            <div className="stat-value text-secondary text-lg">0</div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="modal-action gap-3">
          <button 
            className="btn btn-outline btn-lg hover:bg-base-200 transition-colors duration-200" 
            onClick={onClose}
          >
            <span role="img" aria-label="cancel icon">❌</span> Stay Connected
          </button>
          <button 
            className="btn btn-error btn-lg hover:scale-105 transition-transform duration-200" 
            onClick={onConfirm}
          >
            <span role="img" aria-label="logout icon">🚪</span> Sign Out
          </button>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-xs text-base-content/50 font-mono">
            Thanks for being part of DevConnect! 👽🔗
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
