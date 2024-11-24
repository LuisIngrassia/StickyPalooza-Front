import { useState } from 'react';
import api from '../../api/Api';

const ProductFormLogic = ({ product, onSave, onCancel }) => { 
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    originalPrice: product?.originalPrice || '',
    stockQuantity: product?.stockQuantity || '',
    categoryId: product?.categoryId || '',
    image: product?.image || null,
    discountPercentage: product?.discountPercentage || 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prevData) => ({ ...prevData, image: files[0] })); 
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.originalPrice || !formData.stockQuantity || !formData.categoryId) {
      alert('Please fill all the required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const productFormData = new FormData();
      productFormData.append('name', formData.name);
      productFormData.append('description', formData.description || '');
      productFormData.append('originalPrice', parseFloat(formData.originalPrice) || 0);
      productFormData.append('stockQuantity', parseInt(formData.stockQuantity, 10));
      productFormData.append('categoryId', Number(formData.categoryId));
      productFormData.append('discountPercentage', parseInt(formData.discountPercentage));

      if (formData.image) {
        productFormData.append('image', formData.image);
      }

      let response;
      if (product && product.id) {
        response = await api.put(`/products/update/${product.id}`, productFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
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

  return { formData, handleChange, handleSubmit, isSubmitting, onCancel }; 
};

export default ProductFormLogic;
