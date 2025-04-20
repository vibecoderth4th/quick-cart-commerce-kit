
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavigationShapes from "./NavigationShapes";

const navItems = [
  { label: "NEW IN", href: "/" },
  { label: "MEN", href: "/men" },
  { label: "WOMEN", href: "/women" },
  { label: "COLLECTION", href: "/collectibles" },
];

const Navigation = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="flex items-center">
        <Link to="/" className="mr-4">
          <img src="/logo.png" alt="Logo" className="h-8" />
        </Link>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] pt-10">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-between w-full">
      <NavigationShapes />
      
      <Link to="/" className="relative z-10">
        <img src="/logo.png" alt="Logo" className="h-12" />
      </Link>
      
      <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <ul className="flex items-center gap-16">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="text-lg font-bold tracking-wider hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
