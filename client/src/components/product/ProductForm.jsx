import React from 'react';
import { useProductFormLogic } from './ProductFormLogic';

const ProductForm = ({ product, onSave }) => {
  const { formData, handleChange, handleFileChange, handleSubmit, imagePreview, isSubmitting } = useProductFormLogic(product, onSave);

  const placeholderImage = '/images/placeholder.png';

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-green-300 font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-2 bg-gray-700 text-green-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="text-green-300 font-semibold">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 bg-gray-700 text-green-300 rounded-md"
          />
        </div>

        <div>
          <label className="text-green-300 font-semibold">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-2 bg-gray-700 text-green-300 rounded-md"
          />
        </div>

        <div>
          <label className="text-green-300 font-semibold">Stock Quantity:</label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-2 bg-gray-700 text-green-300 rounded-md"
          />
        </div>

        <div>
          <label className="text-green-300 font-semibold">Category ID:</label>
          <input
            type="number"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-2 bg-gray-700 text-green-300 rounded-md"
          />
        </div>

        <div>
          <label className="text-green-300 font-semibold">Image:</label>
          <input type="file" name="image" onChange={handleFileChange} className="w-full mt-2 px-4 py-2 bg-gray-700 text-green-300 rounded-md" />
          <div className="mt-4">
            <img
              src={imagePreview || placeholderImage}
              alt="Image Preview"
              className="w-40 h-40 object-cover rounded-md shadow-md"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md ${isSubmitting ? 'opacity-50' : ''}`}
        >
          {isSubmitting ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
