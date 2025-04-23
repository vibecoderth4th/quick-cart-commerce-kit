
import React from 'react';
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative rounded-lg overflow-hidden border border-gray-200 bg-white">
      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-gray-900 mb-2">{product.title}</h3>
          <p className="text-base font-bold">${product.price.toFixed(2)}</p>
        </Link>
        <div className="mt-4">
          <Link to={`/product/${product.id}`}>
            <Button 
              variant="outline" 
              className="w-full"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
