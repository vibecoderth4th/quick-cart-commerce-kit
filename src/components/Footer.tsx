
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="/men" className="text-gray-600 hover:text-black">Men</a></li>
              <li><a href="/women" className="text-gray-600 hover:text-black">Women</a></li>
              <li><a href="/collectibles" className="text-gray-600 hover:text-black">Collectibles</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="/contact" className="text-gray-600 hover:text-black">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Shipping</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Returns</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black">Our Story</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Sustainability</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-600 hover:text-black">
                <Facebook />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Instagram />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Twitter />
              </a>
            </div>
            <p className="text-gray-600">Subscribe to our newsletter</p>
            <form className="mt-2 flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 border border-gray-300 rounded-l-md flex-1 outline-none"
              />
              <button 
                type="submit" 
                className="bg-black text-white px-4 py-2 rounded-r-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-gray-600 text-sm">© 2025 E-Commerce Store. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-black text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-black text-sm">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-black text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
