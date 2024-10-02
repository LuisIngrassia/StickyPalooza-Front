import React, { useState, useEffect } from 'react';
import api from '../../api/Api.js';

const ProfileForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    profilePic: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        profilePic: null, // Reset the image input
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePic: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update user data
      await api.put('/user/profile', {
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
      });

      // If a new profile picture is provided, upload it
      if (formData.profilePic) {
        const imageData = new FormData();
        imageData.append('profilePic', formData.profilePic);
        await api.post('/user/profile/picture', imageData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      onSave(); // Call to refresh user data in parent component
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Bio:</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Profile Picture:</label>
        <input type="file" name="profilePic" onChange={handleFileChange} />
      </div>
      <button type="submit" style={{ marginTop: '10px', padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
        Update Profile
      </button>
    </form>
  );
};

export default ProfileForm;
