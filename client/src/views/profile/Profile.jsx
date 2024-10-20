import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useProfileLogic } from '../../components/profile/ProfileLogic';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Footer from "../../components/general/Footer";

const Profile = () => {
  const {
    user,
    loading,
    error,
    editing,
    setEditing,
    updateUserProfile,
  } = useProfileLogic();

  // Set initial form data
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    password: '', // Optional: Only include if user wants to update password
  });

  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedData = { ...formData };
    if (!formData.password) {
      delete updatedData.password; 
    }
  
    updateUserProfile(updatedData); 
    setEditing(false); 
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: '', 
    }); 
  };

  if (loading) return <div className="text-center text-green-300 py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-4">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <button
        className="absolute top-4 left-4 flex items-center text-green-400 hover:text-green-300 transition"
        onClick={() => navigate('/')}
      >
        <ArrowLeftIcon className="h-6 w-6 mr-2" />
        Back to Home
      </button>
      <div className="max-w-3xl mx-auto flex-grow p-6 relative">
        <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">User Profile</h1>

        {user ? (
          <div className=" bg-gray-800 p-8 rounded-lg shadow-lg w-30 mx-auto"> 
            {!editing ? (
              <>
                <div className="mb-4">
                  <p className="text-lg text-green-300">
                    <strong className="font-semibold text-green-400">First Name:</strong> {user.firstName}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-lg text-green-300">
                    <strong className="font-semibold text-green-400">Last Name:</strong> {user.lastName}
                  </p>
                </div>
                <div className="mb-6">
                  <p className="text-lg text-green-300">
                    <strong className="font-semibold text-green-400">Email:</strong> {user.email}
                  </p>
                </div>
                <button
                  onClick={() => setEditing(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-lg text-green-300 font-semibold mb-2">First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-md bg-gray-700 text-green-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-lg text-green-300 font-semibold mb-2">Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-md bg-gray-700 text-green-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-lg text-green-300 font-semibold mb-2">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-md bg-gray-700 text-green-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                {/* Optional Password Field */}
                <div>
                  <label className="block text-lg text-green-300 font-semibold mb-2">New Password (Optional):</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                    className="w-full p-3 border border-gray-700 rounded-md bg-gray-700 text-green-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                  >
                    Save Profile
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <p className="text-center text-green-300">No user data available</p>
        )}
      </div>

      {/* Footer at the bottom and centered */}
      <footer className="bg-gray-900">
        <div className="flex justify-center items-center p-4">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default Profile;
