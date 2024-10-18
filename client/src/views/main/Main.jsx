import React from "react";
import NavBar from '../../components/general/NavBar'
import Footer from "../../components/general/Footer";
import { Link } from "react-router-dom";

import rockImage from 'client/src/assets/images/musica/Redondos.jpg'; 
import footballImage from 'client/src/assets/images/scaloneta/Messi.jpg'; 
import seriesImage from 'client/src/assets/images/series/BrBd.jpg'; 

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-50">
      {/* <NavBar /> */}

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 text-center">
          
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 bg-white border border-gray-200 shadow-md p-6 rounded-md inline-block hover:shadow-lg transition-transform duration-300 transform hover:scale-105 mb-6">
            Sticky Palooza
          </h2>

          <p className="text-lg text-gray-700 mb-12">
            ¡Tu tienda favorita de stickers! 
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 container mx-auto">
          <div className="bg-white shadow-lg p-6 rounded-lg transform hover:scale-105 transition-transform duration-300">
            <img src={rockImage} alt="Stickers de Rock" className="w-full h-60 object-cover rounded-t-lg mb-4 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Stickers de Música</h3>
            <p className="text-gray-600">Encuentra diseños inspirados en tus bandas favoritas.</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg transform hover:scale-105 transition-transform duration-300">
            <img src={footballImage} alt="Stickers de Fútbol" className="w-full h-60 object-cover rounded-t-lg mb-4 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Stickers de Fútbol</h3>
            <p className="text-gray-600">Personaliza tu espacio con stickers de tus equipos preferidos.</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg transform hover:scale-105 transition-transform duration-300">
            <img src={seriesImage} alt="Stickers de Series y Películas" className="w-full h-60 object-cover rounded-t-lg mb-4 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Series y Películas</h3>
            <p className="text-gray-600">Stickers de tus personajes y películas más queridas.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;
