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

  const [quantities, setQuantities] = useState({});
  const userRole = localStorage.getItem('role');
  const placeholderImage = '/public/images/placeholder.png';

  const handleQuantityChange = (productId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value,
    }));
  };

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

        {/* Product List */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const productImage = product.image || placeholderImage;
            return (
              <li key={product.id} className="bg-gray-800 rounded-lg shadow-md p-4">
                <img src={productImage} alt={product.name} className="w-full h-40 object-cover mb-4 rounded-md" />
                <h2 className="text-lg font-bold text-green-400">{product.name}</h2>
                <p className="text-gray-300 mb-2">{product.description}</p>
                <p className="text-green-400 font-semibold">${product.price.toFixed(2)}</p>
                <p className="text-gray-300 mb-2">In stock: {product.stockQuantity}</p>

                {/* Admin Actions */}
                {userRole === 'ADMIN' && (
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}

                {/* User Actions */}
                {userRole !== 'ADMIN' && (
                  <div className="flex justify-between mt-4">
                    <input
                      type="number"
                      min="1"
                      value={quantities[product.id] || 1}
                      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                      className="w-1/4 p-1 border rounded-md text-gray-300 bg-gray-700"
                    />
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-500 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Product;
