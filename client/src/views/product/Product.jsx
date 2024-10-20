import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; 
import Footer from "../../components/general/Footer";
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

  const handleQuantityChange = (productId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value,
    }));
  };

  const handleAddToCart = (productId) => {
    const selectedQuantity = quantities[productId] || 1; 
    addProductToCart(productId, selectedQuantity);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-4">
          <Link to="/" className="flex items-center text-green-400 hover:text-green-300 transition">
            <ArrowLeftIcon className="h-6 w-6 mr-2" /> {/* Arrow icon with some margin */}
            Back to home
          </Link>
        </div>

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
          <div className="flex justify-center mb-6">
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-500 transition"
            >
              Create Product
            </button>
          </div>
        )}

        {/* Product Form */}
        {editingProduct && (
          <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
            <ProductForm product={editingProduct} onSave={handleSave} />
          </div>
        )}

        {/* Product List */}
        <ul className="space-y-4">
          {products.map((product) => {
            // Construct the image URL
            const productImage = product.image ? `http://localhost:5000${product.image}` : '/images/placeholder.png'; // Updated image URL

            return (
              <li key={product.id} className="bg-gray-800 rounded-lg shadow-md flex p-4 relative">
                {/* Render image */}
                <img src={productImage} alt={product.name} className="w-32 h-32 object-cover rounded-md mr-4" />
                
                {/* Product Info */}
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-green-400 mb-2">{product.name}</h2>
                  <p className="text-gray-300 mb-2">{product.description}</p>
                  <p className="text-green-400 font-semibold text-lg mb-2">${product.price.toFixed(2)}</p>
                  <p className="text-gray-300 mb-2">In stock: {product.stockQuantity}</p>

                  {/* Admin Actions */}
                  {userRole === 'ADMIN' && (
                    <div>
                      <button
                        onClick={() => handleEdit(product)}
                        className="absolute top-2 right-2 bg-purple-700 text-white px-4 py-2 text-lg rounded-md hover:bg-purple-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="absolute bottom-2 right-2 bg-red-600 text-white px-4 py-2 text-lg rounded-md hover:bg-red-500 transition"
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  {/* User Actions */}
                  {userRole !== 'ADMIN' && (
                    <div className=" flex items-center justify-end mt-4">
                      <input
                        type="number"
                        min="1"
                        value={quantities[product.id] || 1}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        className="w-1/4 p-1 border rounded-md text-gray-300 bg-gray-700 mr-2" // Margin to the right for spacing
                      />
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-500 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
