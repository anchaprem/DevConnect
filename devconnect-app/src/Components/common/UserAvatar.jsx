import React from 'react';

const UserAvatar = ({ user, onProfileClick, onLogoutClick }) => {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:scale-110 transition-transform duration-200">
        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            alt={`${user.firstName} ${user.lastName}`}
            src={user.photoUrl}
            className="object-cover"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-64 p-3 shadow-xl border border-base-300"
      >
        {/* User Info Header */}
        <li className="menu-title mb-2">
          <div className="flex items-center gap-3 p-2 bg-base-200 rounded-lg">
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoUrl} alt={`${user.firstName} ${user.lastName}`} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">{user.firstName} {user.lastName}</h3>
              <p className="text-xs text-base-content/60">{user.emailId}</p>
              {user.skills && user.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.skills.slice(0, 2).map((skill, index) => (
                    <span key={index} className="badge badge-primary badge-xs">
                      {skill}
                    </span>
                  ))}
                  {user.skills.length > 2 && (
                    <span className="badge badge-outline badge-xs">
                      +{user.skills.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </li>
        
        <div className="divider my-2"></div>
        
        {/* Menu Items */}
        <li>
          <a 
            className="justify-between cursor-pointer hover:bg-primary hover:text-primary-content transition-colors duration-200" 
            onClick={onProfileClick}
          >
            <span className="flex items-center gap-2">
              <span role="img" aria-label="profile icon">👤</span>
              View Profile
            </span>
            <span role="img" aria-label="arrow icon">→</span>
          </a>
        </li>
        
        <li>
          <a className="justify-between cursor-pointer hover:bg-secondary hover:text-secondary-content transition-colors duration-200">
            <span className="flex items-center gap-2">
              <span role="img" aria-label="settings icon">⚙️</span>
              Settings
            </span>
            <span role="img" aria-label="arrow icon">→</span>
          </a>
        </li>
        
        <li>
          <a className="justify-between cursor-pointer hover:bg-accent hover:text-accent-content transition-colors duration-200">
            <span className="flex items-center gap-2">
              <span role="img" aria-label="help icon">❓</span>
              Help & Support
            </span>
            <span role="img" aria-label="arrow icon">→</span>
          </a>
        </li>
        
        <div className="divider my-2"></div>
        
        <li>
          <a 
            className="cursor-pointer hover:bg-error hover:text-error-content transition-colors duration-200" 
            onClick={onLogoutClick}
          >
            <span className="flex items-center gap-2">
              <span role="img" aria-label="logout icon">🚪</span>
              Sign Out
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserAvatar;
