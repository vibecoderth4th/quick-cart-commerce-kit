
import { useState, useRef } from "react";
import HeroSlider from "@/components/HeroSlider";
import ProductCategoryTabs from "@/components/ProductCategoryTabs";
import ProductCard from "@/components/ProductCard";
import { products, getProductsByCategory } from "@/data/products";
import Loader from "@/components/Loader";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("men");
  const menSectionRef = useRef<HTMLDivElement>(null);
  const womenSectionRef = useRef<HTMLDivElement>(null);
  const collectiblesSectionRef = useRef<HTMLDivElement>(null);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <>
      <Loader />
      
      <HeroSlider />
      
      <ProductCategoryTabs onCategoryChange={handleCategoryChange} />
      
      <div className="container mx-auto px-4 space-y-16 mb-16">
        <div id="men-section" ref={menSectionRef}>
          <h2 className="text-2xl font-bold mb-6">Men's Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getProductsByCategory("men").map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        <div id="women-section" ref={womenSectionRef}>
          <h2 className="text-2xl font-bold mb-6">Women's Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getProductsByCategory("women").map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        <div id="collectibles-section" ref={collectiblesSectionRef}>
          <h2 className="text-2xl font-bold mb-6">Collectibles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getProductsByCategory("collectibles").map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
