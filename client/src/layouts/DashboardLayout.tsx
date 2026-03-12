import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, BarChart3, Settings, Menu, LogOut } from "lucide-react"; // npm install lucide-react
import { useMe } from "../hooks/useMe";


const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/dashboard", label: "Overview", icon: <LayoutDashboard size={20} />, end: true },
    { to: "/dashboard/income", label: "Income", icon: <BarChart3 size={20} /> },
    { to: "/dashboard/expenses", label: "Expenses", icon: <BarChart3 size={20} /> },
    { to: "/dashboard/settings", label: "Settings", icon: <Settings size={20} /> },
  ];


 
  const {data:user} = useMe();

  return (
    <div className="flex h-screen bg-stone-100 overflow-hidden">
      {/* Sidebar Overlay (Mobile only) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50  w-64 md:w-86  border-r border-stone-200 text-white transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-stone-200">
          <span className="text-xl font-bold bg-linear-to-r from-neutral-500 to-neutral-900 bg-clip-text text-transparent">
            FinTrackr
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 h-[85vh]">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${isActive ? "bg-blue-600 text-white shadow-lg" : "text-black hover:bg-slate-800 hover:text-white"}
              `}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-stone-200 bottom-0">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-black hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-stone-100 border-b flex items-center justify-between px-4 md:px-8 shrink-0">
          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-700">{
user?.name || "user"
}</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name || "user"}&background=0D8ABC&color=fff`}
              alt="Avatar"
              className="w-10 h-10 rounded-full border border-gray-200"
            />
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-hidden p-4 md:p-8">
          <div className="mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;