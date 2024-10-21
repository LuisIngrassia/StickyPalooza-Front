import React from 'react';
import { useCartLogic } from '../../components/cart/CartLogic';
import ConvertToOrder from '../../components/order/ConvertToOrder';
import { useNavigate } from 'react-router-dom'; 
import { ArrowLeftIcon, PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/solid'; // Importing the icons
import Footer from "../../components/general/Footer";

const Cart = () => {
  const {
    cart,
    loading,
    error,
    addProductToCart,
    handleDeleteCart,
    calculateTotalCost,
    removeProductFromCart,
  } = useCartLogic();

  const handleAddToCart = (productId, quantity) => {
    addProductToCart(productId, quantity);
  };

  const handleRemoveFromCart = (productId) => {
    removeProductFromCart(productId);
  };

  const handleDeleteCartClick = () => {
    handleDeleteCart();
  };

  const navigate = useNavigate();

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white flex flex-col items-center justify-center"> 

      <button
        className="absolute top-4 left-4 flex items-center text-green-400 hover:text-green-300 transition"
        onClick={() => navigate('/')}
      >
        <ArrowLeftIcon className="h-6 w-6 mr-2" />
        Back to Home
      </button>
      
      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg p-6 mb-6"> 
        <h2 className="text-3xl font-bold text-center text-green-400 mb-6">Your Cart</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        
        {cart && cart.cartProducts && cart.cartProducts.length > 0 ? (
          <>
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {cart.cartProducts.map(product => (
                  <tr key={product.productId}>
                    <td className="px-4 py-2 flex items-center">
                      <img src={product.productImage} alt={product.productName} className="w-16 h-16 object-cover rounded-md mr-2" />
                      <span className="font-bold text-green-400">{product.productName}</span>
                    </td>
                    <td className="px-4 py-2">${product.productPrice.toFixed(2)}</td>
                    <td className="px-4 py-2">{product.quantity}</td>
                    <td className="px-4 py-2">${(product.productPrice * product.quantity).toFixed(2)}</td>
                    <td className="px-4 py-2 flex flex-col items-center">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAddToCart(product.productId, 1)}
                          className="bg-green-600 text-white rounded-md p-1 hover:bg-green-500 transition duration-200"
                        >
                          <PlusIcon className="h-6 w-6" />
                        </button>
                        <button
                          onClick={() => handleAddToCart(product.productId, -1)}
                          className="bg-orange-600 text-white rounded-md p-1 hover:bg-orange-500 transition duration-200"
                        >
                          <MinusIcon className="h-6 w-6" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(product.productId)}
                        className="mt-2 bg-purple-600 text-white rounded-md p-1 hover:bg-purple-500 transition duration-200"
                      >
                        <TrashIcon className="h-6 w-16" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="text-xl font-bold text-center text-green-400 mt-6">
              Total Cost: ${calculateTotalCost().toFixed(2)}
            </h3>

            <div className="mt-4 flex justify-center">
              <ConvertToOrder
                cartId={cart.id} 
                onConvert={(order) => {
                  console.log('Order converted:', order);
                }}
                className="w-1/2 h-10 bg-red-600 text-white rounded-md hover:bg-red-500 transition duration-200" 
              >
                Convert Cart To Order
              </ConvertToOrder>
            </div>


            <div className="flex justify-center mt-4">
              <button
                onClick={handleDeleteCartClick}
                className="w-1/2 h-10 bg-red-600 text-white rounded-md hover:bg-red-500 transition duration-200"
              >
                Delete Entire Cart
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400">No items in your cart.</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
