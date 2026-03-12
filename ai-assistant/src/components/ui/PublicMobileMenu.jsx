// src/components/ui/PublicMobileMenu.jsx
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export default function PublicMobileMenu({ open, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Slide-in menu */}
      <aside className="relative w-64 h-full bg-white shadow-xl p-6 flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="mb-6 p-1 rounded hover:bg-gray-100 transition"
          aria-label="Close Menu"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 text-lg">
          <Link
            to="/"
            onClick={onClose}
            className="py-2 px-3 font-medium text-gray-800 hover:text-teal-700 hover:bg-gray-50 rounded transition"
          >
            Home
          </Link>
          <hr className="border-gray-200 my-1" />
          <Link
            to="/Login"
            onClick={onClose}
            className="py-2 px-3 font-medium text-gray-800 hover:text-teal-700 hover:bg-gray-50 rounded transition"
          >
            Login
          </Link>
          <hr className="border-gray-200 my-1" />
          <Link
            to="/Register"
            onClick={onClose}
            className="py-2 px-3 font-medium text-gray-800 hover:text-teal-700 hover:bg-gray-50 rounded transition"
          >
            Register
          </Link>
        </nav>
      </aside>
    </div>
  );
}
