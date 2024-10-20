import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../components/users/UsersLogic';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Footer from "../../components/general/Footer";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsers(page, 10);
      setUsers(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        alert('User deleted successfully!');
        fetchUsers(page);
      } catch (error) {
        alert('Failed to delete user.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="max-w-4xl mx-auto flex-grow p-6">
        <div className="flex items-center mb-4">
          <button
            className="flex items-center text-green-400 hover:text-green-300 transition"
            onClick={() => navigate('/')}
          >
            <ArrowLeftIcon className="h-6 w-6 mr-2" />
            Back to Home
          </button>
        </div>
        
        <h1 className="text-5xl font-bold text-center text-green-400 mb-8">Users</h1>

        {loading && <p className="text-green-300">Loading users...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-600 w-4/5">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 text-left text-green-400">Name</th>
                  <th className="px-6 py-3 border-b-2 text-center text-green-400">Email</th>
                  <th className="px-6 py-3 border-b-2 text-right text-green-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-600">
                    <td className="px-6 py-4 text-gray-300">{user.firstName} {user.lastName}</td>
                    <td className="px-6 py-4 text-center text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              disabled={page === 0}
              onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
            >
              Previous
            </button>
            <span className="mx-4 text-gray-300">Page {page + 1} of {totalPages}</span>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              disabled={page === totalPages - 1}
              onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <footer className="bg-gray-900">
        <div className="flex justify-center items-center p-4">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default Users;
