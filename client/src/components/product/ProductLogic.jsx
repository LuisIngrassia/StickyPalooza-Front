import { useState, useEffect } from 'react';
import api from '../../api/Api';

export const useProductLogic = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [productAdded, setProductAdded] = useState(false); // New state to track product addition

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  useEffect(() => {
    if (productAdded) {
      fetchProducts();
      setProductAdded(false);
    }
  }, [productAdded]);

  const handlePriceFilter = async () => {
    if (minPrice === '' || maxPrice === '') {
      return;
    }
    try {
      const response = await api.get(`/products/byPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products by price:', error);
    }
  };

  const handleCategoryFilter = async () => {
    if (selectedCategory === '') {
      return;
    }
    try {
      const response = await api.get(`/products/byCategory?categoryId=${selectedCategory}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };

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
    setEditingProduct(product);
  };

  const handleCreate = () => {
    setEditingProduct({});
  };

  const handleSave = async () => {
    try {
      const response = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error reloading products:', error?.response?.data || error.message);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await api.get(`/carts/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      const cartId = response.data.id;

      return cartId;
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const addProductToCart = async (productId, quantity) => {
    const cartId = await fetchCart();

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
      
      setProductAdded(true);

    } catch (err) {
      console.error('Error adding product:', err);
    } 
  };

  return {
    products,
    searchTerm,
    setSearchTerm,
    editingProduct,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    handleDelete,
    handleSearch,
    handleEdit,
    handleSave,
    handleCreate,
    addProductToCart,
    fetchProducts,
  };
};
