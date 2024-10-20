import { useState, useEffect } from 'react';
import api from '../../api/Api';

export const useProductFormLogic = (product, onSave) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    categoryId: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stockQuantity: product.stockQuantity || '',
        categoryId: product.categoryId || '',
        image: null,
      });

      if (product.image) {
        setImagePreview(`/images/${product.image}`);
      }
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        categoryId: '',
        image: null,
      });
      setImagePreview(null);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.price || !formData.stockQuantity || !formData.categoryId) {
      alert('Please fill all the required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const productFormData = new FormData();
      productFormData.append('name', formData.name);
      productFormData.append('description', formData.description || '');
      productFormData.append('price', parseFloat(formData.price));
      productFormData.append('stockQuantity', parseInt(formData.stockQuantity, 10));
      productFormData.append('categoryId', Number(formData.categoryId));

      if (formData.image) {
        const filename = await uploadImageToFrontend(formData.image); // Upload the image to the frontend storage
        productFormData.append('image', filename); // Use the filename returned from the upload
      }

      let response;
      if (product && product.id) {
        // Update existing product
        response = await api.put(`/products/update/${product.id}`, productFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Create new product
        response = await api.post('/products', productFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      console.log('Product saved successfully:', response.data);
      onSave(); 
    } catch (error) {
      console.error('Error saving product:', error?.response?.data || error.message);
      alert(`Error saving product: ${error?.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadImageToFrontend = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    // Make a POST request to your server to get the filename
    try {
      const response = await api.post('/products/uploadImage', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data; // Assuming the backend returns the filename
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  return {
    formData,
    handleChange,
    handleFileChange,
    handleSubmit,
    imagePreview,
    isSubmitting,
  };
};
