import { ProductCard } from "./ProductCard";
import { Product } from "./CartContext";

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
    category: "Audio",
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: "Smartphone Pro Max",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    description: "Latest flagship smartphone with advanced camera system and lightning-fast performance.",
    category: "Phones",
    rating: 4.9,
    inStock: true
  },
  {
    id: 3,
    name: "Gaming Mechanical Keyboard",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
    description: "RGB backlit mechanical keyboard designed for gaming enthusiasts.",
    category: "Gaming",
    rating: 4.7,
    inStock: true
  },
  {
    id: 4,
    name: "4K Webcam",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop",
    description: "Ultra HD webcam perfect for streaming and video conferences.",
    category: "Accessories",
    rating: 4.6,
    inStock: true
  },
  {
    id: 5,
    name: "Wireless Mouse",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
    description: "Ergonomic wireless mouse with precision tracking and long battery life.",
    category: "Accessories",
    rating: 4.5,
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

interface ProductGridProps {
  onProductClick: (product: Product) => void;
  products?: Product[];
}

export const ProductGrid = ({ onProductClick, products }: ProductGridProps) => {
  const displayProducts = products || sampleProducts;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayProducts.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
};
