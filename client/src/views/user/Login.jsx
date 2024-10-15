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
      const response = await api.post("/api/v1/auth/authenticate", {
        email,
        password,
      });

      console.log("Response:", response);

      const { userId, access_token  } = response.data;

      if (!access_token || !userid) {
        throw new Error("Missing access token or userid.");
      }

      localStorage.setItem("token", access_token);
      localStorage.setItem("userId", userId);

      navigate("/main");
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-black">
      <div className="mx-auto max-w-[400px] space-y-6 mt-12">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Iniciar Sesión</h1>
          <p className="text-gray-500">Inicia sesión para empezar</p>
        </div>
        <div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white" htmlFor="email">
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                type="email"
                name="email"
                placeholder="usuario@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Contraseña</label>
              <input
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                type="password"
                name="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="flex items-center justify-center rounded-md bg-primary text-white h-10 w-full"
            >
              Iniciar Sesión
            </button>
            <div className="mt-4 text-center text-white text-sm">
              ¿Aún no tienes una cuenta?{" "}
              <Link className="underline text-white" to="/signup">
                Registrate
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
