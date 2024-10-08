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
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productData = new FormData();
    Object.keys(formData).forEach((key) => {
      productData.append(key, formData[key]);
    });

    try {
      let response;
      if (product) {
        // Update existing product
        response = await api.put(`/products/update/${product.id}`, productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Create a new product
        response = await api.post('/products', productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // If there's an image, upload it separately
      if (formData.image) {
        const imageData = new FormData();
        imageData.append('image', formData.image);
        await api.post(`/products/${response.data.id}/image`, imageData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      onSave();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return {
    formData,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
};
