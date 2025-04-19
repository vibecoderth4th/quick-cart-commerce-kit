
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WhatsAppSupport = () => {
  const openWhatsApp = () => {
    // Replace with your business's WhatsApp number
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    <Button
      onClick={openWhatsApp}
      variant="outline"
      size="icon"
      className="rounded-full fixed bottom-4 right-4 z-10 bg-green-500 hover:bg-green-600 text-white border-0 shadow-lg"
      aria-label="WhatsApp Support"
    >
      <MessageCircle className="h-5 w-5" />
    </Button>
  );
};

export default WhatsAppSupport;
