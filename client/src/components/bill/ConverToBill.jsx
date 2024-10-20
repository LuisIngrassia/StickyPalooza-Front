import React, { useState } from 'react';
import api from '../../api/Api';

const ConvertToBill = ({ cartId, onConvert }) => {
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleConvert = async () => {
        try {
            const response = await api.post(`/bills/fromCart/${cartId}`, { paymentMethod }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            onConvert(response.data);
            window.location.reload();
        } catch (err) {
            console.error('Error converting cart to bill:', err);
        }
    };

    return (
        <div>
            <select 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                className="border rounded-md p-2 mb-4"
            >
                <option value="">Select Payment Method</option>
                <option value="MERCADO_PAGO">Mercado Pago</option>
                <option value="TRANSFERENCIA">Transferencia</option>
                <option value="TARJETA_DEBITO">Tarjeta de Débito</option>
                <option value="TARJETA_CREDITO">Tarjeta de Crédito</option>
            </select>
            <button 
                onClick={handleConvert} 
                className="w-full h-10 bg-purple-800 rounded-md hover:bg-purple-900 transition duration-200"
            >
                Convert Cart to Bill
            </button>
        </div>
    );
};

export default ConvertToBill;
