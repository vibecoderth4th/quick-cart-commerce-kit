
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

type NavigationProps = {
  cartSlot: React.ReactNode;
};

/** Hardcoded nav structure: adjust as needed */
const navItems = [
  { label: "NEW IN", href: "/" },
  { label: "MEN", href: "/men" },
  { label: "WOMEN", href: "/women" },
  { label: "COLLECTIBLES", href: "/collectibles" },
];

const Navigation = ({ cartSlot }: NavigationProps) => {
  const isMobile = useIsMobile();

  // Mobile: fallback to prior layout (Sheet, logo, etc)
  if (isMobile) {
    return (
      <div className="flex items-center w-full px-4 py-4 bg-white shadow-sm">
        <Link to="/" className="mr-4">
          <img src="/logo.png" alt="Logo" className="h-8" />
        </Link>
        <div className="ml-auto">{cartSlot}</div>
      </div>
    );
  }

  return (
    <nav
      className="relative w-full flex flex-col items-center"
      style={{ height: '155px' }}
    >
      {/* Layer group mimicking provided overlap/shape and backgrounds */}
      {/* SVG shape LEFT */}
      <div className="absolute left-0 top-0 z-10 w-[278px] h-[113px]">
        <img
          src="/lovable-uploads/82034807-3457-43fd-9297-f381dab12827.png"
          alt="Navigation left shape"
          className="w-full h-full object-contain select-none pointer-events-none"
          draggable={false}
        />
      </div>

      {/* NAVIGATION BAR OUTER OVERLAY */}
      <div className="absolute left-[156px] top-0 w-[1337px] h-[77px] z-0" style={{}}>
        {/* Dark base background */}
        <div className="absolute w-full h-full bg-[#0b0b0b] rounded-none" style={{}} />
        {/* Slightly lighter overlay */}
        <div className="absolute w-full h-full top-0 left-0 bg-[#0b0b0bb8] rounded-none" style={{}} />
      </div>
      {/* Main FLEX zone overlays everything above */}
      <div
        className="
        relative z-20
        flex flex-row items-center justify-center
        w-[1337px] h-[77px]
        mx-auto
        mt-0
        "
        style={{
          marginLeft: "156px",
        }}
      >
        {/* Spacer to simulate left offset */}
        <div className="flex-shrink-0 w-2" />
        {/* Center nav menu */}
        <div className="flex-grow flex justify-center">
          <NavigationMenu className="bg-transparent shadow-none select-none">
            <NavigationMenuList className="gap-10">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    className="group inline-flex h-12 items-center justify-center px-6 text-base font-bold text-white transition-colors hover:text-[#4a90e2] focus:text-[#4a90e2] focus:outline-none data-[active]:text-[#4a90e2] uppercase tracking-widest"
                  >
                    <Link to={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Cart icon as slot (extreme right, vertically centered) */}
        <div className="flex-shrink-0 flex items-center justify-end ml-auto h-full pr-6">
          {cartSlot}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
