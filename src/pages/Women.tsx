
import { products, getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Loader from "@/components/Loader";

const Women = () => {
  const womenProducts = getProductsByCategory("women");

  return (
    <>
      <Loader />
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Women's Collection</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {womenProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Women;
