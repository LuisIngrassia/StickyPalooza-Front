import React from 'react';
import ProductFormLogic from './ProductFormLogic';

const ProductForm = ({ product, onSave, onCancel, categories }) => {
  const { formData, handleChange, handleSubmit, isSubmitting } = ProductFormLogic({ product, onSave });

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold text-green-400 mb-4 text-center">
        {product && product.id ? 'Editar Producto' : 'Crear Producto'}
      </h2>
      
      <label className="text-purple-300 mb-1 block text-sm">Nombre Producto</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre Producto"
        className="w-full mb-4 p-1 rounded-md bg-gray-700 text-green-300 border border-gray-600"  
        required
      />
      
      <label className="text-purple-300 mb-1 block text-sm">Descripción</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full mb-4 p-1 rounded-md bg-gray-700 text-green-300 border border-gray-600"  
      />
      
      <label className="text-purple-300 mb-1 block text-sm">Precio</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Precio"
        className="w-full mb-4 p-1 rounded-md bg-gray-700 text-green-300 border border-gray-600"  
        required
      />
      
      <label className="text-purple-300 mb-1 block text-sm">Cantidad de Stock</label>
      <input
        type="number"
        name="stockQuantity"
        value={formData.stockQuantity}
        onChange={handleChange}
        placeholder="Cantidad de Stock"
        className="w-full mb-4 p-1 rounded-md bg-gray-700 text-green-300 border border-gray-600"  
        required
      />

      <label className="text-purple-300 mb-1 block text-sm">Categoría</label>
      <select
        name="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
        className="w-full mb-4 p-1 rounded-md bg-gray-700 text-green-300 border border-gray-600"  
        required
      >
        <option value="">Seleccionar Categoria</option>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.description}
            </option>
          ))
        ) : (
          <option disabled>No hay categorias disponibles</option>
        )}
      </select>

      <label className="text-purple-300 mb-1 block text-sm">Imagen</label>
      <input
        type="file"
        name="Imagen"
        onChange={handleChange}
        className="mb-4 p-1 rounded-md bg-gray-700 text-green-300 border border-gray-600"  
      />

      <div className="flex justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-2 rounded-md ${isSubmitting ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-500'} text-white`}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
        </button>

        <button
          type="button"
          onClick={onCancel} 
          className="w-full ml-4 p-2 rounded-md bg-red-600 text-white"
        >
          Cerrar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
