import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Footer from "../../components/general/Footer";
import { useOrderLogic } from '../../components/order/OrderLogic';
import ConvertToBill from '../../components/bill/ConvertToBill';

const Order = () => {
    const { orders: initialOrders, loading, error, deleteOrder, searchUserId, handleSearchChange, handleSearch } = useOrderLogic();
    const [orders, setOrders] = useState(initialOrders); // Initialize orders state
    const [convertingOrderId, setConvertingOrderId] = useState(null);

    useEffect(() => {
        setOrders(initialOrders); // Update orders state when initialOrders changes
    }, [initialOrders]);

    if (loading) return <div className="text-green-300">Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    const handleConversion = (updatedOrder) => {
        // Update your orders state to reflect the converted order
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.id === updatedOrder.id ? updatedOrder : order
            )
        );
        setConvertingOrderId(null); // Reset the converting order state
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Back to home arrow */}
                <div className="flex items-center mb-4">
                    <Link to="/" className="flex items-center text-green-400 hover:text-green-300 transition">
                        <ArrowLeftIcon className="h-6 w-6 mr-2" /> {/* Arrow icon with some margin */}
                        Back to home
                    </Link>
                </div>

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
                    {orders.map(order => (
                        <div key={order.id} className="border border-gray-700 p-6 rounded-lg bg-gray-800 shadow-md transition duration-200 hover:shadow-lg w-4/5">
                            <h2 className="font-bold text-purple-300 mb-2">Order ID: {order.id} | Date: {new Date(order.orderDate).toLocaleDateString()}</h2>
                            
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
                                        {order.orderProducts.map(product => (
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

                            {/* Conditionally render Convert to Bill component */}
                            {!order.convertedToBill && (
                                <div className="flex justify-center mt-4">
                                    {convertingOrderId === order.id ? (
                                        <ConvertToBill orderId={order.id} onConvert={handleConversion} />
                                    ) : (
                                        <button
                                            onClick={() => setConvertingOrderId(order.id)} // Set the order to convert
                                            className="bg-green-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-green-500"
                                        >
                                            Convert to Bill
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Conditional rendering for delete button */}
                            <div className="flex justify-center mt-4">
                                {order.convertedToBill ? (
                                    <p className="text-red-500">Sealed</p> 
                                ) : (
                                    <button
                                        onClick={() => deleteOrder(order.id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-red-500"
                                    >
                                        Delete Order
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Order;
