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
      setRole(null);
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
          
          {role === 'ADMIN' && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Admin Options</h3>
              <div className="flex flex-wrap justify-center space-x-4 pt-6"> 
                <button
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded m-2 transition duration-200 w-48" 
                  onClick={() => navigate('/categories')}
                >
                  View Categories
                </button>
                <button
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded m-2 transition duration-200 w-48" 
                  onClick={() => navigate('/products')}
                >
                  View Products
                </button>
                <button
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded m-2 transition duration-200 w-48" 
                  onClick={() => navigate('/order')}
                >
                  View Orders
                </button>
                <button
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded m-2 transition duration-200 w-48" 
                  onClick={() => navigate('/bill')}
                >
                  View Bills
                </button>
                <button
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded m-2 transition duration-200 w-48" 
                  onClick={() => navigate('/users')}
                >
                  View Users
                </button>
              </div>
            </div>
          )}

          {token && role !== 'ADMIN' && (
            <div className="mb-8">
              <button
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded m-2 transition duration-200"
                onClick={() => navigate('/products')}
              >
                View Products
              </button>
            </div>
          )}

          {role !== 'ADMIN' && (
            <div className="mb-8  flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Available Products</h3>
              {loading && <p className="text-green-300">Loading products...</p>}
              {error && <p className="text-red-500">{error}</p>}
              <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                {products.map((product) => {
                  const productImage = product.image 
                    ? `http://localhost:5000${product.image}` 
                    : '/images/placeholder.png';

                  return (
                    <div key={product.id} className="bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition duration-200 flex flex-col items-center max-w-[200px]">
                      <img 
                        src={productImage} 
                        alt={product.name} 
                        className="mb-4 w-24 h-24 object-cover rounded-md"
                        onError={(e) => { e.target.onerror = null; e.target.src = '/images/placeholder.png'; }}
                      />
                      <h4 className="text-lg font-semibold text-purple-300">{product.name}</h4>
                      <p className="text-sm text-green-300">{product.description}</p>
                      <p className="text-lg font-bold text-purple-400">${product.price}</p>
                    </div>
                  );
                })}
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
