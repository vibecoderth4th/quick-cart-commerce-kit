
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Minus, Plus, X } from "lucide-react";
import PaymentOptions from "./PaymentOptions";

const Cart = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    totalItems,
    totalPrice,
    clearCart
  } = useCart();

  const [checkoutMode, setCheckoutMode] = useState(false);

  const handleCheckout = () => {
    setCheckoutMode(true);
  };

  const handlePaymentComplete = () => {
    clearCart();
    setCheckoutMode(false);
    setIsCartOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsCartOpen(true)}
        className="relative p-2"
        aria-label="Shopping Cart"
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{checkoutMode ? "Checkout" : "Your Cart"}</SheetTitle>
          </SheetHeader>
          
          {checkoutMode ? (
            <div className="mt-8">
              <PaymentOptions 
                cartItems={cartItems} 
                totalPrice={totalPrice} 
                onPaymentComplete={handlePaymentComplete}
              />
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setCheckoutMode(false)}
                >
                  Back to Cart
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">Your cart is empty</p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.product.image}
                          alt={item.product.title}
                          className="h-16 w-16 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-medium">{item.product.title}</p>
                          <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 ml-2"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
