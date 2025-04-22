
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import Navigation from "@/components/Navigation";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-transparent">
        {/* Navigation now receives the Cart explicitly for right positioning */}
        <Navigation cartSlot={<Cart />} />
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
