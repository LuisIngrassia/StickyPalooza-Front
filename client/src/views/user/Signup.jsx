import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { signupUser } from "../../features/SignupSlice"; 

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("USER");
  
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  
  const { loading, error } = useSelector((state) => state.signup); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signupUser(firstname, lastname, email, password, role)); 
    

    if (!error && !loading) {
      navigate("/"); 
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="mx-auto max-w-md space-y-6 mt-12">
        <h1 className="text-3xl font-bold text-center text-green-400">Registrarse</h1>
        <p className="text-center text-gray-400">Crea tu cuenta para empezar</p>

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

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="firstname">Nombre</label>
            <input
              className="w-full h-10 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white"
              type="text"
              placeholder="Martin"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="lastname">Apellido</label>
            <input
              className="w-full h-10 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white"
              type="text"
              placeholder="Rodriguez"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="role">Rol</label>
            <select
              className="w-full h-10 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="USER">Usuario</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button 
            type="submit" 
            className="w-full h-10 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition duration-200"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>

          <p className="text-center text-sm mt-4 text-gray-400">
            ¿Ya tienes una cuenta?{" "}
            <Link className="underline text-green-300" to="/login">Iniciar Sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
