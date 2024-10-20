import { useState } from 'react';
import api from '../../api/Api';

const ProductFormLogic = ({ product, onSave }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    stockQuantity: product?.stockQuantity || '',
    categoryId: product?.categoryId || '',
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prevData) => ({ ...prevData, image: files[0] })); // Update image file
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
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
        productFormData.append('image', formData.image); // Append the image file directly
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

  return { formData, handleChange, handleSubmit, isSubmitting };
};

export default ProductFormLogic;