import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white-900 py-6 w-full">
      <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-6 gap-4">
        <a className="flex items-center gap-2" href="#">
          <span className="sr-only">StickyPalooza</span>
        </a>
        <div className="flex items-center gap-4 text-sm text-muted-foreground justify-">
          <p>© 2024 StickyPalooza. Todos los derechos reservados.</p>
          <a className="hover:underline" href="#">
            Privacy Policy
          </a>
          <a className="hover:underline" href="#">
            Terms of Service
          </a>
        </div>
        <div className="flex items-center gap-2 bg-card rounded-md space-y-2 border-white border-solid">
          {/* Additional content like input can go here */}
        </div>
      </div>
    </footer>
  );
}
