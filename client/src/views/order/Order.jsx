import React from 'react';
import { useOrderLogic } from '../../components/order/OrderLogic';

const Order = () => {
    const { orders, loading, error, deleteOrder, searchUserId, handleSearchChange, handleSearch } = useOrderLogic();

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

            {/* Search Bar for Admins */}
            {localStorage.getItem('role') === 'ADMIN' && (
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchUserId}
                        onChange={handleSearchChange}
                        placeholder="Enter User ID"
                        className="border rounded-md p-2"
                    />
                    <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded-md ml-2">
                        Search Orders
                    </button>
                </div>
            )}

            <ul className="space-y-4">
                {orders.map(order => (
                    <li key={order.id} className="border p-4 rounded-lg">
                        <h2 className="font-bold">Order ID: {order.id}</h2>
                        <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                        <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
                        <div className="mt-2">
                            <h3 className="font-semibold">Products:</h3>
                            <ul>
                                {Object.entries(order.productQuantities).map(([productId, quantity]) => (
                                    <li key={productId}>
                                        Product ID: {productId}, Quantity: {quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={() => deleteOrder(order.id)} className="bg-red-600 text-white mt-2 px-4 py-2 rounded-md">
                            Delete Order
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Order;
