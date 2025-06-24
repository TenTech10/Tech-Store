import { X, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product, useCart } from "./CartContext";
import { useState } from "react";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const { dispatch } = useCart();
  // Example images for the gallery
  const images = [
    product.image,
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"
  ];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left: Vertical Image Gallery */}
            <div className="flex flex-col items-center md:w-1/3 w-full">
              <img 
                src={selectedImage} 
                alt={product.name}
                className="w-full h-80 object-cover rounded-xl mb-4 shadow-lg transition-all duration-200"
              />
              <div className="flex flex-row gap-2 justify-center w-full">
                {images.map((img, idx) => (
                  <img
                    key={img}
                    src={img}
                    alt={`thumb${idx+1}`}
                    className={`w-16 h-16 object-cover rounded-md border-2 cursor-pointer transition-all duration-150 ${selectedImage === img ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>
            {/* Right: Product Details */}
            <div className="flex-1 flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 text-sm">({product.rating} / 5)</span>
                <span className="ml-2 text-blue-600 text-xs">23 reviews</span>
              </div>
              <div className="text-4xl font-bold text-blue-700 mb-2">${product.price}</div>
              <div className="flex items-center gap-4 mb-2">
                <Badge variant={product.inStock ? "default" : "destructive"} className="mb-0">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              <p className="text-gray-700 text-base mb-4">{product.description}</p>
              {/* Quantity Selector */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-gray-700">Quantity:</span>
                <button
                  className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold flex items-center justify-center"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  type="button"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-14 text-center border rounded px-2 py-1"
                />
                <button
                  className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold flex items-center justify-center"
                  onClick={() => setQuantity(q => q + 1)}
                  type="button"
                >
                  +
                </button>
              </div>
              <Button
                className="w-full py-4 text-lg font-bold"
                variant="default"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </CardContent>
        {/* User Comments Section */}
        <div className="px-8 pb-8">
          <div className="mt-8 bg-gray-50 rounded-lg shadow-inner p-2 max-w-3xl mx-auto w-full">
            <h3 className="text-lg font-bold text-blue-700 mb-2">User Comments</h3>
            <div className="overflow-y-auto flex flex-col items-center gap-4 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent max-h-40 min-h-[170px]">
              {[
                { name: "Ali", text: "Great product, fast delivery and excellent quality!", rating: 5 },
                { name: "Sara", text: "I love it! Highly recommended for anyone looking for tech in Iraq.", rating: 4 },
                { name: "Omar", text: "Customer support was very helpful. Will buy again.", rating: 5 }
              ].map((comment, idx) => (
                <div key={idx} className="bg-white rounded p-4 shadow w-full max-w-[350px] flex flex-col mx-auto">
                  <span className="font-semibold text-gray-800 mb-1">{comment.name}:</span>
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < comment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">{comment.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
