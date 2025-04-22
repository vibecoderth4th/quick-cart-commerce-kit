
import { Product } from "@/types";

export const products: Product[] = [
  // Men's products
  {
    id: "men-1",
    title: "Classic Oxford Shirt",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    category: "men",
  },
  {
    id: "men-2",
    title: "Slim Fit Chinos",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1552783858-1e57c3e6fabb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    category: "men",
  },
  {
    id: "men-3",
    title: "Casual Blazer",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    category: "men",
  },
  {
    id: "men-4",
    title: "Leather Loafers",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
    category: "men",
  },
  
  // Women's products
  {
    id: "women-1",
    title: "Silk Blouse",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80",
    category: "women",
  },
  {
    id: "women-2",
    title: "High-Waisted Trousers",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1548549557-dbe9946621da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    category: "women",
  },
  {
    id: "women-3",
    title: "Cashmere Sweater",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1608234807905-4466023792f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "women",
  },
  {
    id: "women-4",
    title: "Designer Dress",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=873&q=80",
    category: "women",
  },
  
  // Collectibles
  {
    id: "collectibles-1",
    title: "Limited Edition Watch",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    category: "collectibles",
  },
  {
    id: "collectibles-2",
    title: "Vintage Leather Bag",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80",
    category: "collectibles",
  },
  {
    id: "collectibles-3",
    title: "Handcrafted Sunglasses",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    category: "collectibles",
  },
  {
    id: "collectibles-4",
    title: "Artisan Jewelry",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "collectibles",
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};
