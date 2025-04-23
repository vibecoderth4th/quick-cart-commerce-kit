
export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: "men" | "women" | "collectibles";
  size?: "S" | "M" | "L" | "XL";
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderItem = {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  size: string;
};

export type Order = {
  id: string;
  email: string;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "completed";
  date: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
};

export type AdminSession = {
  isLoggedIn: boolean;
  email?: string;
};

// API types for Express-style handlers
export type ApiRequest = {
  method?: string;
  query: Record<string, string | string[]>;
  cookies: Record<string, string>;
  body: any;
};

export type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (data: any) => void;
};
