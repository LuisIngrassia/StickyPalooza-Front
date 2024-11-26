import React from "react";
import ProductFormLogic from "./ProductFormLogic";

const ProductForm = ({ product, onSave, onCancel, categories }) => {
  const { formData, handleChange, handleSubmit, isSubmitting } =
    ProductFormLogic({ product, onSave });

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="bg-gray-800 p-6 rounded-lg"
    >
      <h2 className="text-xl font-bold text-green-400 mb-4 text-center">
        {product && product.id ? "Editar Producto" : "Crear Producto"}
      </h2>
      {/* Product Name */}
      <label className="text-gray-300 font-semibold mb-2 block">
        Product Name
      </label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded-md bg-gray-700 text-green-300 border border-gray-600"
        required
      />
      {/* Description */}
      <label className="text-gray-300 font-semibold mb-2 block">
        Description
      </label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded-md bg-gray-700 text-green-300 border border-gray-600"
      />
      {/* Price */}
      <label className="text-gray-300 font-semibold mb-2 block">
        Price (w/o discount)
      </label>
      <input
        type="number"
        name="originalPrice"
        value={formData.originalPrice || 0}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded-md bg-gray-700 text-green-300 border border-gray-600 appearance-none"
        required
      />
      {/* Stock Quantity */}
      <label className="text-gray-300 font-semibold mb-2 block">
        Stock Quantity
      </label>
      <input
        type="number"
        name="stockQuantity"
        value={formData.stockQuantity}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded-md bg-gray-700 text-green-300 border border-gray-600 appearance-none"
        required
      />
      {/* Category ID */}
      <label className="text-gray-300 font-semibold mb-2 block">
        Category ID
      </label>
      <select
        type="number"
        name="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded-md bg-gray-700 text-green-300 border border-gray-600 appearance-none"
        required
      >
        <option value="">Select Category</option>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.description}
            </option>
          ))
        ) : (
          <option disabled>No available categories.</option>
        )}
      </select>
      z{/* Discount */}
      <label className="text-gray-300 font-semibold mb-2 block">
        Discount (%)
      </label>
      <input
        type="number"
        name="discountPercentage"
        value={formData.discountPercentage || 0}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded-md bg-gray-700 text-green-300 border border-gray-600 appearance-none"
      />
      {/* Image */}
      <label className="text-gray-300 font-semibold mb-2 block">
        Product Image
      </label>
      <input
        type="file"
        name="Imagen"
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded-md bg-gray-700 text-green-300 border border-gray-600"
      />
      <div className="flex justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-2 rounded-md ${
            isSubmitting ? "bg-gray-500" : "bg-green-600 hover:bg-green-500"
          } text-white`}
        >
          {isSubmitting ? "Guardando..." : "Guardar Producto"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="w-full ml-4 p-2 rounded-md bg-red-600 text-white"
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
