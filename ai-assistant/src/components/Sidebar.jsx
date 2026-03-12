import { Home, Cpu, Settings, LogOut, User, CalendarCheck} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { UseAuth } from "../context/AuthContext"; // your auth context

export default function Sidebar({ open, onClose }) {
  const { currentUser, logoutUser } = UseAuth();
  const navigate = useNavigate();

  // Base links
  const links = [
    { name: "Dashboard", path: "/Dashboard", icon: Home },
    { name: "AI Tools", path: "/Dashboard/AItools", icon: Cpu },
    { name: "Settings", path: "/Dashboard/Settings", icon: Settings },
     { name: "Content planner", path: "/Dashboard/ContentPlanner", icon: CalendarCheck }
  ];

  // Add Login/Logout dynamically
  if (currentUser) {
    links.push({
      name: "Logout",
      path: "#",
      icon: LogOut,
      onClick: async () => {
        await logoutUser();
        navigate("/Login"); // redirect to login after logout
        onClose();
      },
    });
  } else {
    links.push({
      name: "Login",
      path: "/Login",
      icon: User,
    });
  }

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed z-50 top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-6 flex flex-col gap-4 shadow-xl transform transition-transform duration-300",
          {
            "-translate-x-full md:translate-x-0": !open,
            "translate-x-0": open,
          }
        )}
      >
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={link.onClick || onClose} // handle dynamic logout
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 p-3 rounded-md transition-all",
                isActive
                  ? "bg-purple-300 text-black/90 font-semibold"
                  : "text-gray-700 hover:bg-blue-50 hover:text-pink-400"
              )
            }
          >
            <link.icon className="w-5 h-5" />
            {link.name}
          </NavLink>
        ))}
      </aside>
    </>
  );
}
