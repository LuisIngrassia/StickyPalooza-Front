// src/components/ProductForm.js

import React from 'react';
import ProductFormLogic from './ProductFormLogic'; 

const ProductForm = ({ product, onSave }) => {
  const { formData, handleChange, handleSubmit, isSubmitting } = ProductFormLogic({ product, onSave });

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-400 mb-4">{product ? 'Edit Product' : 'Create Product'}</h2>
      
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full mb-4 p-2 rounded-md bg-gray-700 text-green-300 border border-gray-600"
        required
      />
      
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-4 p-2 rounded-md bg-gray-700 text-green-300 border border-gray-600"
      />
      
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full mb-4 p-2 rounded-md bg-gray-700 text-green-300 border border-gray-600"
        required
      />
      
      <input
        type="number"
        name="stockQuantity"
        value={formData.stockQuantity}
        onChange={handleChange}
        placeholder="Stock Quantity"
        className="w-full mb-4 p-2 rounded-md bg-gray-700 text-green-300 border border-gray-600"
        required
      />

      <input
        type="number"
        name="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
        placeholder="Category ID"
        className="w-full mb-4 p-2 rounded-md bg-gray-700 text-green-300 border border-gray-600"
        required
      />

      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="mb-4 p-2 rounded-md bg-gray-700 text-green-300 border border-gray-600"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full p-2 rounded-md ${isSubmitting ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-500'} text-white`}
      >
        {isSubmitting ? 'Saving...' : 'Save Product'}
      </button>
    </form>
  );
};

export default ProductForm;
