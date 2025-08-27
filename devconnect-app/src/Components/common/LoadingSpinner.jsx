import React from 'react';

const LoadingSpinner = ({ message = "Loading...", size = "lg" }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-100 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-6 animate-bounce">
          <div className="text-6xl font-mono font-bold">
            <span className="text-primary">Dev</span>
            <span className="text-secondary">Connect</span>
            <span className="text-accent ml-2">👽</span>
          </div>
        </div>
        
        {/* Loading Animation */}
        <div className="relative mb-6">
          <div className={`loading loading-spinner loading-${size} text-primary`}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-secondary rounded-full animate-ping"></div>
          </div>
        </div>
        
        {/* Loading Message */}
        <div className="space-y-2">
          <p className="text-lg font-semibold text-base-content/80">{message}</p>
          <p className="text-sm text-base-content/60 font-mono">
            Connecting to the developer network...
          </p>
        </div>
        
        {/* Animated Dots */}
        <div className="flex justify-center gap-1 mt-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
