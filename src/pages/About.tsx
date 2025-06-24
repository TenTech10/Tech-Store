import { Header } from "@/components/store/Header";
import { Cart } from "@/components/store/Cart";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Truck, Award, Users } from "lucide-react";
import Footer from "@/components/store/Footer";

const About = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const features = [
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your data and transactions are protected with enterprise-grade security."
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Free shipping on orders over $100 with express delivery options."
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "All products come with manufacturer warranty and our satisfaction guarantee."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Our technical support team is here to help you 24/7."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About TechStore
            </h1>
            <p className="text-lg text-gray-600">
              Your trusted partner for premium technology products since 2020
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, TechStore began with a simple mission: to make cutting-edge technology 
              accessible to everyone. We believe that great technology should enhance your life, not 
              complicate it.
            </p>
            <p className="text-gray-600 mb-4">
              Our team of tech enthusiasts carefully curates every product in our store, ensuring 
              that we only offer the highest quality electronics, gadgets, and accessories. From 
              the latest smartphones to premium audio equipment, we've got everything you need to 
              stay connected and productive.
            </p>
            <p className="text-gray-600">
              Today, we're proud to serve thousands of customers worldwide, delivering not just 
              products, but exceptional experiences that exceed expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                    <span>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional customer service, competitive prices, 
              and the latest technology trends. Your satisfaction is our priority, and we 
              stand behind every product we sell.
            </p>
          </div>
        </div>
      </main>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
    </div>
  );
};

export default About;
