import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/store/Header";
import { ProductGrid } from "@/components/store/ProductGrid";
import { Cart } from "@/components/store/Cart";
import { ProductModal } from "@/components/store/ProductModal";
import { Button } from "@/components/ui/button";
import { Product } from "@/components/store/CartContext";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { DollarSign, Search, X } from "lucide-react";

const Products = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = ["All", "Audio", "Phones", "Gaming", "Accessories"];

  const allProducts: Product[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
      category: "Audio",
      rating: 4.8,
      inStock: true
    },
    {
      id: 2,
      name: "Smartphone Pro",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      description: "Latest smartphone with advanced camera system and 5G connectivity.",
      category: "Phones",
      rating: 4.9,
      inStock: true
    },
    {
      id: 3,
      name: "Gaming Console",
      price: 499.99,
      image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=400&h=300&fit=crop",
      description: "Next-generation gaming console with 4K graphics and immersive gameplay.",
      category: "Gaming",
      rating: 4.7,
      inStock: false
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
      description: "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
      category: "Audio",
      rating: 4.5,
      inStock: true
    },
    {
      id: 5,
      name: "Wireless Mouse",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
      description: "Ergonomic wireless mouse with precision tracking and long battery life.",
      category: "Accessories",
      rating: 4.3,
      inStock: true
    },
    {
      id: 6,
      name: "Laptop Stand",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1527142879-c2d18ba0451c?w=400&h=300&fit=crop",
      description: "Adjustable aluminum laptop stand for better ergonomics and cooling.",
      category: "Accessories",
      rating: 4.4,
      inStock: false
    }
  ];

  // Handle search from URL parameters
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  // Handle search from header
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchParams({});
  };

  const filteredProducts = allProducts.filter(product => {
    const inCategory = selectedCategory === "All" || product.category === selectedCategory;
    const inPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const inRating = product.rating >= minRating;
    const inSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return inCategory && inPrice && inRating && inSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => setIsCartOpen(true)} onSearch={handleSearch} />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-lg text-gray-600">Discover our collection of premium technology products</p>
        </div>

        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">
                  Search results for: "{searchQuery}"
                </span>
                <span className="text-blue-600 text-sm">
                  ({filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found)
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearSearch}
                className="text-blue-600 hover:text-blue-800"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  min={0}
                  step={10}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating: {minRating} stars
              </label>
              <Slider
                value={[minRating]}
                onValueChange={(value) => setMinRating(value[0])}
                max={5}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          {filteredProducts.length > 0 ? (
            <ProductGrid onProductClick={setSelectedProduct} products={filteredProducts} />
          ) : (
            <div className="col-span-full text-center text-gray-500 py-12">
              {searchQuery ? 
                `No products found matching "${searchQuery}". Try adjusting your search or filters.` : 
                "No products match your filters."
              }
            </div>
          )}
        </div>
      </main>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default Products;
