import { useState } from "react";
import { Header } from "@/components/store/Header";
import { ProductGrid } from "@/components/store/ProductGrid";
import { Cart } from "@/components/store/Cart";
import { ProductModal } from "@/components/store/ProductModal";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Footer from "@/components/store/Footer";

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => setIsCartOpen(true)} />
      {/* Offer Carousel with spacing below navbar */}
      <div className="mt-8 mb-12">
        <Carousel className="w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl relative">
          <CarouselContent>
            <CarouselItem>
              <img src="/placeholder.svg" alt="Offer 1" className="w-full h-64 object-cover" />
            </CarouselItem>
            <CarouselItem>
              <img src="/placeholder.svg" alt="Offer 2" className="w-full h-64 object-cover" />
            </CarouselItem>
            <CarouselItem>
              <img src="/placeholder.svg" alt="Offer 3" className="w-full h-64 object-cover" />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to TechStore
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest in technology with our curated selection of premium electronics, 
            gadgets, and accessories. Quality products at competitive prices.
          </p>
        </div>
        {/* Best Selling Products Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-blue-700">Best Selling Products</h2>
          <p className="text-gray-600">Check out our most popular and top-selling tech items!</p>
        </div>
        <ProductGrid onProductClick={setSelectedProduct} />
        {/* See All Products Button */}
        <div className="flex justify-center mt-8 mb-8">
          <a href="/products" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition-colors duration-200 text-lg">
            See All Products
          </a>
        </div>
        {/* Store Story Section */}
        <section className="mt-20 mb-20 bg-white rounded-3xl shadow-2xl p-12 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-5xl font-extrabold text-blue-700 mb-6">Our Story</h2>
            <p className="text-2xl text-gray-700 mb-4">
              <span className="font-semibold">TechStore</span> is proud to be the <span className="text-blue-600 font-bold">first Iraqi website dedicated to technology</span>.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Founded with a vision to bring the latest and greatest in tech to Iraq, we strive to make premium electronics, gadgets, and accessories accessible to everyone in the country. Our mission is to empower the Iraqi community with cutting-edge technology, excellent service, and a trusted local platform.
            </p>
          </div>
          <div className="flex-1 flex flex-row justify-center gap-6">
            <img src="/placeholder.svg" alt="TechStore Iraq" className="w-56 h-56 object-cover rounded-2xl shadow-lg border-4 border-blue-100" />
            <img src="/placeholder.svg" alt="Tech Products" className="w-56 h-56 object-cover rounded-2xl shadow-lg border-4 border-blue-100 hidden md:block" />
          </div>
        </section>
      </main>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
      <Footer />
    </div>
  );
};

export default Index;
