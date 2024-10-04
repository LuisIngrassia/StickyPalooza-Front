import React, { useState, useEffect } from 'react';
import api from '../../api/Api.js';

const BillForm = ({ bill, onSave }) => {
  const [formData, setFormData] = useState({
    orderId: '',
    totalAmount: '',
    paymentMethod: '',
  });

  useEffect(() => {
    if (bill) {
      setFormData({
        orderId: bill.orderId || '',
        totalAmount: bill.totalAmount || '',
        paymentMethod: bill.paymentMethod || '',
      });
    }
  }, [bill]);

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
      if (bill) {
        // PUT request to update bill
        response = await api.put(`/bills/${bill.id}`, formData);
      } else {
        // POST request to create new bill
        response = await api.post('/bills', formData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving bill:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Order ID:</label>
        <input
          type="text"
          name="orderId"
          value={formData.orderId}
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
      <div>
        <label>Payment Method:</label>
        <input
          type="text"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{bill ? 'Update' : 'Create'} Bill</button>
    </form>
  );
};

export default BillForm;
