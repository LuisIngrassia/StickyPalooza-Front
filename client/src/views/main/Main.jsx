import React, { useEffect, useState } from 'react';
import NavBar from '../../components/general/NavBar';
import Footer from "../../components/general/Footer";
import api from '../../api/Api';  // Import your Axios instance

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');  // Get token from localStorage

  // Fetch products
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
    fetchProducts();  // Fetch products on component mount
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-50">
      <NavBar />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 bg-white border border-gray-200 shadow-md p-6 rounded-md inline-block hover:shadow-lg transition-transform duration-300 transform hover:scale-105 mb-6">
            Sticky Palooza
          </h2>

          <p className="text-lg text-gray-700 mb-12">
            ¡Tu tienda favorita de stickers!
          </p>

          {/* Products Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {loading && <p>Loading products...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && products.length > 0 && products.map((product) => (
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
            {!loading && !error && products.length === 0 && <p>No products available.</p>}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;
