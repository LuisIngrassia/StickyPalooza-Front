import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-6 w-full">
      <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-4 md:px-6 gap-4 text-white text-center">
        <a className="flex items-center gap-2" href="#">
          <span className="sr-only">StickyPalooza</span>
        </a>
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm justify-center">
          <p>© 2024 StickyPalooza.</p>
          <div className="flex gap-2">
            <a className="hover:underline text-green-300" href="#">
              Privacy Policy
            </a>
            <span>|</span>
            <a className="hover:underline text-green-300" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
