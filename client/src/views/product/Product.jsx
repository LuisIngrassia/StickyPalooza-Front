import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useProductLogic } from "../../components/product/ProductLogic";
import ProductForm from "../../components/product/ProductForm";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Modal from "../../components/product/Modal";
import ProductDetailModal from '../../components/product/ProductDetailModal';

const Product = () => {
  const {
    products,
    fetchProducts,
    searchTerm,
    setSearchTerm,
    editingProduct,
    selectedCategory,
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
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState({});
  const [outOfStockMessage, setOutOfStockMessage] = useState({}); 
  const [exceededQuantityMessage, setExceededQuantityMessage] = useState({}); 

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({ ...prev, [productId]: value }));
  };

  const handleAddToCart = (productId) => {
    const quantity = quantities[productId] || 1;
    const product = products.find((prod) => prod.id === productId); 

    if (product.stockQuantity <= 0) {
      setOutOfStockMessage((prev) => ({ ...prev, [productId]: true })); 
      setExceededQuantityMessage((prev) => ({ ...prev, [productId]: false }));
      setTimeout(() => {
        setOutOfStockMessage((prev) => ({ ...prev, [productId]: false })); 
      }, 1000);
      return; 
    }

    if (quantity > product.stockQuantity) {
      setExceededQuantityMessage((prev) => ({ ...prev, [productId]: true })); 
      setOutOfStockMessage((prev) => ({ ...prev, [productId]: false })); 
      setTimeout(() => {
        setExceededQuantityMessage((prev) => ({ ...prev, [productId]: false })); 
      }, 1000);
      return; 
    }

    addProductToCart(productId, quantity);
    setQuantities((prev) => ({ ...prev, [productId]: 1 }));

    setShowPopup((prev) => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setShowPopup((prev) => ({ ...prev, [productId]: false }));
    }, 1000);

    fetchProducts();
  };

  const openModal = (product = null) => {
    if (product) {
      handleEdit(product);
    } else {
      handleEdit(null);
    }
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
    fetchProducts();
  };

  const openDetailModal = (product) => {
    setSelectedProduct(product);
    setDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="flex items-center mb-4 mt-2 ml-2">
        <Link
          to="/"
          className="flex items-center text-green-400 hover:text-green-300 transition"
        >
          <ArrowLeftIcon className="h-6 w-6 mr-2" />
          Back to Homepage
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
              Search...
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
                  <option value="">Choose a category...</option>
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

              <div className="flex items-center w-3/5">
                <label htmlFor="sortPrice" className="mr-2 text-gray-400 w-1/3">
                  Order by price:
                </label>
                <select
                  id="sortPrice"
                  onChange={(e) => handleSortOrderChange(e.target.value)}
                  className="px-5 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700 text-green-400 flex-grow"
                >
                  <option value="none">select an option...</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
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
                className="bg-gray-800 rounded-lg shadow-md flex p-4 relative overflow-visible" 
              >
                
                {product.discountPercentage > 0 && (
                  <div
                    className="absolute bottom-2 right-5 transform translate-y-1/2 translate-x-1/2 bg-green-500 text-white font-bold text-sm py-1 px-3 rounded-full shadow-lg z-10"
                  >
                    {product.discountPercentage}% OFF
                  </div>
                )}

                <img
                  src={productImage}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-md mr-4"
                />

                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-green-400">{product.name}</h3>
                  <p className="text-gray-300">{product.description}</p>

                  {product.originalPrice !== product.price ? (
                    <>
                      <p className="text-gray-400 font-semibold">
                        Original Price: ${product.originalPrice}
                      </p>
                      <p className="text-gray-400 font-semibold">Discounted Price: ${product.price}</p>
                    </>
                  ) : (
                    <p className="text-gray-400 font-semibold">Price: ${product.price}</p>
                  )}

                  <p className="text-gray-400 font-semibold">Stock: {product.stockQuantity}</p>
                  <p className="text-gray-500 text-sm">Category ID: {product.categoryId}</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4">
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
                    <div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={quantities[product.id] || 1}
                          onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                          className="w-16 px-2 py-1 border border-gray-300 rounded-md bg-gray-700 text-green-400"
                          min="1"
                        />
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="px-4 py-2 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 transition"
                        >
                          Add to cart
                        </button>
                      </div>

                      {showPopup[product.id] && (
                        <div className="mt-2 p-2 text-green-500">Product added!</div>
                      )}

                      {outOfStockMessage[product.id] && (
                        <div className="mt-2 p-2 text-red-500">No stock left.</div>
                      )}

                      {exceededQuantityMessage[product.id] && (
                        <div className="mt-2 p-2 text-red-500">Exceeding available stock.</div>
                      )}
                    </div>
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
            categories={categories}
          />
        </Modal>


        <ProductDetailModal 
          isOpen={detailModalOpen} 
          onClose={closeDetailModal} 
          product={selectedProduct} 
        /> 
      </div>
    </div>
  );
};

export default Product;
