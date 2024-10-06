import React, { useState } from 'react';
import { useCartLogic } from '../../components/cart/CartLogic';

const Cart = () => {
  const userId = 1; // Assuming logged-in user's ID is 1 for demo purposes
  const { cart, setCartId, handleDeleteCart } = useCartLogic(userId);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <input
        type="text"
        placeholder="Enter Cart ID"
        onChange={(e) => setCartId(e.target.value)}
      />
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
