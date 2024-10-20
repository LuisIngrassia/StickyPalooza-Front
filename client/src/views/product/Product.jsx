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
    addProductToCart,
  } = useProductLogic();

  // State to track selected quantities for each product by productId
  const [quantities, setQuantities] = useState({});
  const userRole = localStorage.getItem('role');
  const placeholderImage = '/public/images/placeholder.png';

  // Handle quantity change for a specific product
  const handleQuantityChange = (productId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value,
    }));
  };

  // Handle adding product to the cart with the selected quantity
  const handleAddToCart = (productId) => {
    const selectedQuantity = quantities[productId] || 1; // Default to 1 if not set
    addProductToCart(productId, selectedQuantity);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-green-400 mb-8">Products</h1>

        {/* Search Bar */}
        <div className="flex items-center mb-8 space-x-4">
          <input
            type="text"
            placeholder="Search products by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 bg-gray-700 text-green-300 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-green-500 focus:border-green-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition"
          >
            Search
          </button>
        </div>

        {/* Conditionally render Create Product button for ADMIN role */}
        {userRole === 'ADMIN' && (
          <button
            onClick={handleCreate}
            className="mb-6 px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-500 transition"
          >
            Create Product
          </button>
        )}

        {/* Product Form */}
        {editingProduct && (
          <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
            <ProductForm product={editingProduct} onSave={handleSave} />
          </div>
        )}

        {/* Products List */}
        <ul className="space-y-6">
          {products.map((product) => {
            // Conditionally render product for USER and ADMIN
            const isOutOfStock = product.stockQuantity === 0;

            return (
              (userRole === 'ADMIN' || !isOutOfStock) && ( // Render if ADMIN or if stock is available for USER
                <li key={product.id} className="p-6 bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                  <img
                    src={product.image ? `/images/${product.image}` : placeholderImage}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-md shadow-md"
                  />
                  <div className="flex-grow md:ml-6 space-y-2">
                    <h3 className="text-3xl font-bold text-green-400">{product.name}</h3>
                    <p className="text-gray-300">{product.description}</p>
                    <p className="text-green-400 font-semibold">Price: ${product.price}</p>
                    <p className="text-gray-400">Stock: {product.stockQuantity}</p>
                    <p className="text-gray-500 text-sm">Category ID: {product.categoryId}</p>
                  </div>

                  {/* Add to Cart for USER role */}
                  {userRole === 'USER' && !isOutOfStock && (
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                      <input
                        type="number"
                        value={quantities[product.id] || 1} // Default to 1 if not set
                        onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                        min="1"
                        className="w-16 px-2 py-1 bg-gray-700 text-green-300 border border-gray-600 rounded-md"
                      />
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  )}

                  {/* Edit/Delete for ADMIN role */}
                  {userRole === 'ADMIN' && (
                    <div className="flex space-x-4 mt-4 md:mt-0">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition"
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
              )
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Product;
