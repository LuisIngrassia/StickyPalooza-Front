import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-100">
      <header className="bg-black text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">E-Shop</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                {/* <Link to="/products" className="hover:underline">
                  Productos
                </Link> */}
              </li>
              <li>
                {/* <Link to="/cart" className="hover:underline">
                  Carrito
                </Link> */}
              </li>
              <li>
                {/* <Link to="/profile" className="hover:underline">
                  Perfil
                </Link> */}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">sticky </h2>
          <p className="text-gray-600 mb-8">kys</p>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Link
              to="/products"
              className="block bg-blue-500 hover:bg-blue-600 text-white py-4 px-8 rounded-md"
            >
              Ver Productos
            </Link>
            <Link
              to="/cart"
              className="block bg-green-500 hover:bg-green-600 text-white py-4 px-8 rounded-md"
            >
              Ir al Carrito
            </Link>
            <Link
              to="/profile"
              className="block bg-purple-500 hover:bg-purple-600 text-white py-4 px-8 rounded-md"
            >
              Tu Perfil
            </Link>
          </div> */}
        </div>
      </main>

      <footer className="bg-black text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; placeholder footer</p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
