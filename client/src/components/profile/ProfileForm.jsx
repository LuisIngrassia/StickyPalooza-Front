import React, { useState, useEffect } from 'react';
import { useProfileLogic } from './ProfileLogic.jsx';

const ProfileForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    profilePic: null,
  });
  const { updateUserProfile } = useProfileLogic();

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
    await updateUserProfile(formData, formData.profilePic, onSave);
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
