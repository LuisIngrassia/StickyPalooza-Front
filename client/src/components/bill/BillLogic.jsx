import { useEffect, useState } from 'react';
import api from '../../api/Api';

export const useBillLogic = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchUserId, setSearchUserId] = useState('');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('role');

    const fetchBills = async () => {
        setLoading(true);
        setError(null);
        try {
            if (userRole === 'ADMIN') {
                const response = await api.get('/bills', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBills(response.data);
            } else if (userId) {
                const response = await api.get(`/bills/billsFromUser/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
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
            await api.patch(`/bills/${billId}/markPaid`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBills((prevBills) => prevBills.map(bill => 
                bill.id === billId ? { ...bill, paid: true } : bill
            ));
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
            fetchBillsByUserId(searchUserId);
        }
    };

    useEffect(() => {
        fetchBills();
    }, [userId, userRole]);

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
