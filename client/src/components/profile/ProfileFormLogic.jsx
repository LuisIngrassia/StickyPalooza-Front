import { useState, useEffect } from 'react';
import api from '../../api/Api';

export const useProfileFormLogic = (onSave) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,  // Attach the token
          },
        });
        setFormData({
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          email: response.data.email || '',
          password: '',  // Usually don't populate password for security reasons
        });
      } catch (error) {
        console.error('Error fetching profile:', error?.response?.data || error.message);
      }
    };

    if (token) {
      fetchProfile();  // Only fetch if the token is available
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await api.put('/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Attach the token
        },
      });
      console.log('Profile updated successfully:', response.data);
      onSave();  // Callback to handle success
    } catch (error) {
      console.error('Error updating profile:', error?.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
  };
};
