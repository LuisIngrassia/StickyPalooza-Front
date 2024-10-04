import React, { useState, useEffect } from 'react';
import api from '../../api/Api.js';

const Bill = () => {
  const [bills, setBills] = useState([]);
  const [orderId, setOrderId] = useState(''); // Will link to an order to generate a bill
  const [paymentMethod, setPaymentMethod] = useState('');

  const fetchBills = async () => {
    try {
      const response = await api.get('/bills');
      setBills(response.data);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  const convertOrderToBill = async () => {
    try {
      const response = await api.post(`/bills/convertOrderToBill/${orderId}`, {
        paymentMethod,
      });
      setBills((prevBills) => [...prevBills, response.data]);
    } catch (error) {
      console.error('Error creating bill:', error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <div>
      <h1>Bills</h1>
      <ul>
        {bills.map((bill) => (
          <li key={bill.id}>
            Bill ID: {bill.id} - Total: ${bill.totalAmount}
          </li>
        ))}
      </ul>
      <div>
        <h2>Create Bill</h2>
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Payment Method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <button onClick={convertOrderToBill}>Convert Order to Bill</button>
      </div>
    </div>
  );
};

export default Bill;
