import React, { useState, useEffect } from 'react';
import api from '../../api/Api.js';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [userId] = useState(1); // Assuming logged-in user's ID is 1 for demo purposes
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

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart ? (
        <div>
          <ul>
            {Object.keys(cart.productQuantities).map((productId) => (
              <li key={productId}>
                Product ID: {productId} - Quantity: {cart.productQuantities[productId]}
              </li>
            ))}
          </ul>
          <button onClick={handleDeleteCart}>Delete Cart</button>
        </div>
      ) : (
        <p>No cart available.</p>
      )}
    </div>
  );
};

export default Cart;
