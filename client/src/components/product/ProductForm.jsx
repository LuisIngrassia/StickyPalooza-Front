import React from 'react';
import { useProductFormLogic } from './ProductFormLogic';

const ProductForm = ({ product, onSave }) => {
  const { formData, handleChange, handleFileChange, handleSubmit, imagePreview, isSubmitting } = useProductFormLogic(product, onSave);

  const placeholderImage = '/images/placeholder.png';

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
          type="number"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleFileChange} />
        <div className="mt-4">
          <img
            src={imagePreview || placeholderImage} // Update image preview source
            alt="Image Preview"
            className="w-24 h-24 object-cover rounded-md shadow-md"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
