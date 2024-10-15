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
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error?.response?.data || error.message);
      }
    };

    fetchProducts();
  }, [token]);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/products?search=${encodeURIComponent(searchTerm)}`, {
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
  };
};
