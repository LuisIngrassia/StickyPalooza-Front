import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('token'); // Comprobar si el usuario está conectado

  const handleLogout = () => {
    localStorage.removeItem('token'); // Limpiar el token
    window.location.reload(); // Recargar la página para reflejar cambios
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg">
      <nav className="flex justify-between items-center p-6 lg:px-8" aria-label="Global">
        
        {/* Botón de perfil en la esquina superior izquierda */}
        {isLoggedIn && (
          <Link to="/profile" className="flex-none">
            <button className="bg-black text-blue-500 px-4 py-2 rounded hover:bg-gray-100 transition">Profile</button>
          </Link>
        )}

        {/* Centro de la Navbar */}
        <div className="flex-1 flex justify-center space-x-4">
          {isLoggedIn ? (
            <Link to="/cart">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Cart</button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Login</button>
              </Link>
              <Link to="/signup">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Regístrate</button>
              </Link>
            </>
          )}
        </div>

        {/* Botón de logout en la esquina superior derecha */}
        {isLoggedIn && (
          <div className="hidden lg:flex lg:flex-none">
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
          </div>
        )}
      </nav>
      
      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-start justify-between">
              <Link to="" className="-m-1.5 p-1.5">
                <span className="sr-only">Tu Empresa</span>
              </Link>
              <button onClick={() => setIsMenuOpen(false)} type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
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
                    <Link to="/cart" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Cart</Link>
                  ) : (
                    <>
                      <Link to="/login" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Login</Link>
                      <Link to="/signup" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Regístrate</Link>
                    </>
                  )}
                  {isLoggedIn && (
                    <button onClick={handleLogout} className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Logout</button>
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
