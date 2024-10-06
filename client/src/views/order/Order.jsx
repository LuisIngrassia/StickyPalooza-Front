import React from 'react';
import { useOrderLogic } from '../../components/order/OrderLogic';

const Order = () => {
  const { orders, deleteOrder } = useOrderLogic();

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
