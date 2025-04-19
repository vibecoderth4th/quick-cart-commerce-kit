
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
