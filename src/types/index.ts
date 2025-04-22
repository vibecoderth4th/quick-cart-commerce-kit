
export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: "men" | "women" | "collectibles";
};

export type CartItem = {
  product: Product;
  quantity: number;
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
