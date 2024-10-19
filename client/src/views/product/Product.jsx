import React, { useState } from 'react';
import { useProductLogic } from '../../components/product/ProductLogic';
import ProductForm from '../../components/product/ProductForm';

const Product = () => {
  const {
    products,
    searchTerm,
    setSearchTerm,
    editingProduct,
    handleDelete,
    handleSearch,
    handleEdit,
    handleSave,
    handleCreate,
    addProductToCart, // Destructure the addProductToCart function
  } = useProductLogic();

  const [selectedQuantity, setSelectedQuantity] = useState(1); // State to store the selected quantity
  const userRole = localStorage.getItem('role'); // Assuming the user role is stored in localStorage
  const placeholderImage = '/public/images/placeholder.png';

  const handleAddToCart = (productId) => {
    addProductToCart(productId, selectedQuantity);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Products</h1>

        {/* Search Bar */}
        <div className="flex items-center mb-8 space-x-4">
          <input
            type="text"
            placeholder="Search products by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 transition"
          >
            Search
          </button>
        </div>

        {/* Conditionally render Create Product button for ADMIN role */}
        {userRole === 'ADMIN' && (
          <button
            onClick={handleCreate}
            className="mb-6 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition"
          >
            Create Product
          </button>
        )}

        {/* Product Form (for both create and edit) */}
        {editingProduct && (
          <div className="mb-8 p-4 bg-white shadow-lg rounded-md">
            <ProductForm product={editingProduct} onSave={handleSave} />
          </div>
        )}

        {/* Products List */}
        <ul className="space-y-6">
          {products.map((product) => (
            <li key={product.id} className="p-6 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between">
              <div className="flex flex-col space-y-2">
                <h3 className="text-2xl font-bold text-gray-700">{product.name}</h3>
                <p className="text-gray-500">{product.description}</p>
                <p className="text-gray-700 font-semibold">Price: ${product.price}</p>
                <p className="text-gray-700">Stock: {product.stockQuantity}</p>
                <p className="text-gray-500 text-sm">Category ID: {product.categoryId}</p>

                <img
                  src={product.image ? `/images/${product.image}` : placeholderImage}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md shadow-md mt-4"
                />

                {/* Conditionally render Add to Cart for USER role */}
                {userRole === 'USER' && (
                  <div className="mt-4 flex items-center space-x-2">
                    <label htmlFor={`quantity-${product.id}`} className="text-gray-700">Qty:</label>
                    <input
                      id={`quantity-${product.id}`}
                      type="number"
                      value={selectedQuantity}
                      onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
                      min="1"
                      className="w-16 px-2 py-1 border rounded-md"
                    />
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>

              {/* Conditionally render Edit/Delete buttons for ADMIN role */}
              {userRole === 'ADMIN' && (
                <div className="mt-4 md:mt-0 space-x-4 flex">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Product;
