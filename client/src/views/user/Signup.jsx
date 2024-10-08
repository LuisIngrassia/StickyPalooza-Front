import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/Api"; 

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setName] = useState("");
  const [lastname, setSurname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/v1/auth/register/user", {
        firstname,
        lastname,
        email,
        password,
        role: 'USER',
      });
  
      console.log("Response:", response);  // Debug the response
  
      const { access_token } = response.data;

  
      if (!access_token) {
        throw new Error("No access token returned from the server.");
      }
  
      localStorage.setItem("token", access_token);
  
      navigate("/main");
    } catch (err) {
      console.error("Signup error:", err);  // Debug the error
      setError("Failed to register. Please try again.");
    }
  };
  
  

  return (
    <div className="flex flex-col min-h-[100dvh] bg-black">
      <div className="mx-auto max-w-[400px] space-y-6 mt-12">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Registrarse</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Crea tu cuenta para empezar
          </p>
        </div>
        <div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-white" htmlFor="email">
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                type="email"
                name="email"
                placeholder="usuario@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-white">
                Contraseña
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                type="password"
                name="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-white">
                Nombre
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                type="text"
                name="firstname"
                placeholder="Martin"
                value={firstname}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-white">
                Apellido
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                type="text"
                name="lastname"
                placeholder="Rodriguez"
                value={lastname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="space-y-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center text-white bg-primary rounded-md h-10 px-4 py-2 w-full hover:bg-violet-700 transition-colors"
              >
                Registrarse
              </button>
            </div>
          </form>
          <div className="mt-4 text-center text-white text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link className="underline text-white" to="/login">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
