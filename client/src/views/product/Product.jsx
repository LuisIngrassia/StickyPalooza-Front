import React from 'react'; 
import { useProductLogic } from '../../components/product/ProductLogic';
import ProductForm from '../../components/product/ProductForm';

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
    handlePriceFilter,
    handleCategoryFilter,
  } = useProductLogic();

  const placeholderImage = '/public/images/placeholder.png';

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

        {/* Filter by Category */}
        <div className="flex items-center mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Category</option>
            {/* Agrega opciones de categorías aquí */}
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
          </select>
          <button
            onClick={handleCategoryFilter}
            className="ml-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition"
          >
            Filter by Category
          </button>
        </div>

        {/* Filter by Price */}
        <div className="flex items-center mb-4">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm ml-2"
          />
          <button
            onClick={handlePriceFilter}
            className="ml-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition"
          >
            Filter by Price
          </button>
        </div>

        {/* Create Product Button */}
        <button
          onClick={handleCreate}
          className="mb-6 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition"
        >
          Create Product
        </button>

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
              </div>

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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Product;
