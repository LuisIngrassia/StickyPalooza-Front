import React from 'react';
import { useProductFormLogic } from './ProductFormLogic';

const ProductForm = ({ product, onSave }) => {
  const { formData, handleChange, handleFileChange, handleSubmit } = useProductFormLogic(product, onSave);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
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
        <label>Stock Quantity:</label>
        <input
          type="number"
          name="stockQuantity"
          value={formData.stockQuantity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Category ID:</label>
        <input
          type="text"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleFileChange} />
      </div>
      <button type="submit">{product ? 'Update' : 'Create'} Product</button>
    </form>
  );
};

export default ProductForm;
