import { useState, useEffect } from 'react';
import api from '../../api/Api';

export const useProductLogic = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data); 
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    

    fetchProducts();
  }, [token]);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/products/search?name=${encodeURIComponent(searchTerm)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error?.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error?.response?.data || error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product); // Set product for editing
  };

  const handleCreate = () => {
    setEditingProduct({}); // Set empty product for new creation
  };

  const handleSave = async () => {
    try {
      const response = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
      setEditingProduct(null); // Close the form after saving
    } catch (error) {
      console.error('Error reloading products:', error?.response?.data || error.message);
    }
  };

  const addProductToCart = async (productId, quantity) => {
    const cartId = cart?.id;

    try {
      await api.post('/carts/addProduct', {
        cartId,
        productId,
        quantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchCart();
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Error adding product: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    searchTerm,
    setSearchTerm,
    editingProduct,
    handleDelete,
    handleSearch,
    handleEdit,
    handleSave,
    handleCreate,
    addProductToCart,
  };
};
