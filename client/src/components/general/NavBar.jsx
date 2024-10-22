import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline'; // Adjust the import path accordingly


export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload();
  };

  return (
    <header className="bg-gray-900 shadow-lg">
      <nav className="flex justify-between items-center p-6 lg:px-8" aria-label="Global">
        <div className="flex-1 flex justify-between items-center">
          <Link to="/">
            <img src="/images/stickylogo.png" alt="Sticky Palooza Logo" className="h-10" />
          </Link>
          <div className="hidden lg:flex space-x-4">
            {isLoggedIn && (
              <Link to="/profile">
                <button className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition">Profile</button>
              </Link>
            )}
            {/* Show Cart only for non-admin users */}
            {isLoggedIn && userRole !== 'ADMIN' && (
              <Link to="/cart">
                <button className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition">Cart</button>
              </Link>
            )}
            {/* Render Orders button for USER role */}
            {isLoggedIn && userRole === 'USER' && (
              <Link to="/order">
                <button className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition">Orders</button>
              </Link>
            )}
            {/* Render Bills button for USER role */}
            {isLoggedIn && userRole === 'USER' && (
              <Link to="/bill">
                <button className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition">Bills</button>
              </Link>
            )}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
            ) : (
              <>
                <Link to="/login">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">Login</button>
                </Link>
                <Link to="/signup">
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Register</button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? "Close" : <Bars3Icon className="h-6 w-6 text-violet-500 hover:text-violet-600" />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-start justify-between">

            <button onClick={() => setIsMenuOpen(false)} type="button" className="-m-2.5 rounded-md p-2.5 text-gray-300">
              <XMarkIcon  className="h-6 w-6 text-violet-500 hover:text-violet-600" aria-hidden="true" />
            </button>

            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {isLoggedIn ? (
                    <div className="flex flex-col items-center">
                      {/* Show Cart only for non-admin users */}
                      {userRole !== 'ADMIN' && (
                        <Link to="/cart" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:text-purple-600">Cart</Link>
                      )}
                      {/* Render Orders link for USER role */}
                      {userRole === 'USER' && (
                        <Link to="/order" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:text-purple-600">Orders</Link>
                      )}
                      {/* Render Bills link for USER role */}
                      {userRole === 'USER' && (
                        <Link to="/bill" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:text-purple-600">Bills</Link>
                      )}
                      <button onClick={handleLogout} className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:text-purple-600">Logout</button>
                    </div>
                  ) : (
                    <>
                      <Link to="/login" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-purple-700">Login</Link>
                      <Link to="/signup" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-purple-700">Regístrate</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
