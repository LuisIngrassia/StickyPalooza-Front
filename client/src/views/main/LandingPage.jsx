import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const LandingPage = ()  => {
  return (
    <div>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-6">Sticky front</h1>
        <p className="text-lg mb-4">que feo que se ve el sticky front</p>
        <div className="space-x-4">
          <Link to="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
              Register
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;