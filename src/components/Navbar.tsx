import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    setMobileOpen(false);
    window.location.href = "/";
  }

  return (
    <nav className="w-full bg-blue-700 text-white px-6 py-4 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">SpeakWell</h1>

        {/* Desktop */}
        <div className="hidden lg:flex gap-8 text-lg font-medium items-center">
          <Link to="/" className="hover:text-blue-300 transition-colors duration-200">Home</Link>
          <Link to="/about" className="hover:text-blue-300 transition-colors duration-200">About</Link>
          <Link to="/services" className="hover:text-blue-300 transition-colors duration-200">Services</Link>
          <Link to="/teams" className="hover:text-blue-300 transition-colors duration-200">Teams</Link>
          <Link to="/blog" className="hover:text-blue-300 transition-colors duration-200">Blog</Link>
          <Link to="/create-blog" className="hover:text-blue-300 transition-colors duration-200">Create Blog</Link>

          {!isLoggedIn && (
            <Link to="/login" className="hover:text-blue-300 transition-colors duration-200">
              Login
            </Link>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="hover:text-blue-300 transition-colors duration-200 cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden text-3xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile */}
      {mobileOpen && (
        <div className="lg:hidden flex flex-col gap-6 text-lg font-medium mt-4 pb-6">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="hover:text-blue-300 cursor-pointer transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileOpen(false)}
            className="hover:text-blue-300 cursor-pointer transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/services"
            onClick={() => setMobileOpen(false)}
            className="hover:text-blue-300 cursor-pointer transition-colors duration-200"
          >
            Services
          </Link>
          <Link
            to="/teams"
            onClick={() => setMobileOpen(false)}
            className="hover:text-blue-300 cursor-pointer transition-colors duration-200"
          >
            Teams
          </Link>
          <Link
            to="/blog"
            onClick={() => setMobileOpen(false)}
            className="hover:text-blue-300 cursor-pointer transition-colors duration-200"
          >
            Blog
          </Link>
          <Link
            to="/create-blog"
            onClick={() => setMobileOpen(false)}
            className="hover:text-blue-300 cursor-pointer transition-colors duration-200"
          >
            Create Blog
          </Link>

          {!isLoggedIn && (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="hover:text-blue-300 cursor-pointer transition-colors duration-200"
            >
              Login
            </Link>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="hover:text-blue-300 cursor-pointer transition-colors duration-200 text-left"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
