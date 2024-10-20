// src/components/users/UsersLogic.js

import { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../../api/Api'; // Adjust the import based on your API structure

export const useUsersLogic = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsers(page, 10);
      setUsers(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        alert('User deleted successfully!');
        fetchUsers(page);
      } catch (error) {
        alert('Failed to delete user.');
      }
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return {
    users,
    loading,
    error,
    page,
    totalPages,
    setPage,
    handleDeleteUser,
  };
};
