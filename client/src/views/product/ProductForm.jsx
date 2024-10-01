import React, { useState, useEffect } from 'react';
import api from '../api';

const ProductForm = ({ product, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    categoryId: '',
    image: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stockQuantity: product.stockQuantity || '',
        categoryId: product.categoryId || '',
        image: product.image || '',
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

    try {
      let response;
      if (product) {
        response = await api.put(`/products/update/${product.id}`, formData);
      } else {
        response = await api.post('/products', formData);
      }

      if (formData.image) {
        const imageData = new FormData();
        imageData.append('image', formData.image);
        await api.post(`/products/${response.data.id}/image`, imageData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      onSave(); 
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Descripcion:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Cantidad Stock:</label>
        <input
          type="number"
          name="stockQuantity"
          value={formData.stockQuantity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>ID Categoria:</label>
        <input
          type="text"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Imagen:</label>
        <input type="file" name="image" onChange={handleFileChange} />
      </div>
      <button type="submit">{product ? 'Update' : 'Create'} Product</button>
    </form>
  );
};

export default ProductForm;
