// src/views/cart/Cart.jsx
import React from 'react';
import { useCartLogic } from '../../components/cart/CartLogic';
import ConvertToOrder from '../../components/order/ConvertToOrder'; // Import ConvertToOrder component

const Cart = () => {
  const {
    cart,
    loading,
    error,
    addProductToCart,
    handleDeleteCart,
    calculateTotalCost,
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

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="mx-auto max-w-xl space-y-6 mt-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-3xl font-bold text-center">Your Cart</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {cart && cart.cartProducts && cart.cartProducts.length > 0 ? (
          <div className="space-y-4">
            <ul className="space-y-2">
              {cart.cartProducts.map(product => (
                <li key={product.id} className="flex items-center p-4 bg-gray-700 rounded-md">
                  <div className="flex-shrink-0">
                    <img src={product.productImage} alt={product.productName} className="w-24 h-24 object-cover rounded-md mx-auto" />
                  </div>
                  <div className="flex-1 mx-4">
                    <h3 className="font-bold text-center">{product.productName}</h3>
                    <p className="text-center">Price: ${product.productPrice.toFixed(2)}</p>
                    <p className="text-center">Amount: {product.quantity}</p>
                    <p className="text-center">Total: ${(product.productPrice * product.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAddToCart(product.productId, 1)}
                      className="bg-green-500 text-white rounded-md px-3 py-1 hover:bg-green-600 transition duration-200"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => handleAddToCart(product.productId, -1)}
                      className="bg-green-500 text-white rounded-md px-3 py-1 hover:bg-green-600 transition duration-200"
                    >
                      Subtract
                    </button>
                    <button
                      onClick={() => handleDeleteCartClick(product.productId)}
                      className="bg-purple-700 text-white rounded-md px-3 py-1 hover:bg-purple-800 transition duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-bold text-center">
              Total Cost: ${calculateTotalCost().toFixed(2)}
            </h3>
            <ConvertToOrder cartId={cart.id} onConvert={(newOrder) => {
              console.log('Order created:', newOrder);
            }} />
            <button
              onClick={handleDeleteCartClick}
              className="w-full h-10 bg-purple-700 rounded-md hover:bg-purple-800 transition duration-200"
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
