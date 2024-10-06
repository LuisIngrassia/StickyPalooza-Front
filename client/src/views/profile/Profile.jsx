import React, { useState } from 'react';
import { useProfileLogic } from '../../components/profile/ProfileLogic.jsx';
import ProfileForm from '../../components/profile/ProfileForm.jsx';

const Profile = () => {
  const { user, fetchUserProfile } = useProfileLogic();
  const placeholderImage = "https://via.placeholder.com/150"; // Placeholder image URL
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    fetchUserProfile(); // Refresh user profile after saving
    setEditing(false); // Exit editing mode
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <img
            src={user.profilePic || placeholderImage}
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
