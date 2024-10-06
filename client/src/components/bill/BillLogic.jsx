import { useState, useEffect } from 'react';
import api from '../../api/Api';

export const useBillLogic = () => {
  const [bills, setBills] = useState([]);
  const [orderId, setOrderId] = useState('');
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

  const saveBill = async (bill, formData) => {
    try {
      if (bill) {
        // PUT request to update the bill
        await api.put(`/bills/${bill.id}`, formData);
      } else {
        // POST request to create a new bill
        await api.post('/bills', formData);
      }
    } catch (error) {
      console.error('Error saving bill:', error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return {
    bills,
    orderId,
    paymentMethod,
    setOrderId,
    setPaymentMethod,
    fetchBills,
    convertOrderToBill,
    saveBill,
  };
};
