import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { profileAPI } from '../services/api';
import { addUser } from '../store/slices/userSlice';
import LoadingSpinner from '../Components/common/LoadingSpinner';

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    about: '',
    skills: [],
    photoUrl: ''
  });

  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        age: user.age || '',
        gender: user.gender || '',
        about: user.about || '',
        skills: user.skills || [],
        photoUrl: user.photoUrl || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillAdd = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const updateData = { ...formData };
      if (updateData.age) updateData.age = parseInt(updateData.age);
      
      await profileAPI.edit(updateData);
      
      // Update local state
      const updatedUser = { ...user, ...updateData };
      dispatch(addUser(updatedUser));
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      setError(error.response?.data || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      age: user.age || '',
      gender: user.gender || '',
      about: user.about || '',
      skills: user.skills || [],
      photoUrl: user.photoUrl || ''
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-base-100 p-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-base-content/70">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-mono text-primary mb-2">
            <span role="img" aria-label="developer icon">👨‍💻</span> Developer Profile
          </h1>
          <p className="text-base-content/70">Showcase your skills and connect with the community</p>
        </div>

        {error && (
          <div className="alert alert-error mb-6">
            <span role="img" aria-label="error icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success mb-6">
            <span role="img" aria-label="success icon">✅</span>
            <span>{success}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="avatar mb-4">
                  <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={formData.photoUrl} alt="Profile" />
                  </div>
                </div>
                
                {isEditing && (
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-semibold">Profile Picture URL</span>
                    </label>
                    <input
                      type="url"
                      name="photoUrl"
                      className="input input-bordered w-full"
                      value={formData.photoUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                )}

                <h2 className="text-2xl font-bold mb-2">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-base-content/70 mb-4">{user.emailId}</p>
                
                {!isEditing && (
                  <button 
                    className="btn btn-primary w-full"
                    onClick={() => setIsEditing(true)}
                  >
                    <span role="img" aria-label="edit icon">✏️</span> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-6">
                  <span role="img" aria-label="details icon">📋</span> Profile Details
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">First Name</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className={`input input-bordered w-full ${isEditing ? '' : 'bg-base-200'}`}
                        value={formData.firstName}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Last Name</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className={`input input-bordered w-full ${isEditing ? '' : 'bg-base-200'}`}
                        value={formData.lastName}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Age</span>
                      </label>
                      <input
                        type="number"
                        name="age"
                        min="18"
                        className={`input input-bordered w-full ${isEditing ? '' : 'bg-base-200'}`}
                        value={formData.age}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Gender</span>
                      </label>
                      <select
                        name="gender"
                        className={`select select-bordered w-full ${isEditing ? '' : 'bg-base-200'}`}
                        value={formData.gender}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                      </select>
                    </div>
                  </div>

                  {/* About Section */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">About Me</span>
                    </label>
                    <textarea
                      name="about"
                      className={`textarea textarea-bordered h-24 ${isEditing ? '' : 'bg-base-200'}`}
                      value={formData.about}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      placeholder="Tell us about yourself, your interests, and what you're working on..."
                    />
                  </div>

                  {/* Skills Section */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Skills & Technologies</span>
                    </label>
                    
                    {isEditing && (
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          className="input input-bordered flex-1"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill (e.g., React, Node.js, Python)"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleSkillAdd())}
                        />
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleSkillAdd}
                        >
                          Add
                        </button>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <div key={index} className="badge badge-primary badge-lg gap-2">
                          {skill}
                          {isEditing && (
                            <button
                              type="button"
                              className="btn btn-ghost btn-xs"
                              onClick={() => handleSkillRemove(skill)}
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      {formData.skills.length === 0 && (
                        <p className="text-base-content/50 italic">No skills added yet</p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {isEditing && (
                    <div className="flex gap-3 justify-end">
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
