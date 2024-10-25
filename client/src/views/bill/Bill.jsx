import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Footer from "../../components/general/Footer"; 
import { useBillLogic } from '../../components/bill/BillLogic';

const Bill = () => {
    const { bills, loading, error, markBillAsPaid, searchUserId, handleSearchChange, handleSearch } = useBillLogic();

    if (loading) return <div className="text-green-300">Cargando...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    const userRole = localStorage.getItem('role'); 

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 p-6">
            <div className="flex items-center mb-4 mt-2 ml-2">
                <Link to="/" className="flex items-center text-green-400 hover:text-green-300 transition">
                    <ArrowLeftIcon className="h-6 w-6 mr-2" />
                    Volver al Menú
                </Link>
            </div>

            <h1 className="text-4xl font-bold mb-8 text-green-400 text-center">
                {userRole === 'ADMIN' ? 'Bills' : 'Tus Facturas'}
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
                    <button onClick={handleSearch} className="bg-green-600 text-white px-4 py-2 rounded-md ml-2 transition duration-200 hover:bg-purple-500">
                        Buscar Factura
                    </button>
                </div>
            )}

            <div className="flex flex-col items-center space-y-4 flex-grow">
                {bills.map(bill => (
                    <div key={bill.id} className="border border-gray-700 p-6 rounded-lg bg-gray-800 shadow-md transition duration-200 hover:shadow-lg w-full max-w-2xl"> 
                        <h2 className="font-bold text-purple-300 mb-2">
                            Factura ID: {bill.id} | Orden ID: {bill.orderId} | Fecha: {new Date(bill.billDate).toLocaleDateString()}
                        </h2>
                        <p className="text-green-300 mb-2">TCantidad Total: ${bill.totalAmount.toFixed(2)}</p>
                        <p className="text-green-300 mb-2">Método de pago: {bill.paymentMethod}</p>
                        <p className={`font-bold ${bill.paid ? 'text-green-400' : 'text-red-400'}`}>
                            Status: {bill.paid ? 'Pagado' : 'Pendiente'}
                        </p>

                        <h3 className="font-semibold text-green-300 mt-4 mb-2">Productos:</h3>
                        <table className="table-auto w-full text-gray-400 mb-4">
                            <thead>
                                <tr className="border-b border-gray-600">
                                    <th className="px-4 py-2 text-left">Nombre:</th>
                                    <th className="px-4 py-2 text-left">Cantidad</th>
                                    <th className="px-4 py-2 text-left">Precio por Unidad</th>
                                    <th className="px-4 py-2 text-left">Precio Total</th>
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

                        {!bill.paid && userRole === 'USER' && (
                            <div className="flex justify-center mt-4">
                                <button 
                                    onClick={() => markBillAsPaid(bill.id)} 
                                    className="bg-violet-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-violet-700"
                                >
                                    Marcar como pagado
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
