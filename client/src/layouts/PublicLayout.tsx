import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const PublicLayout = () => (
  <div className="flex flex-col min-h-screen ">
    <Navbar />

    <main className="grow ">
      <Outlet />
    </main>

    <footer className="py-12 border-t text-center text-gray-400 text-sm">
      &copy; 2024 DashCorp. All rights reserved.
    </footer>
  </div>
);

export default PublicLayout;