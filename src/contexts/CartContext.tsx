
import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/types";

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    
    // Calculate total items and price
    const items = cartItems.reduce((total, item) => total + item.quantity, 0);
    setTotalItems(items);
    
    const price = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity, 
      0
    );
    setTotalPrice(price);
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      // For products with sizes, we don't group them
      if (product.size) {
        return [...prevItems, { product, quantity: 1 }];
      }

      // For products without sizes, check if exists and update quantity
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && !item.product.size
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      }

      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (index: number) => {
    setCartItems((prevItems) => 
      prevItems.filter((_, i) => i !== index)
    );
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }

    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = quantity;
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
