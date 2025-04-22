
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

type MobileNavMenuProps = {
  navItems: Array<{
    label: string;
    href: string;
  }>;
};

const MobileNavMenu = ({ navItems }: MobileNavMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2">
          <Menu className="h-6 w-6 text-white" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] sm:w-[385px] bg-black">
        <nav className="flex flex-col gap-4 mt-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-lg font-bold text-white hover:text-[#4a90e2] transition-colors px-2 py-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavMenu;
