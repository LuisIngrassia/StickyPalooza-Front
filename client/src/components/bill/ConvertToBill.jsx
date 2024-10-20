import React, { useState } from 'react';
import api from '../../api/Api';

const ConvertToBill = ({ orderId, onConvert }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const token = localStorage.getItem('token');

    const handleConvert = async () => {
        
        console.log(orderId)

        try {
            const response = await api.post(`/bills/convertOrderToBill/${orderId}?paymentMethod=${paymentMethod}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onConvert(response.data);
            console.log(response.data);
            window.location.reload();
        } catch (err) {
            console.error('Error converting order to bill:', err);
        }
    };

    return (
        <div>
            <h3 className="text-green-300 mb-2">Converting Order ID: {orderId}</h3>
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
                disabled={!paymentMethod}
            >
                Convert Order to Bill
            </button>
        </div>
    );
};


export default ConvertToBill;
