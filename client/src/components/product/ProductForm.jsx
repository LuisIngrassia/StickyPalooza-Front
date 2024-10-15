import React from 'react';
import { useProductFormLogic } from './ProductFormLogic';

const ProductForm = ({ product, onSave }) => {
  const { formData, handleChange, handleFileChange, handleSubmit, imagePreview } = useProductFormLogic(product, onSave);

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          type="number"  // Changed to number to ensure valid input
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleFileChange} />
        {imagePreview && (
          <div>
            <img src={imagePreview} alt="Image Preview" className="w-24 h-24 object-cover rounded-md shadow-md mt-4" />
          </div>
        )}
      </div>
      <button type="submit">{product && product.id ? 'Update' : 'Create'} Product</button>
    </form>
  );
};

export default ProductForm;
