import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useProductLogic } from "../../components/product/ProductLogic";
import ProductForm from "../../components/product/ProductForm";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Modal from "../../components/product/Modal";

const Product = () => {
  const {
    products,
    fetchProducts,
    searchTerm,
    setSearchTerm,
    editingProduct,
    selectedCategory,
    setSelectedCategory,
    categories,
    handleDelete,
    handleSearch,
    handleEdit,
    handleSave,
    addProductToCart,
    handleCategoryFilter,
    handleSortOrderChange,
  } = useProductLogic();

  const userRole = localStorage.getItem("role");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState({});
  const [outOfStockMessage, setOutOfStockMessage] = useState({}); // State for out of stock message
  const [exceededQuantityMessage, setExceededQuantityMessage] = useState({}); // State for exceeded quantity message

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({ ...prev, [productId]: value }));
  };

  const handleAddToCart = (productId) => {
    const quantity = quantities[productId] || 1;
    const product = products.find((prod) => prod.id === productId); // Find the product to check stock

    // Check if product is out of stock
    if (product.stockQuantity <= 0) {
      setOutOfStockMessage((prev) => ({ ...prev, [productId]: true })); // Set out of stock message
      setExceededQuantityMessage((prev) => ({ ...prev, [productId]: false })); // Clear exceeded message
      setTimeout(() => {
        setOutOfStockMessage((prev) => ({ ...prev, [productId]: false })); // Clear message after timeout
      }, 1000);
      return; // Stop the function if product is out of stock
    }

    // Check if quantity exceeds stock
    if (quantity > product.stockQuantity) {
      setExceededQuantityMessage((prev) => ({ ...prev, [productId]: true })); // Set exceeded quantity message
      setOutOfStockMessage((prev) => ({ ...prev, [productId]: false })); // Clear out of stock message
      setTimeout(() => {
        setExceededQuantityMessage((prev) => ({ ...prev, [productId]: false })); // Clear message after timeout
      }, 1000);
      return; // Stop the function if quantity exceeds stock
    }

    // If stock is available, proceed to add to cart
    addProductToCart(productId, quantity);
    setQuantities((prev) => ({ ...prev, [productId]: 1 }));

    setShowPopup((prev) => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setShowPopup((prev) => ({ ...prev, [productId]: false }));
    }, 1000);

    fetchProducts();
  };

  const openModal = (product = null) => {
    handleEdit(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="flex items-center mb-4 mt-2 ml-2">
        <Link
          to="/"
          className="flex items-center text-green-400 hover:text-green-300 transition"
        >
          <ArrowLeftIcon className="h-6 w-6 mr-2" />
          Back to home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">
          Products
        </h1>

        <div className="flex items-center mb-8 space-x-4 justify-between">
          <div className="flex items-center space-x-4 flex-grow">
            <input
              type="text"
              placeholder="Search products by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-4 py-2 bg-gray-700 text-green-300 border-purple-600 border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-green-500 focus:border-green-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition"
            >
              Search
            </button>
            <button
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
              className="flex items-center text-green-400 hover:text-green-300 transition"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {userRole === "ADMIN" && (
          <button
            onClick={openModal}
            className="mb-6 w-full px-4 py-2 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 transition"
          >
            Create Product
          </button>
        )}

        {filterMenuOpen && (
          <div className="bg-gray-800 p-4 rounded-md shadow-md mb-6">
            <h2 className="text-lg font-bold text-green-400 mb-4">
              Filter Options
            </h2>

            <div className="flex flex-col space-y-4">
              {/* Sort by Category Dropdown */}
              <div className="flex items-center w-3/5">
                <label
                  htmlFor="sortCategory"
                  className="mr-2 text-gray-400 w-1/3"
                >
                  Filter by Category:
                </label>
                <select
                  id="sortCategory"
                  value={selectedCategory}
                  onChange={(e) => handleCategoryFilter(e.target.value)}
                  className="px-5 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700 text-green-400 flex-grow"
                >
                  <option value="">Select Category</option>
                  {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.description}
                      </option>
                    ))
                  ) : (
                    <option disabled>No categories available</option>
                  )}
                </select>
              </div>

              {/* Sort by Price Dropdown */}
              <div className="flex items-center w-3/5">
                <label htmlFor="sortPrice" className="mr-2 text-gray-400 w-1/3">
                  Sort by Price:
                </label>
                <select
                  id="sortPrice"
                  onChange={(e) => handleSortOrderChange(e.target.value)}
                  className="px-5 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700 text-green-400 flex-grow"
                >
                  <option value="none">Order by price</option>
                  <option value="asc">Cehaper first</option>
                  <option value="desc">Expensive first</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <ul className="space-y-6 mt-6">
          {products.map((product) => {
            const productImage = product.image
              ? `http://localhost:5000${product.image}`
              : "/images/placeholder.png";

            return (
              <li
                key={product.id}
                className="bg-gray-800 rounded-lg shadow-md flex items-center justify-between p-4 space-x-4"
              >
                <img
                  src={productImage}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-md"
                />

                <div className="flex flex-col flex-grow gap-5">
                  <div>
                    <h3 className="text-2xl font-bold text-green-400">
                      {product.name}
                    </h3>
                    <p className="text-gray-300">{product.description}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 font-semibold">
                      Price: ${product.price}
                    </p>
                    <p className="text-gray-400">
                      Stock: {product.stockQuantity}
                    </p>
                  </div>

                  <p className="text-gray-500 text-sm">
                    Category: {product.categoryDescription}
                  </p>
                </div>

                <div className="space-y-4 flex flex-col items-center">
                  {userRole === "ADMIN" && (
                    <div className="flex space-x-4">
                      <button
                        onClick={() => openModal(product)}
                        className="w-20 px-4 py-2 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="w-20 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  {userRole === "USER" && (
                    <>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={quantities[product.id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(product.id, e.target.value)
                          }
                          className="w-16 px-2 py-1 border border-gray-300 rounded-md bg-gray-700 text-green-400"
                          min="1"
                        />
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="px-4 py-2 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 transition"
                        >
                          Add to Cart
                        </button>
                      </div>

                      {showPopup[product.id] && (
                        <div className="mt-2 p-2 text-green-500">
                          Product added!
                        </div>
                      )}

                      {outOfStockMessage[product.id] && (
                        <div className="mt-2 p-2 text-red-500">
                          Product out of stock
                        </div>
                      )}

                      {exceededQuantityMessage[product.id] && (
                        <div className="mt-2 p-2 text-red-500">
                          Quantity exceeds available stock
                        </div>
                      )}
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <Modal isOpen={modalOpen} onClose={closeModal}>
          <ProductForm
            product={editingProduct}
            onSave={(product) => {
              handleSave(product);
              closeModal();
            }}
            onCancel={closeModal}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Product;
