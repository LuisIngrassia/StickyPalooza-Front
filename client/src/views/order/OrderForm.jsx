import React, { useState, useEffect } from 'react';
import api from '../../api/Api.js';

const OrderForm = ({ order, onSave }) => {
  const [formData, setFormData] = useState({
    cartId: '',
    totalAmount: '',
  });

  useEffect(() => {
    if (order) {
      setFormData({
        cartId: order.cartId || '',
        totalAmount: order.totalAmount || '',
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let response;
      if (order) {
        // PUT request to update order
        response = await api.put(`/orders/${order.id}`, formData);
      } else {
        // POST request to create new order
        response = await api.post('/orders', formData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Cart ID:</label>
        <input
          type="text"
          name="cartId"
          value={formData.cartId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Total Amount:</label>
        <input
          type="number"
          name="totalAmount"
          value={formData.totalAmount}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{order ? 'Update' : 'Create'} Order</button>
    </form>
  );
};

export default OrderForm;
