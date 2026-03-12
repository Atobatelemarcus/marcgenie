import { Menu, X, Sun, Moon, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import PublicMobileMenu from "./PublicMobileMenu";
import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

export default function PublicHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useTheme();

  return (
    <header className="w-full border-b bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        <div className="text-2xl font-bold text-teal-700 dark:text-teal-400 tracking-tight">
          MarcGenie
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-gray-700 dark:text-gray-200">
            Home
          </Link>

          {/* Login */}
          <Link to="/login" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
            <LogIn className="w-5 h-5" />
          </Link>

          {/* Register */}
          <Link to="/register" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
            <UserPlus className="w-5 h-5" />
          </Link>

          {/* Theme */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex gap-2">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
          </button>

          <button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <PublicMobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
