import { useState, useEffect } from 'react';
import api from '../../api/Api';

export const useCartLogic = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); 
  const userId = localStorage.getItem('userId');

  const fetchCart = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/carts/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setCart(response.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const addProductToCart = async (productId, quantity) => {
    const cartId = cart.id;

    try {
      await api.post('/carts/addProduct', {
        cartId: cartId,
        productId: productId,
        quantity: quantity,
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

  const handleDeleteCart = async () => {
    const cartId = cart.id;

    if (!cartId) {
      setError('No cart to delete');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await api.delete(`/carts/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setCart(null);
    } catch (err) {
      console.error('Error deleting cart:', err);
      setError('Failed to delete cart: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  const removeProductFromCart = async (productId) => {
    const cartId = cart?.id;

    if (!cartId || !productId) {
      setError('No cart or product to remove');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await api.delete(`/carts/${cartId}/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      await fetchCart(); 
    } catch (err) {
      console.error('Error removing product:', err);
      setError('Failed to remove product: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalCost = () => {
    if (!cart || !cart.cartProducts) return 0;

    return cart.cartProducts.reduce((total, product) => {
      return total + product.productPrice * product.quantity;
    }, 0);
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  return {
    cart,
    loading,
    error,
    addProductToCart,
    handleDeleteCart,
    removeProductFromCart,
    calculateTotalCost,
  };
};
