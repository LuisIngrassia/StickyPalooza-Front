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

    // Function to fetch orders (for Admins and Users)
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

    // Function to fetch orders for a specific user by ID (Admin)
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

    // Function to create an order from a cart (User)
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

    // Effect to automatically fetch orders on load based on role
    useEffect(() => {
        fetchOrders();
    }, [userId, userRole]);

    // Function to delete an order
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

    // Handle input change for search bar
    const handleSearchChange = (e) => {
        setSearchUserId(e.target.value);
    };

    // Trigger search for a specific user's orders (Admin)
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
        createOrderFromCart, // Added new method
        searchUserId,
        handleSearchChange,
        handleSearch,
    };
};
