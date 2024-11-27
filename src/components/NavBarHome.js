import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBarHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'border-t-4 border-pink-500 text-pink-500'
      : 'text-gray-400';

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-white text-3xl font-extrabold italic">
              Anime Acmisu
            </Link>
          </div>

          {/* Buttons for large screens only (hidden on small screens) */}
          <div className="hidden lg:flex space-x-2">
            <Link
              to="/Register"
              className="text-white bg-pink-500 hover:bg-pink-700 px-4 py-2 rounded-full text-lg font-bold shadow-lg transition-transform transform hover:scale-110"
            >
              Registrarse
            </Link>
            <Link
              to="/login"
              className="text-white bg-pink-500 hover:bg-pink-700 px-4 py-2 rounded-full text-lg font-bold shadow-lg transition-transform transform hover:scale-110"
            >
              Iniciar Sesión
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (visible only on small screens) */}
      <div
        className={`fixed inset-y-0 right-0 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-64 sm:w-80 shadow-lg z-50 lg:hidden`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-pink-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-4 pt-2 pb-3 space-y-3 sm:px-6">
          <Link
            to="/"
            className={`block text-white bg-transparent hover:bg-pink-700 px-4 py-2 rounded-md text-lg font-semibold transition-all duration-300 hover:scale-110 ${isActive('/')}`}
          >
            Inicio
          </Link>
          <Link
            to="/Register"
            className={`block text-white bg-transparent hover:bg-pink-700 px-4 py-2 rounded-md text-lg font-semibold transition-all duration-300 hover:scale-110 ${isActive('/Register')}`}
          >
            Registrarse
          </Link>
          <Link
            to="/login"
            className={`block text-white bg-transparent hover:bg-pink-700 px-4 py-2 rounded-md text-lg font-semibold transition-all duration-300 hover:scale-110 ${isActive('/login')}`}
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBarHome;
