
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import Navigation from "@/components/Navigation";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Navigation />
          <div className="ml-auto">
            <Cart />
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <Footer />
      <WhatsAppSupport />
      <Toaster />
    </div>
  );
};

export default RootLayout;
