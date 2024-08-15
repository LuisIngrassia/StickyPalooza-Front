import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
    <div className="flex flex-col min-h-[100dvh] bg-black">
    <div className="mx-auto max-w-[400px] space-y-6 mt-12">
  <div className="space-y-2 text-center">
    <h1 className="text-3xl font-bold text-white">Iniciar Sesión</h1>
    <p className="text-gray-500">Inicia sesión para empezar</p>
  </div>
  <div>
    <form className="space-y-4">
      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="email"
        >
          Email
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="email" name="email" placeholder="usuario@gmail.com"
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"        >
          Contraseña
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="password" name="password" placeholder="********"
        />

        <button type="submit" className="flex items-center justify-center whitespace-nowrap rounded-md text-sm text-white font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-violet-700 h-10 px-4 py-2 w-full">
          Iniciar Sesión
        </button>
        <div className="mt-4 text-center text-white text-sm">
          ¿Aún no tienes una cuenta?{" "}
          <Link className="underline text-white" to="/register">
            Registrate
          </Link>
        </div>
      </div>
    </form>
  </div>
</div>
</div>
  );
};

export default Login;



