import React, { useState } from 'react';
import { useCartLogic } from '../../components/cart/CartLogic';

const Cart = () => {
  const {
    cart,
    loading,
    error,
    addProductToCart,
    handleDeleteCart,
  } = useCartLogic();

  const handleAddToCart = (productId, quantity) => {
    addProductToCart(productId, quantity);
  };

  const handleDeleteCartClick = () => {
    handleDeleteCart();
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="mx-auto max-w-md space-y-6 mt-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-3xl font-bold text-center">Your Cart</h2>
        {cart && cart.cartProducts && cart.cartProducts.length > 0 ? (
          <div className="space-y-4">
            <ul className="space-y-2">
              {cart.cartProducts.map(product => (
                <li key={product.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-md">
                  <img src={product.productImage} alt={product.productName} className="w-16 h-16 object-cover rounded-md" />
                  <div className="flex-1 mx-4">
                    <h3 className="font-bold">{product.productName}</h3>
                    <br />
                    <p>Price: ${product.productPrice.toFixed(2)}</p>
                    <br />
                    <p>Amount: {product.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAddToCart(product.productId, product.quantity + 1)}
                      className="bg-primary text-white rounded-md px-3 py-1 hover:bg-blue-500"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => handleAddToCart(product.productId, -1)}
                      className="bg-primary text-white rounded-md px-3 py-1 hover:bg-blue-500"
                    >
                      Substract
                    </button>
                    <button
                      onClick={() => handleDeleteCartClick(product.productId)}
                      className="bg-red-600 text-white rounded-md px-3 py-1 hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={handleDeleteCartClick}
              className="w-full h-10 bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
            >
              Delete Entire Cart
            </button>
          </div>
        ) : (
          <div className="text-center">No items in your cart.</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
