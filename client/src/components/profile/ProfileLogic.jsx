import { useState, useEffect } from 'react';
import api from '../../api/Api'; 

export const useProfileLogic = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  
  const userId = localStorage.getItem('userId');  
  const token = localStorage.getItem('token');    

  const fetchUserProfile = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data); 
    } catch (err) {
      if (err.response && err.response.status === 500) {
        console.warn('User not found after email update, ignoring error.');
      } else {
        console.error('Error fetching user profile:', err);
        setError('Failed to fetch profile');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updatedData) => {
    if (!userId) return;

    try {
      await api.put(`/users/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      fetchUserProfile();  
      return true; 
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
      return false; 
    }
  };  

  useEffect(() => {
    if (userId) {
      fetchUserProfile();  
    }
  }, [userId]);

  return {
    user,
    loading,
    error,
    editing,
    setEditing,
    fetchUserProfile,
    updateUserProfile,
  };
};
