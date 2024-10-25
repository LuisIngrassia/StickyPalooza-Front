import React, { useState } from 'react';
import api from '../../api/Api';
import { useNavigate } from 'react-router-dom';

const ConvertToBill = ({ orderId, onConvert }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleConvert = async () => {
        try {
            const response = await api.post(`/bills/convertOrderToBill/${orderId}?paymentMethod=${paymentMethod}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onConvert(response.data);
            navigate('/bill');
        } catch (err) {
            console.error('Error converting order to bill:', err);
        }
    };

    return (
        <div>
            <select 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                className="h-10 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white"
            >
                <option value="">Seleccionar Método de Pago</option>
                <option value="MERCADO_PAGO">Mercado Pago</option>
                <option value="TRANSFERENCIA">Transferencia</option>
                <option value="TARJETA_DEBITO">Tarjeta de Débito</option>
                <option value="TARJETA_CREDITO">Tarjeta de Crédito</option>
            </select>
            <button 
                onClick={handleConvert} 
                className="bg-violet-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-violet-700 ml-4"
                disabled={!paymentMethod}
            >
                Convertir Orden a Factura
            </button>
        </div>
    );
};

export default ConvertToBill;
