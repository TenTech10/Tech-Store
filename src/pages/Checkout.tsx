import React, { useState } from "react";
import { Header } from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import { useCart } from "@/components/store/CartContext";
import { Button } from "@/components/ui/button";
import { Calendar, Truck } from "lucide-react";

const Checkout = () => {
  const { state, dispatch } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculate estimated arrival date (3-5 business days from today)
  const calculateArrivalDate = () => {
    const today = new Date();
    const arrivalDate = new Date(today);
    arrivalDate.setDate(today.getDate() + 5); // 5 days from today
    
    // Format the date
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return arrivalDate.toLocaleDateString('en-US', options);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onCartClick={() => {}} />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        {orderPlaced ? (
          <div className="bg-green-100 text-green-800 rounded-lg p-8 text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Thank you for your order!</h2>
            <p>Your order has been placed successfully. We will contact you soon.</p>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow p-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            {/* Estimated Arrival Date */}
            {state.items.length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">Estimated Arrival</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-700 font-medium">{calculateArrivalDate()}</span>
                </div>
                <p className="text-sm text-blue-600 mt-1">Free shipping on orders over $100</p>
              </div>
            )}
            
            {state.items.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-blue-600 font-semibold">${item.price}</p>
                      <div className="text-gray-500 text-xs mt-2">Quantity: {item.quantity}</div>
                    </div>
                    <div className="font-bold text-blue-700 text-lg">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-between items-center w-full text-lg font-semibold mb-6">
              <span>Total:</span>
              <span className="text-blue-700">${state.total.toFixed(2)}</span>
            </div>
            <Button
              className="w-full py-3 text-lg font-bold"
              size="lg"
              onClick={handlePlaceOrder}
              disabled={state.items.length === 0}
            >
              Place Order
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Checkout; 