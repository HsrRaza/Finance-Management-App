import { useState } from "react";
import { useMe } from "../hooks/useMe";
import SideBar from "../components/sideBar/SideBar";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";


const DashboardLayout = () => {
  
const [isMobileMenuOpen ,setIsMobileMenuOpen] = useState(false)


  const { data: user } = useMe();

  return (
    <div className="flex h-screen bg-stone-100 overflow-hidden">
      {/* Sidebar Overlay (Mobile only) */}
      <SideBar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
     

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-slate-50 border-b flex items-center justify-between px-4 md:px-8 shrink-0">
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
        <main className="flex-1 overflow-y-hidden p-4 md:p-8 bg-slate-100">
          <div className="mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;