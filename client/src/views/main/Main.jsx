import React, { useEffect, useState } from 'react';
import NavBar from '../../components/general/NavBar';
import Footer from "../../components/general/Footer";
import api from '../../api/Api';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setRole(userRole);
      fetchProducts();
    } else {
      // Fetch products for non-registered users
      fetchProductsWithoutToken();
    }
  }, [token, userRole]);
  
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/products', {
        headers: { Authorization: `Bearer ${token}` }, // Use the token here
      });
      setProducts(response.data);
    } catch (error) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchProductsWithoutToken = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/products'); // No token needed here
      setProducts(response.data);
    } catch (error) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <NavBar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 text-center">
          
          <img src="/images/stickylogo.png" alt="Sticky Palooza Logo" className="h-60 mx-auto mb-6 transform rotate-[-20deg]" />
          
          <p className="text-lg text-green-300 mb-12">
            ¡Tu tienda favorita de stickers!
          </p>
          
          {/* Render Admin Options only for ADMIN role */}
          {role === 'ADMIN' && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Admin Options</h3>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded m-2"
                onClick={() => navigate('/products')}
              >
                Products
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded m-2"
                onClick={() => navigate('/users')}
              >
                View All Users
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded m-2"
                onClick={() => navigate('/admin/view-bills')}
              >
                View Bills
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded m-2"
                onClick={() => navigate('/admin/view-orders')}
              >
                View Orders
              </button>
            </div>
          )}
          
          {/* Render products for USERS and non-registered users */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-green-400">Available Products</h3>
            {loading && <p className="text-green-300">Loading products...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition duration-200">
                  <h4 className="text-lg font-semibold text-purple-300">{product.name}</h4>
                  <p className="text-green-300">{product.description}</p>
                  <p className="font-bold text-purple-400">${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
