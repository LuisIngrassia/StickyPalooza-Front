import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/v1/auth/authenticate", { email, password });

      const { userId, access_token, role } = response.data;

      if (!access_token || !userId) {
        throw new Error("Missing access token, userId, or cartId.");
      }

      localStorage.setItem("token", access_token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to log in. Please check your credentials.");
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
          >
            Iniciar Sesión
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