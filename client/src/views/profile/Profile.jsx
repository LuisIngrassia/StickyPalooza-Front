import React, { useState } from 'react';
import { useProfileLogic } from '../../components/profile/ProfileLogic';

const Profile = () => {
  const {
    user,
    loading,
    error,
    editing,
    setEditing,
    updateUserProfile,
  } = useProfileLogic();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setEditing(false); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>User Profile</h1>
      {user ? (
        <div>
          {!editing ? (
            <>
              <p><strong>First Name:</strong> {user.firstName}</p>
              <p><strong>Last Name:</strong> {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button onClick={() => setEditing(true)} style={{ margin: '20px', padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <div>
                <label>First Name:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div>
                <label>Last Name:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
              <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <button type="submit" style={{ marginTop: '10px', padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
                Save Profile
              </button>
            </form>
          )}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;
