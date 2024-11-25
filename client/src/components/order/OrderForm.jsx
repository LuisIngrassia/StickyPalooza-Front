import React, { useState, useEffect } from 'react';
import { useOrderLogic } from '../components/order/OrderLogic';

const OrderForm = ({ order, onSave }) => {
    const [formData, setFormData] = useState({
        cartId: '',
        totalAmount: '',
    });
    const { saveOrder } = useOrderLogic();

    useEffect(() => {
        if (order) {
            setFormData({
                cartId: order.cartId || '',
                totalAmount: order.totalAmount || '',
            });
        }
    }, [order]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveOrder(order, formData);
        onSave();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-400">{order ? 'Update' : 'Create'} Order</h2>
            <div className="mb-4">
                <label className="block text-white mb-1">Cart ID:</label>
                <input
                    type="text"
                    name="cartId"
                    value={formData.cartId}
                    onChange={handleChange}
                    required
                    className="border rounded-md p-2 border-purple-600 bg-gray-700 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-white mb-1">Total Quantity:</label>
                <input
                    type="number"
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    required
                    className="border rounded-md p-2 border-purple-600 bg-gray-700 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200 w-full"
                />
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition duration-200">
                {order ? 'Actualizar' : 'Crear'} Order
            </button>
        </form>
    );
};

export default OrderForm;
