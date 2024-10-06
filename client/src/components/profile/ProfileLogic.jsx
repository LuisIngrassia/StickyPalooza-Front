import { useState, useEffect } from 'react';
import api from '../../api/Api';

export const useProfileLogic = () => {
  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/user/profile');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const updateUserProfile = async (formData, profilePic, onSave) => {
    try {
      // Update basic user data
      await api.put('/user/profile', {
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
      });

      // If a new profile picture is provided, upload it
      if (profilePic) {
        const imageData = new FormData();
        imageData.append('profilePic', profilePic);
        await api.post('/user/profile/picture', imageData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      // Refresh user profile
      onSave();
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return {
    user,
    fetchUserProfile,
    updateUserProfile,
  };
};
