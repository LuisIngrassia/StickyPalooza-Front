import { useEffect, useState } from 'react';
import api from '../../api/Api';

export const useBillLogic = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchUserId, setSearchUserId] = useState('');
    const [billMarkedAsPaid, setBillMarkedAsPaid] = useState(false); // State to track if a bill has been marked as paid
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('role');

    const fetchBills = async (userIdToSearch = null) => {
        setLoading(true);
        setError(null);
        try {
            let response;
            if (userRole === 'ADMIN' && !userIdToSearch) {
                response = await api.get('/bills', {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else if (userIdToSearch) {
                response = await api.get(`/bills/billsFromUser/${userIdToSearch}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else if (userId) {
                response = await api.get(`/bills/billsFromUser/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            if (response) {
                setBills(response.data);
            }
        } catch (err) {
            console.error('Error fetching bills:', err);
            setError('Failed to fetch bills');
        } finally {
            setLoading(false);
        }
    };

    const markBillAsPaid = async (billId) => {
        setLoading(true);
        setError(null);
        try {
            await api.post(`/bills/markAsPaid/${billId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBillMarkedAsPaid(true);
        } catch (err) {
            console.error('Error marking bill as paid:', err);
            setError('Failed to mark bill as paid');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchUserId(e.target.value);
    };

    const handleSearch = () => {
        if (searchUserId) {
            fetchBills(searchUserId);
        }
    };

    useEffect(() => {
        fetchBills();
    }, [userId, userRole]);

    useEffect(() => {
        if (billMarkedAsPaid) {
            fetchBills();
            setBillMarkedAsPaid(false); 
        }
    }, [billMarkedAsPaid]);

    return {
        bills,
        loading,
        error,
        markBillAsPaid,
        searchUserId,
        handleSearchChange,
        handleSearch,
    };
};
