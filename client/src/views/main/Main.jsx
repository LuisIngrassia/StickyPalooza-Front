import React from "react";
import NavBar from '../../components/general/NavBar'
import Footer from "../../components/general/Footer";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-50">

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 text-center">
          
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 bg-white border border-gray-200 shadow-md p-6 rounded-md inline-block hover:shadow-lg transition-transform duration-300 transform hover:scale-105 mb-6">
              Sticky Palooza
            </h2>

          <p className="text-lg text-gray-700 mb-12">
            ¡Tu tienda favorita de stickers de mierda!
          </p>
          
          <div className="flex justify-center gap-6 mb-12">
            <Link
              to="/products"
              className="block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-4 px-8 rounded-md shadow-md transition duration-300 transform hover:scale-105"
            >
              Ver Productos
            </Link>
            <Link
              to="/cart"
              className="block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-4 px-8 rounded-md shadow-md transition duration-300 transform hover:scale-105"
            >
              Ir al Carrito
            </Link>
            <Link
              to="/profile"
              className="block bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-4 px-8 rounded-md shadow-md transition duration-300 transform hover:scale-105"
            >
              Tu Perfil
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default MainPage;
