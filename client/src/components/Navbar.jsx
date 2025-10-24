import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer transition duration-300">
          AI Career Advisor
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-indigo-600 transition duration-200">Home</Link>
          <Link to="/dashboard" className="hover:text-indigo-600 transition duration-200">Dashboard</Link>
          <Link to="/career-matcher" className="hover:text-indigo-600 transition duration-200">Career Matcher</Link>
          <Link to="/about" className="hover:text-indigo-600 transition duration-200">About</Link>
          <Link to="/contact" className="hover:text-indigo-600 transition duration-200">Contact</Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 py-3 shadow-md space-y-2">
          <Link to="/" className="block hover:text-indigo-600">Home</Link>
          <Link to="/dashboard" className="block hover:text-indigo-600">Dashboard</Link>
          <Link to="/career-matcher" className="block hover:text-indigo-600">Career Matcher</Link>
          <Link to="/about" className="block hover:text-indigo-600">About</Link>
          <Link to="/contact" className="block hover:text-indigo-600">Contact</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
