
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import Navigation from "@/components/Navigation";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-white">
        <div className="h-20 relative overflow-hidden">
          <Navigation />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10">
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
