import { useState, useEffect } from 'react';
import api from '../../api/Api'; // Make sure you import your axios instance properly

export const useCartLogic = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); 
  const userId = localStorage.getItem('userId');

  const fetchCart = async () => {
    if (!userId) return; // Ensure userId is available before fetching the cart

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

    console.log({
      cartId: cartId,
      productId: productId,
      quantity: quantity,
    });

    try {
      await api.post('/carts/addProduct', {
        cartId: cartId,
        productId: productId,
        quantity: quantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the request
        },
      });

      await fetchCart(); // Fetch the updated cart after adding the product

    } catch (err) {

      console.error('Error adding product:', err);
      setError('Error adding product: ' + (err.response?.data || err.message)); // Show specific error if available
      
    } finally {
      setLoading(false); // Reset loading state after operation
    }
  };

  const handleDeleteCart = async () => {
    const cartId = cart.id;

    if (!cartId) {
      setError('No cart to delete');
      return;
    }

    setLoading(true); // Start loading state when deleting a cart
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
      setError('Failed to delete cart: ' + (err.response?.data || err.message)); // Show specific error if available
    } finally {
      setLoading(false); // Reset loading state after operation
    }
  };

  useEffect(() => {
    fetchCart(); // Fetch the cart whenever userId changes
  }, [userId]);

  return {
    cart,
    loading,
    error,
    addProductToCart,
    handleDeleteCart,
  };
};
