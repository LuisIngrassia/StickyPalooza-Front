import api from '../../api/Api'; 

export const getAllUsers = async (page = 0, size = 10) => {
  try {
    const response = await api.get('/users', {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await api.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return true; 
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
