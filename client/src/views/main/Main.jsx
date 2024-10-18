import React, { useEffect, useState } from 'react';
import NavBar from '../../components/general/NavBar';
import Footer from "../../components/general/Footer";
import api from '../../api/Api';  // Import your Axios instance
import { useNavigate } from 'react-router-dom';  // For navigation between pages

const MainPage = () => {
  const [products, setProducts] = useState([]);  // State to store products
  const [loading, setLoading] = useState(true);   // State for loading
  const [error, setError] = useState(null);       // State for error
  const [role, setRole] = useState(null);          // State to store user role

  const token = localStorage.getItem('token');     // Get token from localStorage
  const userRole = localStorage.getItem('role');   // Get role from localStorage

  const navigate = useNavigate();

  // Fetch products for USER role
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);  // Reset error state

    try {
      const response = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${token}`,  // Pass the token in the Authorization header
        },
      });
      setProducts(response.data);  // Assuming the response has a products array
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch products');
      setLoading(false);
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (token) {
      setRole(userRole);  // Set the role based on the fetched or saved user data

      // Fetch products only if the user role is USER
      if (userRole === 'USER') {
        fetchProducts();
      }
    }
  }, [token, userRole]); // Added token and userRole to the dependency array

  // Admin actions
  const handleCreateProduct = () => {
    navigate('/admin/create-product');
  };

  const handleViewAllUsers = () => {
    navigate('/admin/view-users');
  };

  const handleViewBills = () => {
    navigate('/admin/view-bills');
  };

  const handleViewOrders = () => {
    navigate('/admin/view-orders');
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear the token
    localStorage.removeItem('role');   // Clear the role
    navigate('/login');  // Redirect to login page
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-50">
      {/* Render NavBar only if the user role is "USER" or not logged in */}
      {(role === 'USER' || role === null) && <NavBar />}

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 bg-white border border-gray-200 shadow-md p-6 rounded-md inline-block hover:shadow-lg transition-transform duration-300 transform hover:scale-105 mb-6">
            Sticky Palooza
          </h2>

          <p className="text-lg text-gray-700 mb-12">
            ¡Tu tienda favorita de stickers!
          </p>

          {/* Role-based Actions */}
          {role === 'ADMIN' && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Admin Options</h3>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-2"
                onClick={handleCreateProduct}
              >
                Create Product
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-2"
                onClick={handleViewAllUsers}
              >
                View All Users
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-2"
                onClick={handleViewBills}
              >
                View Bills
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-2"
                onClick={handleViewOrders}
              >
                View Orders
              </button>
            </div>
          )}

          {/* Fetch products and display for USER role */}
          {role === 'USER' && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Available Products</h3>
              {loading && <p>Loading products...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {!loading && !error && products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white shadow-lg p-6 rounded-lg">
                      {product.image && (
                        <img
                          src={`${api.defaults.baseURL}${product.image}`}  // Assuming API provides an image field
                          alt={product.name}
                          className="w-full h-48 object-cover mb-4 rounded-md"
                        />
                      )}
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-500">{product.description}</p>
                      <p className="text-gray-700 font-bold">Price: ${product.price}</p>
                    </div>
                  ))}
                </div>
              )}
              {!loading && !error && products.length === 0 && <p>No products available.</p>}
            </div>
          )}

          {/* Logout Button (only for ADMIN) */}
          {role === 'ADMIN' && (
            <div className="mt-12">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;
