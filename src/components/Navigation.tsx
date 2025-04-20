import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
type NavigationProps = {
  cartSlot: React.ReactNode;
};

// Hardcoded nav structure: adjust as needed
const navItems = [{
  label: "NEW IN",
  href: "/"
}, {
  label: "MEN",
  href: "/men"
}, {
  label: "WOMEN",
  href: "/women"
}, {
  label: "COLLECTIBLES",
  href: "/collectibles"
}];
const Navigation = ({
  cartSlot
}: NavigationProps) => {
  const isMobile = useIsMobile();

  // Mobile fallback
  if (isMobile) {
    return <div className="flex items-center w-full px-4 py-4 bg-white shadow-sm">
        <Link to="/" className="mr-4">
          <img src="/logo.png" alt="Logo" className="h-8" />
        </Link>
        <div className="ml-auto">{cartSlot}</div>
      </div>;
  }
  return <nav style={{
    height: '155px'
  }} className="relative w-full flex flex-col items-center mx-0">
      {/* SVG shape LEFT - shifted fully left with drop shadow */}
      <div style={{}} className="absolute left-0 top-0 z-10 w-[180px] sm:w-[220px] md:w-[278px] h-[80px] sm:h-[100px] md:h-[113px] pl-0 ml-0 mx-[5px]">
        <img src="/lovable-uploads/82034807-3457-43fd-9297-f381dab12827.png" alt="Navigation left shape" className="
            w-full h-full object-contain select-none pointer-events-none
            drop-shadow-xl
          " draggable={false} style={{
        // Extra shadow for more "obvious" effect:
        filter: "drop-shadow(0px 6px 22px rgba(34,31,38,0.16)) drop-shadow(0px 4px 10px #221F26)"
      }} />
      </div>

      {/* NAVIGATION BAR OUTER OVERLAY */}
      <div className="
          absolute
          left-[140px] md:left-[156px]
          top-0
          w-[calc(100vw-140px)]
          max-w-[1200px] md:max-w-[1337px] h-[77px] z-0
        " style={{}}>
        {/* Dark base background */}
        <div className="absolute w-full h-full bg-[#0b0b0b] rounded-none" />
        {/* Slightly lighter overlay */}
        <div className="absolute w-full h-full top-0 left-0 bg-[#0b0b0bb8] rounded-none" />
      </div>

      {/* Main FLEX zone overlays everything above */}
      <div className={`
          relative z-20
          flex flex-row items-center justify-between
          w-full
          max-w-[1200px] md:max-w-[1337px] h-[77px]
          mx-auto
          mt-0
        `} style={{
      marginLeft: "0px",
      // Move to left edge
      paddingLeft: "180px" // Leaves space for logo SVG - match width above
    }}>
        {/* Center nav menu - shift left by reducing justify */}
        <div className="flex-grow flex justify-start">
          <NavigationMenu className="bg-transparent shadow-none select-none">
            <NavigationMenuList className="gap-8 md:gap-10">
              {navItems.map(item => <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild className="group inline-flex h-12 items-center justify-center px-6 text-base font-bold text-white transition-colors hover:text-[#4a90e2] focus:text-[#4a90e2] focus:outline-none data-[active]:text-[#4a90e2] uppercase tracking-widest">
                    <Link to={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>)}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Cart icon as slot (extreme right, vertically centered) */}
        <div className="flex-shrink-0 flex items-center justify-end ml-auto h-full pr-6">
          {cartSlot}
        </div>
      </div>
    </nav>;
};
export default Navigation;