import { useEffect, useState } from 'react';
import api from '../../api/Api';

export const useOrderLogic = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchUserId, setSearchUserId] = useState('');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('role');

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            if (userRole === 'ADMIN') {
                const response = await api.get('/orders', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(response.data);
            } else if (userId) {
                const response = await api.get(`/orders/ordersFromUser/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
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

    const fetchOrdersByUserId = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/orders/ordersFromUser/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(response.data);
        } catch (err) {
            console.error('Error fetching orders by user ID:', err);
            setError('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const createOrderFromCart = async (cartId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post(`/orders/fromCart/${cartId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders((prevOrders) => [...prevOrders, response.data]);
        } catch (err) {
            console.error('Error creating order from cart:', err);
            setError('Failed to create order');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [userId, userRole]);

    const deleteOrder = async (orderId) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
        } catch (err) {
            console.error('Error deleting order:', err);
            setError('Failed to delete order');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchUserId(e.target.value);
    };

    const handleSearch = () => {
        if (searchUserId) {
            fetchOrdersByUserId(searchUserId);
        }
    };

    return {
        orders,
        loading,
        error,
        deleteOrder,
        createOrderFromCart,
        searchUserId,
        handleSearchChange,
        handleSearch,
    };
};
