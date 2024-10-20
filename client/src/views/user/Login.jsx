import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/UserSlice"; // Corrected import path

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, isLoggedIn } = useSelector((state) => state.user); // Access Redux state

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password)); // Dispatch login action
    
    // Redirect if logged in successfully
    if (isLoggedIn) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="mx-auto max-w-md space-y-6 mt-12">
        <h1 className="text-3xl font-bold text-center text-green-400">Iniciar Sesión</h1>
        <p className="text-center text-gray-400">Inicia sesión para empezar</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <input
              className="w-full h-10 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white"
              type="email"
              placeholder="usuario@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">Contraseña</label>
            <input
              className="w-full h-10 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button 
            type="submit" 
            className="w-full h-10 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition duration-200"
            disabled={loading}
          >
            {loading ? "Iniciando..." : "Iniciar Sesión"}
          </button>

          <p className="text-center text-sm mt-4 text-gray-400">
            ¿Aún no tienes una cuenta?{" "}
            <Link className="underline text-green-300" to="/signup">Regístrate</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
