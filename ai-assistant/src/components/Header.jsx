import { Bell, Menu, Sun, Moon, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import InitialsModal from "./InitialsModal";
import { UseAuth } from "../context/AuthContext";

export default function Header() {
  const { currentUser } = UseAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // theme
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);
  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const brandGradient = "bg-purple-400";
  const hoverGradient = "hover:from-purple-600 hover:via-pink-600 hover:to-purple-700";

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <header
        className={`${brandGradient} ${hoverGradient} shadow-md px-6 py-4 flex justify-between items-center text-black/90 rounded-lg m-2`}
      >
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
   
          MarcGenie
        </Link>

        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 hover:text-yellow-200 cursor-pointer transition" />

          <button onClick={toggleTheme} className="p-2 rounded hover:bg-white/20 transition">
            {dark ? <Sun className="w-5 h-5 text-yellow-200" /> : <Moon className="w-5 h-5 text-gray-800" />}
          </button>

          {currentUser?.displayName && (
            <div
              className="w-8 h-8 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              {currentUser.displayName
                .split(" ")
                .map(n => n[0].toUpperCase())
                .slice(0, 2)
                .join("")}
            </div>
          )}

          <Link to="/logout" className="p-2 rounded bg-red-500/20 hover:bg-red-500/40 transition">
            <LogOut className="w-5 h-5 text-red-900" />
          </Link>

          <button
            className="md:hidden p-2 rounded hover:bg-white/20 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>

      {/* Modal */}
      <InitialsModal
        user={{ name: currentUser?.displayName }}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
