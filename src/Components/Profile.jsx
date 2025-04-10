import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaCamera,
  FaLock,
  FaSignOutAlt,
  FaTrash,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: null, // URL for profile picture
    joinedDate: 'January 2024'
  });

  const [formData, setFormData] = useState({ ...profile });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Account deleted successfully');
      // Redirect to login or home page
    } catch (error) {
      alert('Error deleting account');
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleSignOut = async () => {
    try {
      // Add your sign out logic here
      alert('Signed out successfully');
      // Redirect to login page
    } catch (error) {
      alert('Error signing out');
    }
  };

  const ProfileField = ({ label, value, icon: Icon, editable = true }) => (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
      <Icon className="text-gray-400 text-xl" />
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        {isEditing && editable ? (
          <input
            type="text"
            name={label.toLowerCase()}
            value={formData[label.toLowerCase()]}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border border-gray-200 rounded-md focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />
        ) : (
          <p className="font-medium text-gray-800">{value}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="pt-20 px-4 md:px-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-32 bg-gradient-to-r from-purple-600 to-blue-500">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-4xl text-gray-400" />
                  )}
                </div>
                {isEditing && (
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-purple-500 text-white p-2 rounded-full cursor-pointer hover:bg-purple-600 transition-colors duration-200"
                  >
                    <FaCamera />
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-purple-50 transition-colors duration-200"
              >
                <FaEdit />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <ProfileField
                label="Name"
                value={profile.name}
                icon={FaUser}
              />
              <ProfileField
                label="Email"
                value={profile.email}
                icon={FaEnvelope}
              />
              <ProfileField
                label="Phone"
                value={profile.phone}
                icon={FaPhone}
              />
              <ProfileField
                label="Joined"
                value={profile.joinedDate}
                icon={FaUser}
                editable={false}
              />

              {isEditing && (
                <div className="flex justify-end pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 bg-purple-600 text-white rounded-lg font-medium 
                      ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-700'} 
                      transition-colors duration-200 flex items-center gap-2`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        <span>Save Changes</span>
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </form>

            {/* Account Actions */}
            <div className="mt-12 border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Actions</h3>
              <div className="space-y-4">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <FaSignOutAlt className="text-gray-500" />
                    <span className="font-medium text-gray-700">Sign Out</span>
                  </div>
                
                </button>

                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <FaTrash className="text-red-500" />
                    <span className="font-medium text-red-700">Delete Account</span>
                  </div>
               
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Account Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Delete Account</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 disabled:opacity-70"
                >
                  {loading ? 'Deleting...' : 'Delete Account'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;