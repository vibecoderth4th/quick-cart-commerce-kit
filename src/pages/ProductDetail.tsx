
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import NotFoundPage from "./NotFound";

type ClothingSize = "S" | "M" | "L" | "XL";

interface SizeQuantity {
  size: ClothingSize;
  quantity: number;
}

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Find product by ID
  const product = products.find((p) => p.id === productId);
  
  // State for size selection
  const [selectedSizes, setSelectedSizes] = useState<SizeQuantity[]>([
    { size: "M", quantity: 1 }
  ]);
  const [totalQuantity, setTotalQuantity] = useState(1);

  // Add effect to scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // If product not found
  if (!product) {
    return <NotFoundPage />;
  }

  // Handle size change
  const handleSizeChange = (index: number, size: ClothingSize) => {
    const newSizes = [...selectedSizes];
    newSizes[index].size = size;
    setSelectedSizes(newSizes);
  };

  // Handle quantity change
  const handleQuantityChange = (index: number, quantity: number) => {
    if (quantity < 1) return;
    
    const newSizes = [...selectedSizes];
    newSizes[index].quantity = quantity;
    setSelectedSizes(newSizes);
    
    // Update total quantity
    const newTotal = newSizes.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(newTotal);
  };

  // Add another size
  const handleAddSize = () => {
    setSelectedSizes([...selectedSizes, { size: "M", quantity: 1 }]);
    setTotalQuantity(totalQuantity + 1);
  };

  // Remove a size
  const handleRemoveSize = (index: number) => {
    if (selectedSizes.length <= 1) return;
    
    const removedQuantity = selectedSizes[index].quantity;
    const newSizes = selectedSizes.filter((_, i) => i !== index);
    setSelectedSizes(newSizes);
    setTotalQuantity(totalQuantity - removedQuantity);
  };

  // Add to cart
  const handleAddToCart = () => {
    selectedSizes.forEach(({ size, quantity }) => {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          ...product,
          size
        });
      }
    });

    toast({
      title: "Added to cart",
      description: `${totalQuantity} item(s) added to your cart`,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-auto object-cover"
            style={{ aspectRatio: "4/5" }}
          />
        </div>
        
        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
          
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Select Size & Quantity</h2>
            
            {selectedSizes.map((sizeObj, index) => (
              <Card key={index} className="p-0">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">Item {index + 1}</span>
                    {selectedSizes.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveSize(index)}
                        className="text-red-500 h-8"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label className="mb-2 block">Size</Label>
                      <RadioGroup 
                        value={sizeObj.size} 
                        onValueChange={(val) => handleSizeChange(index, val as ClothingSize)}
                        className="flex flex-wrap gap-2"
                      >
                        {["S", "M", "L", "XL"].map((size) => (
                          <div key={size} className="flex items-center space-x-2">
                            <RadioGroupItem value={size} id={`size-${size}-${index}`} />
                            <Label htmlFor={`size-${size}-${index}`} className="cursor-pointer">
                              {size}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label htmlFor={`quantity-${index}`} className="mb-2 block">Quantity</Label>
                      <div className="flex items-center w-24">
                        <Button 
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => handleQuantityChange(index, sizeObj.quantity - 1)}
                          disabled={sizeObj.quantity <= 1}
                        >
                          -
                        </Button>
                        <Input
                          id={`quantity-${index}`}
                          type="number"
                          min="1"
                          value={sizeObj.quantity}
                          onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                          className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => handleQuantityChange(index, sizeObj.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleAddSize}
            >
              + Add Another Size
            </Button>
            
            <div className="pt-4 space-y-2">
              <p className="flex justify-between text-lg">
                <span>Total Items:</span>
                <span>{totalQuantity}</span>
              </p>
              <p className="flex justify-between text-xl font-bold">
                <span>Total Price:</span>
                <span>${(product.price * totalQuantity).toFixed(2)}</span>
              </p>
            </div>
            
            <Button 
              className="w-full"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
