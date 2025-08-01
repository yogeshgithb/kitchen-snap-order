import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus } from "lucide-react";
import burgerImg from "@/assets/burger.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import saladImg from "@/assets/salad.jpg";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  badges?: string[];
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Gourmet Beef Burger",
    description: "Premium beef patty with fresh lettuce, tomatoes, and our signature sauce",
    price: 16.99,
    category: "mains",
    image: burgerImg,
    badges: ["Popular", "Spicy"]
  },
  {
    id: "2",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, basil, and tomato sauce on our homemade dough",
    price: 14.99,
    category: "pizzas",
    image: pizzaImg,
    badges: ["Vegetarian"]
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan, croutons, and caesar dressing",
    price: 12.99,
    category: "salads",
    image: saladImg,
    badges: ["Healthy", "Vegetarian"]
  },
  {
    id: "4",
    name: "BBQ Chicken Burger",
    description: "Grilled chicken breast with BBQ sauce, bacon, and onion rings",
    price: 15.99,
    category: "mains",
    image: burgerImg,
    badges: ["New"]
  },
  {
    id: "5",
    name: "Pepperoni Pizza",
    description: "Classic pepperoni with mozzarella cheese and tomato sauce",
    price: 16.99,
    category: "pizzas",
    image: pizzaImg,
    badges: ["Popular"]
  },
  {
    id: "6",
    name: "Greek Salad",
    description: "Fresh vegetables with feta cheese, olives, and Mediterranean dressing",
    price: 13.99,
    category: "salads",
    image: saladImg,
    badges: ["Healthy"]
  }
];

interface MenuGridProps {
  activeCategory: string;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

export const MenuGrid = ({ activeCategory, onAddToCart }: MenuGridProps) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const updateQuantity = (itemId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const quantity = quantities[item.id] || 1;
    onAddToCart(item, quantity);
    setQuantities(prev => ({ ...prev, [item.id]: 0 }));
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-warm transition-all duration-300 hover:scale-105">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                {item.badges && (
                  <div className="absolute top-2 left-2 flex gap-1">
                    {item.badges.map((badge) => (
                      <Badge 
                        key={badge} 
                        variant={badge === "Popular" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={!quantities[item.id]}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {quantities[item.id] || 1}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant="cart" 
                  className="w-full"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};