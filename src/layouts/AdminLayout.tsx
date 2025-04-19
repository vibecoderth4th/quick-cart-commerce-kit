
import { Outlet, Navigate } from "react-router-dom";
import { useAdminSession } from "@/contexts/AdminSessionContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const AdminLayout = () => {
  const { session, logout } = useAdminSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if the current path is admin/login
  const isLoginPage = window.location.pathname === "/admin/login" || window.location.pathname === "/admin";

  // If not logged in and not on login page, redirect to login
  if (!session.isLoggedIn && !isLoginPage) {
    return <Navigate to="/admin/login" />;
  }

  // If on login page, don't show admin layout
  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`bg-gray-900 text-white w-64 flex-shrink-0 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-50`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="space-y-1 flex-1">
            <a 
              href="/admin/dashboard" 
              className="block px-4 py-2 rounded hover:bg-gray-800"
            >
              Dashboard
            </a>
            <a 
              href="/admin/dashboard?category=men" 
              className="block px-4 py-2 rounded hover:bg-gray-800"
            >
              Men's Products
            </a>
            <a 
              href="/admin/dashboard?category=women" 
              className="block px-4 py-2 rounded hover:bg-gray-800"
            >
              Women's Products
            </a>
            <a 
              href="/admin/dashboard?category=collectibles" 
              className="block px-4 py-2 rounded hover:bg-gray-800"
            >
              Collectibles
            </a>
          </nav>
          
          <div className="mt-auto">
            <Button 
              variant="outline" 
              onClick={logout} 
              className="w-full text-white hover:bg-gray-800 border-gray-700"
            >
              Logout
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b">
          <div className="px-4 py-4 flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-4 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-medium">Admin Panel</h2>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
