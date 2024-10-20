import { useState, useEffect } from 'react';
import api from '../../api/Api';

export const useCategoryLogic = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data.content); // Adjust based on the structure of your response
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/categories/search?description=${encodeURIComponent(searchTerm)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.content); // Adjust based on the structure of your response
    } catch (error) {
      console.error('Error searching categories:', error?.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error?.response?.data || error.message);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category); // Set category for editing
  };

  const handleCreate = () => {
    setEditingCategory({}); // Set empty category for new creation
  };

  const handleSave = async () => {
    try {
      const response = await api.get('/categories/getAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.content); // Reload categories after save
      setEditingCategory(null); // Close the form after saving
    } catch (error) {
      console.error('Error reloading categories:', error?.response?.data || error.message);
    }
  };

  return {
    categories,
    searchTerm,
    setSearchTerm,
    editingCategory,
    handleDelete,
    handleSearch,
    handleEdit,
    handleSave,
    handleCreate,
  };
};
