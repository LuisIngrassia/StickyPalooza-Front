// src/components/users/Users.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useUsersLogic } from './UsersLogic'; // Import the logic

const Users = () => {
  const navigate = useNavigate();
  const {
    users,
    loading,
    error,
    page,
    totalPages,
    setPage,
    handleDeleteUser,
  } = useUsersLogic(); // Destructure the logic

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <button
        className="flex items-center text-green-400 mb-6"
        onClick={() => navigate('/')}
      >
        <ArrowLeftIcon className="h-6 w-6 mr-2" />
        Back to Home
      </button>
      <h1 className="text-3xl font-bold mb-6 text-green-400 text-center">Users</h1>

      {loading && <p className="text-green-300 text-center">Loading users...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 border border-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-600 text-left text-green-300">Name</th>
                <th className="px-6 py-3 border-b-2 border-gray-600 text-center text-green-300">Email</th>
                <th className="px-6 py-3 border-b-2 border-gray-600 text-right text-green-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-600">
                  <td className="px-6 py-4 text-left text-green-300">{user.firstName} {user.lastName}</td>
                  <td className="px-6 py-4 text-center text-green-300">{user.email}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md transition duration-200"
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
            className="bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-gray-500"
            disabled={page === 0}
            onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
          >
            Previous
          </button>
          <span className="mx-4 text-green-300">Page {page + 1} of {totalPages}</span>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-gray-500"
            disabled={page === totalPages - 1}
            onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
