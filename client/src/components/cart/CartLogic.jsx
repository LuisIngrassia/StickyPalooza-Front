// components/CartLogic.jsx
import { useState, useEffect } from 'react';
import api from '../../api/Api';

export const useCartLogic = (userId = 1) => {
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(null);

  const fetchCart = async () => {
    try {
      const response = await api.get(`/carts/${cartId}/${userId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      await api.post('/carts/addProduct', { cartId, productId, quantity });
      fetchCart(); // Refresh the cart after adding a product
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleDeleteCart = async () => {
    try {
      await api.delete(`/carts/${cartId}`);
      setCart(null); // Clear cart if deleted
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [cartId]);

  return {
    cart,
    setCartId,
    fetchCart,
    addToCart,
    handleDeleteCart,
  };
};
