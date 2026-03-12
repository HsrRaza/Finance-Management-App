import { BarChart3, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';



const navItems = [
    { to: "/dashboard", label: "Overview", icon: <LayoutDashboard size={20} />, end: true },
    { to: "/dashboard/income", label: "Income", icon: <BarChart3 size={20} /> },
    { to: "/dashboard/expenses", label: "Expenses", icon: <BarChart3 size={20} /> },
    { to: "/dashboard/settings", label: "Settings", icon: <Settings size={20} /> },
];

const SideBar = ({ isMobileMenuOpen, setIsMobileMenuOpen }: { isMobileMenuOpen: boolean, setIsMobileMenuOpen: (open: boolean) => void }) => {
    return (
        <div>
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-50  w-64 md:w-86 bg-slate-950    border-r border-gray-800 text-gray-200 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
                <div className="h-16 flex items-center px-6 border-b border-gray-800">
                    <span className="text-xl font-bold bg-linear-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
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
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all group-hover:text-white
                ${isActive ? "bg-blue-600/90 text-white shadow-md" : "text-gray-400 hover:bg-gray-800 hover:text-white"}
              `}
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-stone-200 bottom-0">
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-red-400 rounded-lg transition-colors">
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </div>
    )
}

export default SideBar