import { useState, useEffect } from 'react';
import api from '../../api/Api';

export const useProductLogic = () => {

  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

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

    console.log(userId)
    
    const cartId = await fetchCart();

    console.log('cartId = ' + cartId);

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
      
    } catch (err) {
      console.error('Error adding product:', err);
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
