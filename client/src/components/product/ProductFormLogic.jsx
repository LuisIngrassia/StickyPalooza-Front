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
        setImagePreview(product.image);
      }
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

    try {
      const productPayload = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        stockQuantity: formData.stockQuantity,
        categoryId: Number(formData.categoryId), // Convert to number
      };

      let response;
      if (product) {
        // Update existing product (PUT request)
        response = await api.put(`/products/update/${product.id}`, productPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } else {
        // Create a new product (POST request)
        response = await api.post('/products', productPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }

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
      setIsSubmitting(false);  
    } catch (error) {
      console.error('Error saving product:', error);
      setIsSubmitting(false);
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
