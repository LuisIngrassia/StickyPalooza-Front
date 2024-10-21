import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Footer from "../../components/general/Footer"; 
import { useBillLogic } from '../../components/bill/BillLogic';

const Bill = () => {
    const { bills, loading, error, markBillAsPaid, searchUserId, handleSearchChange, handleSearch } = useBillLogic();

    if (loading) return <div className="text-green-300">Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    const userRole = localStorage.getItem('role'); 

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 p-6">
            <div className="flex items-center mb-4 mt-2 ml-2">
                <Link to="/" className="flex items-center text-green-400 hover:text-green-300 transition">
                    <ArrowLeftIcon className="h-6 w-6 mr-2" />
                    Back to home
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-6 text-green-400 text-center">
                {userRole === 'ADMIN' ? 'Bills' : 'Your Bills'}
            </h1>

            {userRole === 'ADMIN' && (
                <div className="mb-6 text-center">
                    <input
                        type="text"
                        value={searchUserId}
                        onChange={handleSearchChange}
                        placeholder="Enter User ID"
                        className="border rounded-md p-2 border-purple-600 bg-gray-700 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200"
                    />
                    <button onClick={handleSearch} className="bg-purple-600 text-white px-4 py-2 rounded-md ml-2 transition duration-200 hover:bg-purple-500">
                        Search Bills
                    </button>
                </div>
            )}

            <div className="flex flex-col items-center space-y-4 flex-grow">
                {bills.map(bill => (
                    <div key={bill.id} className="border border-gray-700 p-6 rounded-lg bg-gray-800 shadow-md transition duration-200 hover:shadow-lg w-full max-w-2xl"> 
                        <h2 className="font-bold text-purple-300 mb-2">
                            Bill ID: {bill.id} | Order ID: {bill.orderId} | Date: {new Date(bill.billDate).toLocaleDateString()}
                        </h2>
                        <p className="text-green-300 mb-2">Total Amount: ${bill.totalAmount.toFixed(2)}</p>
                        <p className="text-green-300 mb-2">Payment Method: {bill.paymentMethod}</p>
                        <p className={`font-bold ${bill.paid ? 'text-green-400' : 'text-red-400'}`}>
                            Status: {bill.paid ? 'Paid' : 'Pending'}
                        </p>

                        <h3 className="font-semibold text-green-300 mt-4 mb-2">Products:</h3>
                        <table className="table-auto w-full text-gray-400 mb-4">
                            <thead>
                                <tr className="border-b border-gray-600">
                                    <th className="px-4 py-2 text-left">Product Name</th>
                                    <th className="px-4 py-2 text-left">Quantity</th>
                                    <th className="px-4 py-2 text-left">Unit Price</th>
                                    <th className="px-4 py-2 text-left">Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bill.cartProducts.map(product => (
                                    <tr key={product.id} className="border-b border-gray-600">
                                        <td className="px-4 py-2">{product.productName}</td>
                                        <td className="px-4 py-2">{product.quantity}</td>
                                        <td className="px-4 py-2">${product.productPrice.toFixed(2)}</td>
                                        <td className="px-4 py-2">${(product.productPrice * product.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {!bill.paid && (
                            <div className="flex justify-center mt-4">
                                <button 
                                    onClick={() => markBillAsPaid(bill.id)} 
                                    className="bg-green-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-green-500"
                                >
                                    Mark as Paid
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <Footer /> 
        </div>
    );
};

export default Bill;
