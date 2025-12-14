import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); 
    setMobileOpen(false);
    navigate("/");
  };
  
  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <nav className="w-full bg-blue-700 text-white px-6 py-4 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">SpeakWell</h1>
        <div className="hidden lg:flex gap-8 text-lg font-medium items-center">
          <Link to="/" className="hover:text-blue-300 transition-colors duration-200">Home</Link>
          <Link to="/about" className="hover:text-blue-300 transition-colors duration-200">About</Link>
          <Link to="/services" className="hover:text-blue-300 transition-colors duration-200">Services</Link>
          <Link to="/teams" className="hover:text-blue-300 transition-colors duration-200">Teams</Link>
          <Link to="/blog-list" className="hover:text-blue-300 transition-colors duration-200">Blog</Link>
          
          {isAuthenticated && (
            <Link to="/create-blog" className="hover:text-blue-300 transition-colors duration-200">Create Blog</Link>
          )}
          {!isAuthenticated && (
            <Link to="/login" className="hover:text-blue-300 transition-colors duration-200">
              Login
            </Link>
          )}
          {isAuthenticated && (
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden flex flex-col gap-6 text-lg font-medium mt-4 pb-6">
          <Link to="/" onClick={closeMobileMenu} className="hover:text-blue-300 cursor-pointer transition-colors duration-200">Home</Link>
          <Link to="/about" onClick={closeMobileMenu} className="hover:text-blue-300 cursor-pointer transition-colors duration-200">About</Link>
          <Link to="/services" onClick={closeMobileMenu} className="hover:text-blue-300 cursor-pointer transition-colors duration-200">Services</Link>
          <Link to="/teams" onClick={closeMobileMenu} className="hover:text-blue-300 cursor-pointer transition-colors duration-200">Teams</Link>
          <Link to="/blog-list" onClick={closeMobileMenu} className="hover:text-blue-300 cursor-pointer transition-colors duration-200">Blog</Link>
          
          {/* 🚨 PERBAIKAN: Tampilkan 'Create Blog' di MOBILE hanya jika sudah login 🚨 */}
          {isAuthenticated && (
            <Link
              to="/create-blog"
              onClick={closeMobileMenu}
              className="hover:text-blue-300 cursor-pointer transition-colors duration-200"
            >
              Create Blog
            </Link>
          )}

          {/* Tombol Login/Logout Mobile */}
          {!isAuthenticated && (
            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="hover:text-blue-300 cursor-pointer transition-colors duration-200"
            >
              Login
            </Link>
          )}

          {isAuthenticated && (
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
};

export default Navbar;