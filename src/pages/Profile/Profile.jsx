// src/components/Profile/Profile.jsx
import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaUserTag, FaCalendarAlt, FaEdit, FaSave, FaTimes, FaCamera, FaPhone, FaMapMarker, FaBuilding, FaGlobe } from 'react-icons/fa';
import { authService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    phone: '',
    location: '',
    company: '',
    website: '',
    bio: ''
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load user data from localStorage
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setFormData({
          fullName: userData.fullName || '',
          email: userData.email || '',
          role: userData.role || 'user',
          phone: userData.phone || '',
          location: userData.location || '',
          company: userData.company || '',
          website: userData.website || '',
          bio: userData.bio || ''
        });
        setAvatarPreview(userData.avatar || null);
      } else {
        // Redirect to login if no user data
        navigate('/login');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'superAdmin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'admin': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'user': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get role display name
  const getRoleDisplay = (role) => {
    switch(role) {
      case 'superAdmin': return 'Super Administrator';
      case 'admin': return 'Administrator';
      case 'user': return 'User';
      default: return role || 'User';
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setAvatar(file);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Validate form
      if (!formData.fullName.trim()) {
        setError('Full name is required');
        setLoading(false);
        return;
      }

      // Prepare updated user data
      const updatedUser = {
        ...user,
        ...formData,
        avatar: avatarPreview || user?.avatar || null
      };

      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Optional: Update token if you store user data in token
      const token = localStorage.getItem('token');
      if (token) {
        // You might want to call an API to update user data here
        // await authService.updateProfile(updatedUser);
      }

      // Update state
      setUser(updatedUser);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        role: user.role || 'user',
        phone: user.phone || '',
        location: user.location || '',
        company: user.company || '',
        website: user.website || '',
        bio: user.bio || ''
      });
      setAvatarPreview(user.avatar || null);
    }
    setIsEditing(false);
    setError('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">No user data found</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      {/* Error and Success Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
          <FaTimes className="text-red-500" />
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2">
          <FaSave className="text-green-500" />
          {success}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-12 relative">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt={formData.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500 text-3xl font-bold">
                    {formData.fullName?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition-colors shadow-lg">
                  <FaCamera className="h-4 w-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* User Info */}
            <div className="text-center md:text-left text-white flex-1">
              <h2 className="text-2xl font-bold">{formData.fullName}</h2>
              <div className="flex flex-wrap items-center gap-3 mt-1 justify-center md:justify-start">
                <span className="flex items-center gap-1 text-white/80 text-sm">
                  <FaEnvelope className="h-3 w-3" />
                  {formData.email}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeColor(formData.role)}`}>
                  {getRoleDisplay(formData.role)}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <div className="ml-auto">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  <FaEdit className="h-4 w-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <FaTimes className="h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    <FaSave className="h-4 w-4" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaUser className="inline mr-2 h-4 w-4" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="text-gray-900 py-2">{formData.fullName || 'Not provided'}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaEnvelope className="inline mr-2 h-4 w-4" />
                Email Address
              </label>
              <p className="text-gray-900 py-2">{formData.email}</p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaPhone className="inline mr-2 h-4 w-4" />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              ) : (
                <p className="text-gray-900 py-2">{formData.phone || 'Not provided'}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaUserTag className="inline mr-2 h-4 w-4" />
                Role
              </label>
              <div className="py-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getRoleBadgeColor(formData.role)}`}>
                  {getRoleDisplay(formData.role)}
                </span>
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaBuilding className="inline mr-2 h-4 w-4" />
                Company
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your company name"
                />
              ) : (
                <p className="text-gray-900 py-2">{formData.company || 'Not provided'}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaMapMarker className="inline mr-2 h-4 w-4" />
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your location"
                />
              ) : (
                <p className="text-gray-900 py-2">{formData.location || 'Not provided'}</p>
              )}
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaGlobe className="inline mr-2 h-4 w-4" />
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your website URL"
                />
              ) : (
                <p className="text-gray-900 py-2">
                  {formData.website ? (
                    <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {formData.website}
                    </a>
                  ) : 'Not provided'}
                </p>
              )}
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell us about yourself"
                />
              ) : (
                <p className="text-gray-900 py-2">{formData.bio || 'No bio provided'}</p>
              )}
            </div>

            {/* Member Since */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaCalendarAlt className="inline mr-2 h-4 w-4" />
                Member Since
              </label>
              <p className="text-gray-900 py-2">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Not available'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/change-password')}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Change Password
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Account Settings
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to logout?')) {
                authService.signout();
                navigate('/login');
              }
            }}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;