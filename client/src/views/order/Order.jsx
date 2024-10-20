import React from 'react';
import { useOrderLogic } from '../../components/order/OrderLogic';

const Order = () => {
    const { orders, loading, error, deleteOrder, searchUserId, handleSearchChange, handleSearch } = useOrderLogic();

    if (loading) return <div className="text-green-300">Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-green-400">Your Orders</h1>

            {/* Search Bar for Admins */}
            {localStorage.getItem('role') === 'ADMIN' && (
                <div className="mb-6">
                    <input
                        type="text"
                        value={searchUserId}
                        onChange={handleSearchChange}
                        placeholder="Enter User ID"
                        className="border rounded-md p-2 border-purple-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200"
                    />
                    <button onClick={handleSearch} className="bg-purple-600 text-white px-4 py-2 rounded-md ml-2 transition duration-200 hover:bg-purple-500">
                        Search Orders
                    </button>
                </div>
            )}

            <ul className="space-y-4">
                {orders.map(order => (
                    <li key={order.id} className="border border-gray-700 p-4 rounded-lg bg-gray-800 shadow-md transition duration-200 hover:shadow-lg">
                        <h2 className="font-bold text-purple-300">Order ID: {order.id}</h2>
                        <p className="text-green-300">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                        <p className="font-bold text-purple-400">Total Amount: ${order.totalAmount.toFixed(2)}</p>
                        <div className="mt-2">
                            <h3 className="font-semibold text-green-300">Products:</h3>
                            <ul>
                                {Object.entries(order.productQuantities).map(([productId, quantity]) => (
                                    <li key={productId} className="text-gray-400">
                                        Product ID: {productId}, Quantity: {quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={() => deleteOrder(order.id)} className="bg-red-600 text-white mt-2 px-4 py-2 rounded-md transition duration-200 hover:bg-red-500">
                            Delete Order
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Order;
