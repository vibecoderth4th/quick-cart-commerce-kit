
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductCategoryTabsProps {
  onCategoryChange: (category: string) => void;
}

const ProductCategoryTabs = ({ onCategoryChange }: ProductCategoryTabsProps) => {
  const [activeCategory, setActiveCategory] = useState("men");

  const handleTabChange = (value: string) => {
    setActiveCategory(value);
    onCategoryChange(value);

    // Scroll to the appropriate section
    const section = document.getElementById(`${value}-section`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs value={activeCategory} onValueChange={handleTabChange} className="w-full justify-center">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="men" className="flex-1 sm:flex-initial">Men</TabsTrigger>
          <TabsTrigger value="women" className="flex-1 sm:flex-initial">Women</TabsTrigger>
          <TabsTrigger value="collectibles" className="flex-1 sm:flex-initial">Collectibles</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ProductCategoryTabs;
