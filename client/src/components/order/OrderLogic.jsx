import { useState, useEffect } from 'react';
import api from '../../api/Api';

export const useOrderLogic = () => {
  
  const [orders, setOrders] = useState([]);
  const [userId] = useState(1); // Assuming user ID 1 for demo

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
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

  const saveOrder = async (order, formData) => {
    try {
      if (order) {
        // PUT request to update an order
        await api.put(`/orders/${order.id}`, formData);
      } else {
        // POST request to create a new order
        await api.post('/orders', formData);
      }
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    fetchOrders,
    createOrderFromCart,
    deleteOrder,
    saveOrder,
  };
};
