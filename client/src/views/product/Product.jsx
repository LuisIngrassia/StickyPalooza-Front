import React, { useState } from 'react'; 
import { useProductLogic } from '../../components/product/ProductLogic';
import ProductForm from '../../components/product/ProductForm';
import { Bars3Icon } from '@heroicons/react/24/outline';

const Product = () => {
  const {
    products,
    searchTerm,
    setSearchTerm,
    editingProduct,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    handleDelete,
    handleSearch,
    handleEdit,
    handleSave,
    handleCreate,
    addProductToCart,
    handlePriceFilter,
    handleCategoryFilter,
  } = useProductLogic();

  const placeholderImage = '/public/images/placeholder.png';
  const userRole = localStorage.getItem('role');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [quantities, setQuantities] = useState({}); 

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({ ...prev, [productId]: value }));
  };

  const handleAddToCart = (productId) => {
    const quantity = quantities[productId] || 1; 
    addProductToCart(productId, quantity);
    setQuantities((prev) => ({ ...prev, [productId]: 1 }));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">Products</h1>

        {/* Search Bar */}
        <div className="flex items-center mb-8 space-x-4">
          <input
            type="text"
            placeholder="Search products by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-500 focus:border-green-500"
          />
          <button
            onClick={() => handleSearch(searchTerm)}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition"
          >
            Search
          </button>
        </div>

        {/* Filter Menu */}
        <button 
          onClick={() => setFilterMenuOpen(!filterMenuOpen)} 
          className="flex items-center mb-4 text-green-400 hover:text-green-300 transition"
        >
          <Bars3Icon className="h-6 w-6 mr-2" />
          Filter
        </button>

        {filterMenuOpen && (
          <div className="bg-gray-800 p-4 rounded-md shadow-md mb-6">
            <h2 className="text-lg font-bold text-green-400 mb-2">Filter Options</h2>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700 text-green-400"
                >
                  <option value="">Select Category</option>
                  {/* Populate categories dynamically */}
                  <option value="1">Category 1</option>
                  <option value="2">Category 2</option>
                </select>
                <button
                  onClick={() => handleCategoryFilter(selectedCategory)}
                  className="ml-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition"
                >
                  Filter by Category
                </button>
              </div>

              <div className="flex items-center">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700 text-green-400"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700 text-green-400 ml-2"
                />
                <button
                  onClick={() => handlePriceFilter(minPrice, maxPrice)}
                  className="ml-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition"
                >
                  Filter by Price
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Product Button (Admin Only) */}
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
          <div className="mb-8 p-4 bg-gray-800 shadow-lg rounded-md">
            <ProductForm product={editingProduct} onSave={handleSave} />
          </div>
        )}

        {/* Products List */}
        <ul className="space-y-6">
          {products.map((product) => (
            <li key={product.id} className="p-6 bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between">
              <div className="flex flex-col space-y-2">
                <h3 className="text-2xl font-bold text-green-400">{product.name}</h3>
                <p className="text-gray-300">{product.description}</p>
                <p className="text-gray-400 font-semibold">Price: ${product.price}</p>
                <p className="text-gray-400">Stock: {product.stockQuantity}</p>
                <p className="text-gray-500 text-sm">Category ID: {product.categoryId}</p>

                <img
                  src={product.image ? `/images/${product.image}` : placeholderImage}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md shadow-md mt-4"
                />
              </div>

              <div className="mt-4 md:mt-0 space-x-4 flex">
                {/* Edit and Delete Buttons (Admin Only) */}
                {userRole === 'ADMIN' && (
                  <>
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-400 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition"
                    >
                      Delete
                    </button>
                  </>
                )}

                {/* Add to Cart Button (User Only) */}
                {userRole === 'USER' && (
                  <>
                    <input
                      type="number"
                      value={quantities[product.id] || 1}
                      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md bg-gray-700 text-green-400"
                      min="1"
                    />
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition"
                    >
                      Add to Cart
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Product;
