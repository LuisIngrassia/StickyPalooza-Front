import React from 'react';
import { useBillLogic } from '../../components/bill/BillLogic';

const Bill = () => {
  const {
    bills,
    orderId,
    paymentMethod,
    setOrderId,
    setPaymentMethod,
    convertOrderToBill,
  } = useBillLogic();

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
