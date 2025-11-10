import { Home, Search, Plus, Heart, User, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../../../public/logo.png";
import clsx from "clsx";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/create", icon: Plus, label: "Create" },
  { to: "/activity", icon: Heart, label: "Activity" },
  { to: "/profile", icon: User, label: "Profile" },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-[72px] flex flex-col items-center py-4 justify-between">
      <div className="">
        <img src={logo} alt="logo" className="max-w-full h-auto" />
      </div>

      <nav className="flex flex-col gap-8">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              clsx(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                isActive
                  ? "bg-black text-white"
                  : "text-gray-400 hover:text-black hover:bg-gray-100"
              )
            }
            title={label}
          >
            <Icon size={22} />
          </NavLink>
        ))}
      </nav>

      <div className="mb-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 hover:text-black hover:bg-gray-100">
          <Menu size={22} />
        </button>
      </div>
    </aside>
  );
}
