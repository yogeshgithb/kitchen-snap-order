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

// Generate 500+ menu items
const generateMenuItems = (): MenuItem[] => {
  const categories = ["mains", "pizzas", "salads", "appetizers", "desserts", "beverages"];
  const images = [burgerImg, pizzaImg, saladImg];
  const badges = [["Popular"], ["New"], ["Spicy"], ["Vegetarian"], ["Healthy"], ["Chef's Special"], ["Limited"], []];
  
  const baseItems = [
    // Mains
    { name: "Gourmet Beef Burger", desc: "Premium beef patty with fresh ingredients", category: "mains" },
    { name: "Chicken Tikka Burger", desc: "Spiced chicken with yogurt sauce", category: "mains" },
    { name: "Fish & Chips", desc: "Crispy battered fish with golden fries", category: "mains" },
    { name: "Grilled Chicken", desc: "Herb-marinated grilled chicken breast", category: "mains" },
    { name: "Beef Steak", desc: "Tender beef steak cooked to perfection", category: "mains" },
    { name: "Lamb Curry", desc: "Slow-cooked lamb in aromatic spices", category: "mains" },
    { name: "Pork Ribs", desc: "BBQ glazed pork ribs", category: "mains" },
    { name: "Chicken Wings", desc: "Spicy buffalo chicken wings", category: "mains" },
    
    // Pizzas
    { name: "Margherita Pizza", desc: "Classic tomato, mozzarella, and basil", category: "pizzas" },
    { name: "Pepperoni Pizza", desc: "Spicy pepperoni with cheese", category: "pizzas" },
    { name: "Vegetarian Pizza", desc: "Fresh vegetables and herbs", category: "pizzas" },
    { name: "Meat Lovers Pizza", desc: "Multiple meats with cheese", category: "pizzas" },
    { name: "Hawaiian Pizza", desc: "Ham and pineapple combination", category: "pizzas" },
    { name: "BBQ Chicken Pizza", desc: "BBQ sauce with grilled chicken", category: "pizzas" },
    { name: "Mushroom Pizza", desc: "Wild mushrooms with truffle oil", category: "pizzas" },
    { name: "Seafood Pizza", desc: "Mixed seafood with garlic", category: "pizzas" },
    
    // Salads
    { name: "Caesar Salad", desc: "Crisp romaine with parmesan", category: "salads" },
    { name: "Greek Salad", desc: "Mediterranean vegetables with feta", category: "salads" },
    { name: "Garden Salad", desc: "Fresh mixed greens", category: "salads" },
    { name: "Chicken Salad", desc: "Grilled chicken with mixed greens", category: "salads" },
    { name: "Tuna Salad", desc: "Fresh tuna with vegetables", category: "salads" },
    { name: "Quinoa Salad", desc: "Healthy quinoa with vegetables", category: "salads" },
    { name: "Fruit Salad", desc: "Seasonal fresh fruits", category: "salads" },
    { name: "Spinach Salad", desc: "Baby spinach with nuts", category: "salads" },
    
    // Appetizers
    { name: "Chicken Nuggets", desc: "Crispy chicken pieces", category: "appetizers" },
    { name: "Onion Rings", desc: "Golden fried onion rings", category: "appetizers" },
    { name: "Mozzarella Sticks", desc: "Breaded mozzarella cheese", category: "appetizers" },
    { name: "Garlic Bread", desc: "Toasted bread with garlic butter", category: "appetizers" },
    { name: "Spring Rolls", desc: "Crispy vegetable rolls", category: "appetizers" },
    { name: "Chicken Samosa", desc: "Spiced chicken in pastry", category: "appetizers" },
    { name: "Potato Wedges", desc: "Seasoned potato wedges", category: "appetizers" },
    { name: "Nachos", desc: "Tortilla chips with cheese", category: "appetizers" },
    
    // Desserts
    { name: "Chocolate Cake", desc: "Rich chocolate layer cake", category: "desserts" },
    { name: "Ice Cream", desc: "Vanilla ice cream scoop", category: "desserts" },
    { name: "Tiramisu", desc: "Italian coffee-flavored dessert", category: "desserts" },
    { name: "Cheesecake", desc: "Creamy New York style", category: "desserts" },
    { name: "Apple Pie", desc: "Traditional apple pie slice", category: "desserts" },
    { name: "Brownie", desc: "Fudgy chocolate brownie", category: "desserts" },
    { name: "Fruit Tart", desc: "Fresh fruit on pastry", category: "desserts" },
    { name: "Pudding", desc: "Creamy vanilla pudding", category: "desserts" },
    
    // Beverages
    { name: "Coffee", desc: "Freshly brewed coffee", category: "beverages" },
    { name: "Tea", desc: "Selection of hot teas", category: "beverages" },
    { name: "Soda", desc: "Carbonated soft drinks", category: "beverages" },
    { name: "Juice", desc: "Fresh fruit juices", category: "beverages" },
    { name: "Smoothie", desc: "Fruit and yogurt blend", category: "beverages" },
    { name: "Milkshake", desc: "Thick creamy milkshake", category: "beverages" },
    { name: "Water", desc: "Bottled mineral water", category: "beverages" },
    { name: "Energy Drink", desc: "Refreshing energy boost", category: "beverages" }
  ];
  
  const items: MenuItem[] = [];
  
  // Generate items by repeating and varying base items
  for (let i = 0; i < 500; i++) {
    const baseItem = baseItems[i % baseItems.length];
    const variation = Math.floor(i / baseItems.length) + 1;
    
    items.push({
      id: (i + 1).toString(),
      name: variation > 1 ? `${baseItem.name} ${variation}` : baseItem.name,
      description: baseItem.desc,
      price: parseFloat((Math.random() * 20 + 5).toFixed(2)),
      category: baseItem.category,
      image: images[Math.floor(Math.random() * images.length)],
      badges: badges[Math.floor(Math.random() * badges.length)]
    });
  }
  
  return items;
};

const menuItems = generateMenuItems();

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-warm transition-all duration-300 hover:scale-105 bg-gradient-to-br from-background to-muted/30">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-32 object-cover"
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
              
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-semibold leading-tight line-clamp-2">{item.name}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground line-clamp-2">{item.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="p-3 pt-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-primary">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={!quantities[item.id]}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-sm font-medium">
                      {quantities[item.id] || 1}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-3 pt-0">
                <Button 
                  variant="cart" 
                  className="w-full h-8 text-xs"
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