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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Cart ID:</label>
                <input
                    type="text"
                    name="cartId"
                    value={formData.cartId}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Total Amount:</label>
                <input
                    type="number"
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">{order ? 'Update' : 'Create'} Order</button>
        </form>
    );
};

export default OrderForm;
