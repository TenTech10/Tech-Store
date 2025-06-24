import { ShoppingCart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Product } from "./CartContext";

interface HeaderProps {
  onCartClick: () => void;
  onSearch?: (query: string) => void;
}

// Sample products for search (in a real app, this would come from an API or context)
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

export const Header = ({ onCartClick, onSearch }: HeaderProps) => {
  const { state } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  // Filter products based on search query
  const filterProducts = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filtered.slice(0, 5)); // Limit to 5 results
  };

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterProducts(query);
    setShowResults(query.length > 0);
    
    if (onSearch) {
      onSearch(query);
    }
  };

  // Handle search result click
  const handleResultClick = (product: Product) => {
    setSearchQuery("");
    setShowResults(false);
    navigate(`/products?search=${encodeURIComponent(product.name)}`);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowResults(false);
    };

    if (showResults) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showResults]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-blue-600">TechStore</Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors">Products</Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 relative">
              <Search className="w-5 h-5 text-gray-400" />
              <Input 
                placeholder="Search products..." 
                className="w-64"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowResults(searchQuery.length > 0)}
              />
              
              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => handleResultClick(product)}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <p className="text-xs text-gray-500">{product.category}</p>
                        <p className="text-sm font-semibold text-blue-600">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/account">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
