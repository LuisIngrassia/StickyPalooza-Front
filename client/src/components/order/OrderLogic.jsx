import { useEffect, useState } from 'react';
import api from '../../api/Api';

export const useOrderLogic = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('userId');

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);

        try {
            if (userId) {
                const response = await api.get(`/orders/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data);
            } else {
                const response = await api.get('/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data);
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [userId]);

    const deleteOrder = async (orderId) => {
        setLoading(true);
        setError(null);

        try {
            await api.delete(`/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
        } catch (err) {
            console.error('Error deleting order:', err);
            setError('Failed to delete order');
        } finally {
            setLoading(false);
        }
    };

    return {
        orders,
        loading,
        error,
        deleteOrder,
    };
};
