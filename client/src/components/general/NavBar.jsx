import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <header className="bg-gray-900 shadow-lg">
      <nav
        className="flex justify-between items-center p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex-1 flex justify-between items-center">
          <Link to="/">
            <img
              src="/images/stickylogo.png"
              alt="Sticky Palooza Logo"
              className="h-10"
            />
          </Link>
          <div className="hidden lg:flex space-x-4">
            {isLoggedIn && (
              <Link to="/profile">
                <button className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>
              </Link>
            )}
            {isLoggedIn && userRole !== "ADMIN" && (
              <Link to="/cart">
                <button className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </button>
              </Link>
            )}
            {isLoggedIn && userRole === "USER" && (
              <Link to="/order">
                <button className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v7.5m2.25-6.466a9.016 9.016 0 0 0-3.461-.203c-.536.072-.974.478-1.021 1.017a4.559 4.559 0 0 0-.018.402c0 .464.336.844.775.994l2.95 1.012c.44.15.775.53.775.994 0 .136-.006.27-.018.402-.047.539-.485.945-1.021 1.017a9.077 9.077 0 0 1-3.461-.203M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </button>
              </Link>
            )}
            {isLoggedIn && userRole === "USER" && (
              <Link to="/bill">
                <button className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                    />
                  </svg>
                </button>
              </Link>
            )}
            {isLoggedIn ? (
              <Link to="/login">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                    />
                  </svg>
                </button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            {isMenuOpen ? (
              "Close"
            ) : (
              <Bars3Icon className="h-6 w-6 text-violet-500 hover:text-violet-600" />
            )}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-start justify-between">
              <button
                onClick={() => setIsMenuOpen(false)}
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-300"
              >
                <XMarkIcon
                  className="h-6 w-6 text-violet-500 hover:text-violet-600"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {isLoggedIn ? (
                    <div className="flex flex-col items-center">
                      {userRole !== "ADMIN" && (
                        <Link
                          to="/cart"
                          className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:text-purple-600"
                        >
                          Cart
                        </Link>
                      )}
                      {userRole === "USER" && (
                        <Link
                          to="/order"
                          className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:text-purple-600"
                        >
                          Orders
                        </Link>
                      )}
                      {userRole === "USER" && (
                        <Link
                          to="/bill"
                          className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:text-purple-600"
                        >
                          Bills
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:text-purple-600"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-purple-700"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-purple-700"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
