import { useState, useEffect } from 'react';
import api from '../../api/Api';

export const useCartLogic = () => {
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(localStorage.getItem('cartId'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); 
  const userId = localStorage.getItem('userId');

  const fetchCart = async () => {
    if (!cartId || !userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/carts/${cartId}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setCart(response.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      if (err.response?.status === 404) {
        createCart();
      } else {
        setError('Failed to fetch cart');
      }
    } finally {
      setLoading(false);
    }
  };

  const createCart = async () => {
    try {
      const response = await api.post('/carts', { userId }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setCart(response.data);
      setCartId(response.data.id); 
      localStorage.setItem('cartId', response.data.id); 
    } catch (err) {
      console.error('Error creating cart:', err);
      setError('Failed to create cart');
    }
  };

  const addToCart = async (productId, quantity) => {
    if (!cartId) {
      setError('No cart available to add products to');
      return;
    }

    try {
      await api.post('/carts/addProduct', { cartId, productId, quantity }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      fetchCart();
    } catch (err) {
      console.error('Error adding product to cart:', err);
      setError('Failed to add product');
    }
  };

  const handleDeleteCart = async () => {
    if (!cartId) {
      setError('No cart to delete');
      return;
    }

    try {
      await api.delete(`/carts/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setCart(null);
      setCartId(null);
      localStorage.removeItem('cartId'); 
    } catch (err) {
      console.error('Error deleting cart:', err);
      setError('Failed to delete cart');
    }
  };

  useEffect(() => {
    if (cartId) fetchCart(); 
  }, [cartId]);

  return {
    cart,
    cartId,
    loading,
    error,
    setCartId,
    fetchCart,
    createCart,
    addToCart,
    handleDeleteCart,
  };
};
