import React from 'react';
import api from '../../api/Api';

const ConvertToOrder = ({ cartId, onConvert }) => {
    const handleConvert = async () => {
        try {
            const response = await api.post(`/orders/fromCart/${cartId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            onConvert(response.data);
            window.location.reload();
        } catch (err) {
            console.error('Error converting cart to order:', err);
        }
    };

    return (
        <button onClick={handleConvert} className="w-full h-10 bg-purple-800 rounded-md hover:bg-purple-900 transition duration-200">
            Convert Cart to Order
        </button>
    );
};

export default ConvertToOrder;
