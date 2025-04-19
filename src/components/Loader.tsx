
import { useEffect, useState } from "react";

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-20 h-20 relative">
        {/* LOADER: replace with your own PNG animation as needed */}
        <img 
          src="/public/placeholder.svg" 
          alt="Loading" 
          className="w-full h-full animate-pulse"
        />
      </div>
    </div>
  );
};

export default Loader;
