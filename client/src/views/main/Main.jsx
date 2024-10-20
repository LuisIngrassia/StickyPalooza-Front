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
      fetchProductsWithoutToken();
    }
  }, [token, userRole]);
  
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/products', {
        headers: { Authorization: `Bearer ${token}` },
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
      const response = await api.get('/products'); 
      setProducts(response.data);
    } catch (error) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
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
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded m-2 transition duration-200"
                onClick={() => navigate('/products')}
              >
                Products
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded m-2 transition duration-200"
                onClick={() => navigate('/users')}
              >
                View All Users
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded m-2 transition duration-200"
                onClick={() => navigate('/bill')}
              >
                View Bills
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded m-2 transition duration-200"
                onClick={() => navigate('/order')} // Updated to the Order view URL
              >
                View Orders
              </button>
            </div>
          )}

          {/* Render User button to navigate to products if not an admin */}
          {role !== 'ADMIN' && (
            <div className="mb-8">
              <button
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded m-2 transition duration-200"
                onClick={() => navigate('/products')}
              >
                View Products
              </button>
            </div>
          )}

          {/* Render products for USERS and non-registered users only if not ADMIN */}
          {role !== 'ADMIN' && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Available Products</h3>
              {loading && <p className="text-green-300">Loading products...</p>}
              {error && <p className="text-red-500">{error}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition duration-200">
                    <h4 className="text-lg font-semibold text-purple-300">{product.name}</h4>
                    <p className="text-green-300">{product.description}</p>
                    <p className="font-bold text-purple-400">${product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
