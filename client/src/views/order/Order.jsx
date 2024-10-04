import React, { useState, useEffect } from 'react';
import api from '../../api/Api.js';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [userId] = useState(1); 

  const fetchOrders = async () => {
    try {
      const response = await api.get(`/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const createOrderFromCart = async (cartId) => {
    try {
      const response = await api.post(`/orders/fromCart/${cartId}`);
      setOrders((prevOrders) => [...prevOrders, response.data]);
    } catch (error) {
      console.error('Error creating order from cart:', error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await api.delete(`/orders/${id}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order ID: {order.id} - Total Amount: ${order.totalAmount}
            <button onClick={() => deleteOrder(order.id)}>Delete Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
