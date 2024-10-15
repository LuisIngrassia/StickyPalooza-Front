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
    } else {
      // Reset form for new product creation
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
    e.preventDefault(); // Prevent page reload
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.price || !formData.stockQuantity || !formData.categoryId) {
      console.error('Please fill all the required fields.');
      alert('Please fill all the required fields.'); // Optional: Display an alert
      setIsSubmitting(false);
      return;
    }

    try {
      // Create FormData to include both product details and image
      const productFormData = new FormData();
      productFormData.append('name', formData.name);
      productFormData.append('description', formData.description || ''); // Ensure optional fields are handled
      productFormData.append('price', parseFloat(formData.price)); // Convert to float
      productFormData.append('stockQuantity', parseInt(formData.stockQuantity, 10)); // Convert to int
      productFormData.append('categoryId', Number(formData.categoryId)); // Convert to number

      if (formData.image) {
        productFormData.append('image', formData.image); // Append the image if it exists
      }

      let response;
      if (product && product.id) {
        // Update existing product with FormData
        response = await api.put(`/products/update/${product.id}`, productFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Ensure multipart for file handling
          },
        });
      } else {
        // Create a new product (using FormData for consistency)
        response = await api.post('/products', productFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Set content-type to multipart/form-data
          },
        });
      }

      // Log the response for debugging
      console.log('Product saved successfully:', response.data);

      onSave(); // Trigger reloading the product list
    } catch (error) {
      console.error('Error saving product:', error?.response?.data || error.message);
      alert(`Error saving product: ${error?.response?.data?.message || error.message}`); // Optional: Alert the user
    } finally {
      setIsSubmitting(false);
    }
  };


  return {
    formData,
    handleChange,
    handleFileChange,
    handleSubmit,
    imagePreview,
    isSubmitting, // Return this to control submit button state
  };
};
