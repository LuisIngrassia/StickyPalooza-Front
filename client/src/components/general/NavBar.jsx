import React, { useState } from "react";
import { Link } from "react-router-dom";

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
                <button className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition">Profile</button>
              </Link>
            )}
            {/* Show Cart only for non-admin users */}
            {isLoggedIn && userRole !== 'ADMIN' && (
              <Link to="/cart">
                <button className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition">Cart</button>
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
                  <button className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition">Register</button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-start justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Tu Empresa</span>
              </Link>
              <button onClick={() => setIsMenuOpen(false)} type="button" className="-m-2.5 rounded-md p-2.5 text-gray-300">
                <span className="sr-only">Cerrar menú</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {isLoggedIn ? (
                    <>
                      {/* Show Cart only for non-admin users */}
                      {userRole !== 'ADMIN' && (
                        <Link to="/cart" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-purple-300 hover:bg-purple-700">Cart</Link>
                      )}
                      <button onClick={handleLogout} className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-purple-300 hover:bg-purple-700">Logout</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-purple-300 hover:bg-purple-700">Login</Link>
                      <Link to="/signup" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-purple-300 hover:bg-purple-700">Regístrate</Link>
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
