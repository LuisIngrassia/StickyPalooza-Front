import React, { useEffect } from 'react';
import { useCartLogic } from '../../components/cart/CartLogic'; 

const Cart = () => {
  const {
    cart,
    loading,
    error,
    fetchCart,
    addToCart,
    handleDeleteCart,
    setCartId,
  } = useCartLogic();

  useEffect(() => {
    const storedCartId = localStorage.getItem('cartId');
    if (storedCartId) {
      setCartId(storedCartId);
    } else {
      fetchCart(); 
    }
  }, [setCartId, fetchCart]);

  const handleAddToCart = (productId, quantity) => {
    addToCart(productId, quantity);
  };

  const handleDeleteCartClick = () => {
    handleDeleteCart();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart ? (
        <div>
          <ul>
            {cart.products.map((product) => (
              <li key={product.id}>
                <span>{product.name}</span>
                <span>Quantity: {product.quantity}</span>
              </li>
            ))}
          </ul>
          <button onClick={handleDeleteCartClick} className="delete-cart-btn">
            Delete Cart
          </button>
        </div>
      ) : (
        <div>No items in your cart.</div>
      )}
    </div>
  );
};

export default Cart;
