import React, { useState, useEffect } from 'react';
import api from '../../api/Api.js';
import ProfileForm from './ProfileForm.jsx';

const Profile = () => {
  const [user, setUser] = useState(null);
  const placeholderImage = "https://via.placeholder.com/150"; // Placeholder image URL
  const [editing, setEditing] = useState(false); // State to toggle edit mode

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/user/profile'); // Adjust endpoint if needed
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleSave = () => {
    fetchUserProfile(); // Refresh user profile after saving
    setEditing(false); // Exit editing mode
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <img
            src={user.profilePic || placeholderImage} // Use placeholder if no profile pic
            alt="Profile"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setEditing(true)} style={{ margin: '20px', padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
            Edit Profile
          </button>
          {editing && (
            <ProfileForm user={user} onSave={handleSave} />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
 