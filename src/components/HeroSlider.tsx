
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "New Summer Collection",
    description: "Discover our latest styles for the season",
    cta: "Shop Now",
    ctaLink: "/men",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Exclusive Collectibles",
    description: "Limited edition items for true connoisseurs",
    cta: "Explore",
    ctaLink: "/collectibles",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    title: "Women's Fashion",
    description: "Elegant designs for every occasion",
    cta: "View Collection",
    ctaLink: "/women",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  // Reset transition state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="relative hero-slide overflow-hidden">
      <div className="absolute inset-0 flex transform transition-transform duration-500 ease-in-out">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`h-full w-full flex-shrink-0 transition-opacity duration-500 ease-in-out absolute inset-0 ${
              index === currentSlide 
                ? "opacity-100 z-10" 
                : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-md text-white space-y-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl opacity-90">
                    {slide.description}
                  </p>
                  <Button asChild size="lg" className="mt-4">
                    <a href={slide.ctaLink}>{slide.cta}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20"
        onClick={prevSlide}
        disabled={isTransitioning}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20"
        onClick={nextSlide}
        disabled={isTransitioning}
      >
        <ArrowRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-12 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
