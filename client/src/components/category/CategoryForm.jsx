import React, { useEffect, useState } from 'react';
import api from '../../api/Api';

const CategoryForm = ({ category, onSave }) => {
  const [formData, setFormData] = useState({
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem('token');

  // Set form data if category prop is provided
  useEffect(() => {
    if (category) {
      setFormData({
        description: category.description || '',
      });
    } else {
      setFormData({
        description: '',
      });
    }
  }, [category]);

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

    // Basic validation
    if (!formData.description) {
      alert('Please fill in the description field.');
      setIsSubmitting(false);
      return;
    }

    try {
      const categoryFormData = {
        description: formData.description,
      };

      let response;
      if (category && category.id) {
        // Update existing category
        response = await api.put(`/categories/update/${category.id}`, categoryFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Create new category
        response = await api.post('/categories', categoryFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      console.log('Category saved successfully:', response.data);
      onSave();
    } catch (error) {
      console.error('Error saving category:', error?.response?.data || error.message);
      alert(`Error saving category: ${error?.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="text-green-300 font-semibold">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full mt-2 px-4 py-2 bg-gray-700 text-green-300 rounded-md"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md ${isSubmitting ? 'opacity-50' : ''}`}
        >
          {isSubmitting ? 'Saving...' : 'Save Category'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
