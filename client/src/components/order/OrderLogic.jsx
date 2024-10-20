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
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data);
            } else if (userId) {
                const response = await api.get(`/orders/ordersFromUser/${userId}`, {
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

    // New function to fetch orders for a specific user
    const fetchOrdersByUserId = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get(`/orders/ordersFromUser/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrders(response.data);
        } catch (err) {
            console.error('Error fetching orders by user ID:', err);
            setError('Failed to fetch orders');
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

    const saveOrder = async (order, orderData) => {
        setLoading(true);
        setError(null);

        try {
            const response = order 
                ? await api.put(`/orders/${order.id}`, orderData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                : await api.post('/orders', orderData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            setOrders((prevOrders) => {
                const updatedOrders = prevOrders.filter(o => o.id !== response.data.id);
                return [...updatedOrders, response.data];
            });
        } catch (err) {
            console.error('Error saving order:', err);
            setError('Failed to save order');
        } finally {
            setLoading(false);
        }
    };

    // New function to handle search input change
    const handleSearchChange = (e) => {
        setSearchUserId(e.target.value);
    };

    // New function to handle search
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
        saveOrder,
        searchUserId,
        handleSearchChange,
        handleSearch,
    };
};
