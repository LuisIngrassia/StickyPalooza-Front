import React from "react";
import NavBar from '../../components/general/NavBar'
import Footer from "../../components/general/Footer";
import { Link } from "react-router-dom";
 
const MainPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-100">
      <NavBar />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-4xl font-bold text-gray-text-5xl font-bold text-sticker-yellow bg-white border-4 border-sticker-yellow shadow-lg p-2 rounded-lg inline-block transform rotate-[-5] hover:rotate-[5] hover:scale-105 transition-transform duration-300 animate-sticky mb-4">Sticky Palooza </h2>
          <p className="text-gray-600 mb-8">¡Tu tienda favorita de stickers de mierda!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 container mx-auto text-center">
        <div className="bg-white shadow-lg p-14q
         rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Stickers de Música</h3>
          <p className="text-gray-500">Encuentra diseños inspirados en tus bandas favoritas.</p>
        </div>
        <div className="bg-white shadow-lg p-12 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Stickers de Fútbol</h3>
           <p className="text-gray-500">Personaliza tu espacio con stickers de tus equipos preferidos.</p>
         </div>
         <div className="bg-white shadow-lg p-12 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Series y Películas</h3>
          <p className="text-gray-500">Stickers de tus personajes y películas más queridas.</p>
        </div>
        </div>
      </main>
    
      <Footer/>
      
    </div>
  );
};

export default MainPage;
