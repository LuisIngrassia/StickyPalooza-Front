import React from "react";
import { Link } from "react-router-dom";
// import * as svgs from "../icons/exports";

export default function Footer() {
  return (
    <footer class="bg-red-900 py-6 w-full">
      <div class="container max-w-7xl flex flex-col md:flex-row items-center justify-between px-4 md:px-6 gap-4">
        <a class="flex items-center gap-2" href="#">
          <span class="sr-only">StickyPalooza</span>
        </a>
        <div class="flex items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 StickyPalooza. Todos los derechos reservados.</p>
          <a class="hover:underline" href="#">
            Privacy Policy
          </a>
          <a class="hover:underline" href="#">
            Terms of Service
          </a>
        </div>
        <div className="flex items-center gap-2 bg-card rounded-md space-y-2 border-white border-solid">
          {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-5 w-5 text-muted-foreground">
              
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg> */}
          {/* <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="email" name="email" placeholder="usuario@gmail.com">
                  
              </input> */}
          <form className="space-y-2">
            <div className="">
              <label
                className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="email"
              >
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                name="email"
                placeholder="usuario@gmail.com"
              />
            </div>

            <div className="">
              <label className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Mensaje
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="Mensaje"
                name="Mensaje"
                placeholder="Ingresa tu mensaje acá"
              />

              <button
                type="submit"
                className="flex items-center justify-center whitespace-nowrap rounded-md text-sm text-white font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-violet-700 h-10 px-4 py-2 w-full"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>

        {/* <div className="flex items-center gap-2 bg-card rouded-md p-3">
          
        </div> */}
      </div>
    </footer>
  );
}
