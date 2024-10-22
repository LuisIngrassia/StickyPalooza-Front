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
        if (response.data) {
          setCategories(response.data); 
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
    setEditingCategory(category); 
  };

  const handleCreate = () => {
    setEditingCategory({}); 
  };

  const handleSave = async (category) => {
    try {
      let response;

      if (category.id) {
        response = await api.put(`/categories/update/${category.id}`, {
          description: category.description,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await api.post('/categories', {
          description: category.description,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response.data) {
        setCategories((prevCategories) => {
          const updatedCategories = prevCategories.filter((cat) => cat.id !== response.data.id);
          return [...updatedCategories, response.data]; 
        });
      }
      setEditingCategory(null); 
    } catch (error) {
      console.error('Error saving category:', error?.response?.data || error.message);
    }
    window.location.reload();
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
