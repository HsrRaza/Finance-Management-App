import { Outlet, Link } from "react-router-dom";

const PublicLayout = () => (
  <div className="flex flex-col min-h-screen bg-white">
    <nav className="h-20 border-b flex items-center justify-between px-8">
      <Link to="/" className="text-2xl font-black tracking-tight text-blue-600">LOGO</Link>
      <div className="flex items-center gap-6">
        <Link to="/login" className="font-medium text-gray-600 hover:text-blue-600">Login</Link>
        <Link to="/dashboard" className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-colors">
          Go to Dashboard
        </Link>
      </div>
    </nav>

    <main className="grow">
      <Outlet />
    </main>

    <footer className="py-12 border-t text-center text-gray-400 text-sm">
      &copy; 2024 DashCorp. All rights reserved.
    </footer>
  </div>
);

export default PublicLayout;