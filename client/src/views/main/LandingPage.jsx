import React from "react";
import { Link } from "react-router-dom"; 

const LandingPage = ()  => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-center py-10">
        <h1 className="text-5xl font-bold text-sticker-yellow bg-white border-4 border-sticker-yellow shadow-lg p-2 rounded-lg inline-block transform rotate-[-5] hover:rotate-[5] hover:scale-105 transition-transform duration-300 animate-sticky">
          Sticky Palooza
          </h1>
          <p className="text-gray-500 text-lg mt-4">¡Tu tienda favorita de stickers personalizados!</p>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 py-12">
        <p className="text-lg mb-6 text-center">Explora nuestra tienda de stickers únicos y personaliza tus objetos favoritos con diseños de rock, fútbol, series, y más.</p>
        <div className="absolute top-4 right-4 space-x-4">
          <Link to="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Login</button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Regístrate</button>
          </Link>
        </div>
        <div className="space-x-4 mb-8">
          <Link to="/products">
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition">Explora la Tienda</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;


// import React from "react";
// import { Link } from "react-router-dom"; // Import Link for navigation

// const LandingPage = ()  => {
//   return (
//     <div>
//       <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <h1 className="text-4xl font-bold mb-6">Sticky front</h1>
//         <p className="text-lg mb-4">Encuentra stickers únicos para personalizar tus objetos favoritos: ¡Rock, fútbol, películas, y más!</p>
//         <div className="space-x-4">
//           <Link to="/login">
//             <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
//               Login
//             </button>
//           </Link>
//           <Link to="/signup">
//             <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
//               Register
//             </button>
//           </Link>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default LandingPage;