import { useState, useEffect } from 'react';
import api from '../../api/Api';

export const useCategoryLogic = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch all categories on initial load
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Ensure response has the correct data structure
        if (response.data) {
          setCategories(response.data); // Directly set the list of categories
        } else {
          console.error('No categories found in the response');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleSearch = async () => {
    try {
      const response = await api.get('/categories/getAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data) {
        const filteredCategories = response.data.filter((category) =>
          category.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCategories(filteredCategories);
      } else {
        console.error('No categories found in the response');
      }
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

  const handleSave = async (category) => {
    try {
      let response;

      // If editing an existing category, update it
      if (category.id) {
        response = await api.post('/categories', {
          id: category.id,
          description: category.description,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Create a new category
        response = await api.post('/categories', {
          description: category.description,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Reload categories after save
      if (response.data) {
        setCategories((prevCategories) => {
          // Update the category list
          const updatedCategories = prevCategories.filter((cat) => cat.id !== response.data.id);
          return [...updatedCategories, response.data]; // Add the new/updated category
        });
      }
      setEditingCategory(null); // Close the form after saving
    } catch (error) {
      console.error('Error saving category:', error?.response?.data || error.message);
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
