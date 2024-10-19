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
      if (userRole === 'USER') {
        fetchProducts();
      }
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Render NavBar only if the user role is USER */}
      {role === 'USER' && <NavBar />}
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

              {/* Updated Button to go to /products */}
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-2"
                onClick={() => navigate('/products')}
              >
                Products
              </button>

              {/* Updated Button to go to /users */}
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-2"
                onClick={() => navigate('/users')}
              >
                View All Users
              </button>

              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-2"
                onClick={() => navigate('/admin/view-bills')}
              >
                View Bills
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-2"
                onClick={() => navigate('/admin/view-orders')}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-200">
                    <h4 className="text-lg font-semibold">{product.name}</h4>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="font-bold">${product.price}</p>
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
