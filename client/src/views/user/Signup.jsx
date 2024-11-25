import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/Api";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/v1/auth/register", {
        firstname,
        lastname,
        email,
        password,
        role,
      });

      const { userId, access_token } = response.data;

      if (!access_token || !userId) {
        throw new Error("Missing access token, userId, or cartId.");
      }

      localStorage.setItem("token", access_token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="mx-auto max-w-md space-y-6 mt-12">
        <h1 className="text-3xl font-bold text-center text-green-400">Register</h1>
        <p className="text-center text-gray-400">Create your account to get started</p>

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
            <label className="text-sm font-medium" htmlFor="password">Password</label>
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
            <label className="text-sm font-medium" htmlFor="firstname">Name</label>
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
            <label className="text-sm font-medium" htmlFor="lastname">Surname</label>
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
              <option value="USER">User</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button 
            type="submit" 
            className="w-full h-10 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition duration-200"
          >
            Register
          </button>

          <p className="text-center text-sm mt-4 text-gray-400">
            Already have an account?{" "}
            <Link className="underline text-green-300" to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;