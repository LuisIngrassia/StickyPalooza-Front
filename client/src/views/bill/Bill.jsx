import React from 'react';
import { useBillLogic } from '../../components/bill/BillLogic';

const Bill = () => {
    const { bills, loading, error, markBillAsPaid, searchUserId, handleSearchChange, handleSearch } = useBillLogic();

    if (loading) return <div className="text-green-300">Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <h1 className="text-3xl font-bold mb-6 text-green-400 text-center">Your Bills</h1>

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
                        Search Bills
                    </button>
                </div>
            )}

            {/* Bill List */}
            <div className="flex flex-col items-center space-y-4">
                {bills.map(bill => (
                    <div key={bill.orderId} className="border border-gray-700 p-6 rounded-lg bg-gray-800 shadow-md transition duration-200 hover:shadow-lg w-3/5">
                        <h2 className="font-bold text-purple-300 mb-2">Bill ID: {bill.id} | Date: {new Date(bill.billDate).toLocaleDateString()}</h2>
                        <p className="text-green-300 mb-2">Total Amount: ${bill.totalAmount.toFixed(2)}</p>
                        <p className="text-green-300 mb-2">Payment Method: {bill.paymentMethod}</p>
                        <p className={`font-bold ${bill.paid ? 'text-green-400' : 'text-red-400'}`}>Status: {bill.paid ? 'Paid' : 'Pending'}</p>

                        {/* Mark as Paid Button */}
                        {!bill.paid && (
                            <div className="flex justify-center mt-4">
                                <button 
                                    onClick={() => markBillAsPaid(bill.orderId)} 
                                    className="bg-green-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-green-500"
                                >
                                    Mark as Paid
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bill;
