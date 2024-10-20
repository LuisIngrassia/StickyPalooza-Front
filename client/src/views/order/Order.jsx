import React, { useState, useEffect } from 'react';
import { useOrderLogic } from '../../components/order/OrderLogic';
import ConvertToBill from '../../components/bill/ConvertToBill';

const Order = () => {
    const { orders, loading, error, deleteOrder, searchUserId, handleSearchChange, handleSearch } = useOrderLogic();
    const [convertingOrderId, setConvertingOrderId] = useState(null); // Manage converting order state

    useEffect(() => {
        if (error) {
            console.error('Error fetching orders:', error);
        }
    }, [error]);

    if (loading) return <div className="text-green-300">Loading...</div>;

    const handleConversion = (updatedOrder) => {
        setConvertingOrderId(null); // Reset the converting order state
        // Logic to update orders state if needed
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <h1 className="text-3xl font-bold mb-6 text-green-400 text-center">Your Orders</h1>

            {/* Search Bar for Admins */}
            {localStorage.getItem('role') === 'ADMIN' && (
                <div className="mb-6 text-center">
                    <input
                        type="text"
                        value={searchUserId}
                        onChange={handleSearchChange}
                        placeholder="Enter User ID"
                        className="border rounded-md p-2 border-purple-600 bg-gray-700 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200"
                    />
                    <button onClick={handleSearch} className="bg-purple-600 text-white px-4 py-2 rounded-md ml-2 transition duration-200 hover:bg-purple-500">
                        Search Orders
                    </button>
                </div>
            )}

            {/* Order List */}
            <div className="flex flex-col items-center space-y-4">
                {orders.map(order => {
                    return (
                        <div key={order.id} className="border border-gray-700 p-6 rounded-lg bg-gray-800 shadow-md transition duration-200 hover:shadow-lg w-3/5">
                            <h2 className="font-bold text-purple-300 mb-2">Order ID: {order.id} | Date: {new Date(order.orderDate).toLocaleDateString()}</h2>
                            
                            <p className="text-gray-400">Converted to Bill: {order.convertedToBill ? 'Yes' : 'No'}</p>

                            <div className="mt-2">
                                <h3 className="font-semibold text-green-300 mb-2">Products:</h3>
                                <table className="table-auto w-full text-gray-400">
                                    <thead>
                                        <tr className="border-b border-gray-600">
                                            <th className="px-4 py-2 text-left">Product Name</th>
                                            <th className="px-4 py-2 text-left">Quantity</th>
                                            <th className="px-4 py-2 text-left">Unit Price</th>
                                            <th className="px-4 py-2 text-left">Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.orderProducts && order.orderProducts.map(product => (
                                            <tr key={product.productId} className="border-b border-gray-600">
                                                <td className="px-4 py-2">{product.productName}</td>
                                                <td className="px-4 py-2">{product.quantity}</td>
                                                <td className="px-4 py-2">${product.productPrice.toFixed(2)}</td>
                                                <td className="px-4 py-2">${(product.productPrice * product.quantity).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-center mt-4">
                                <p className="font-bold text-purple-400 mb-4">Total Amount: ${order.totalAmount.toFixed(2)}</p>
                            </div>

                            {order.convertedToBill ? (
                                <div className="flex justify-center mt-4">
                                    <p className="text-red-500 font-bold">Sealed</p>
                                </div>
                            ) : (
                                <div>
                                    {convertingOrderId === order.id ? (
                                        <ConvertToBill orderId={order.id} onConvert={handleConversion} />
                                    ) : (
                                        <div className="flex justify-center mt-4">
                                            <button
                                                onClick={() => setConvertingOrderId(order.id)}
                                                className="bg-green-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-green-500"
                                                disabled={order.convertedToBill}
                                            >
                                                Convert to Bill
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {!order.convertedToBill && (
                                <div className="flex justify-center mt-4">
                                    <button
                                        onClick={() => deleteOrder(order.id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-red-500"
                                    >
                                        Delete Order
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Order;
