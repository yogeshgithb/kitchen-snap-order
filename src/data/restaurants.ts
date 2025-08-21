// Import all food images
import burgerImg from '@/assets/burger.jpg';
import pizzaImg from '@/assets/pizza.jpg';
import saladImg from '@/assets/salad.jpg';
import pastaImg from '@/assets/pasta.jpg';
import sushiImg from '@/assets/sushi.jpg';
import tacosImg from '@/assets/tacos.jpg';
import curryImg from '@/assets/curry.jpg';
import appetizersImg from '@/assets/appetizers.jpg';
import dessertsImg from '@/assets/desserts.jpg';
import beveragesImg from '@/assets/beverages.jpg';
import heroFoodImg from '@/assets/hero-food.jpg';

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  location: string;
  isOpen: boolean;
  badges: string[];
  description: string;
  address: string;
  phone: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isSpicy: boolean;
  rating: number;
  badges: string[];
  restaurantId: string;
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Spice Kingdom",
    image: heroFoodImg,
    cuisine: ["Indian", "Spicy", "Vegetarian"],
    rating: 4.5,
    reviewCount: 1250,
    deliveryTime: "25-35 min",
    deliveryFee: 2.5,
    minOrder: 15,
    location: "Downtown",
    isOpen: true,
    badges: ["Fast Delivery", "High Rated"],
    description: "Authentic Indian cuisine with a modern twist. Experience the rich flavors and aromatic spices.",
    address: "123 Spice Street, Downtown",
    phone: "+1 (555) 123-4567"
  },
  {
    id: "2", 
    name: "Bella Pizzeria",
    image: pizzaImg,
    cuisine: ["Italian", "Pizza", "Pasta"],
    rating: 4.3,
    reviewCount: 890,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    minOrder: 12,
    location: "Little Italy",
    isOpen: true,
    badges: ["Authentic Italian", "Wood Fired"],
    description: "Traditional Italian pizzas made with fresh ingredients and wood-fired ovens.",
    address: "456 Italy Lane, Little Italy",
    phone: "+1 (555) 234-5678"
  },
  {
    id: "3",
    name: "Burger Junction",
    image: burgerImg,
    cuisine: ["American", "Burgers", "Fast Food"],
    rating: 4.1,
    reviewCount: 2100,
    deliveryTime: "15-25 min",
    deliveryFee: 2.99,
    minOrder: 10,
    location: "Food Street",
    isOpen: true,
    badges: ["Quick Bites", "Popular"],
    description: "Juicy burgers made with premium beef and fresh ingredients. Classic American taste.",
    address: "789 Burger Blvd, Food Street", 
    phone: "+1 (555) 345-6789"
  },
  {
    id: "4",
    name: "Fresh Garden",
    image: saladImg,
    cuisine: ["Healthy", "Salads", "Vegan"],
    rating: 4.7,
    reviewCount: 560,
    deliveryTime: "20-30 min",
    deliveryFee: 1.5,
    minOrder: 8,
    location: "Green Valley",
    isOpen: true,
    badges: ["Healthy Choice", "Organic"],
    description: "Fresh, organic salads and healthy bowls. Perfect for health-conscious food lovers.",
    address: "321 Garden Way, Green Valley",
    phone: "+1 (555) 456-7890"
  },
  {
    id: "5",
    name: "Tokyo Sushi Bar",
    image: sushiImg,
    cuisine: ["Japanese", "Sushi", "Seafood"],
    rating: 4.6,
    reviewCount: 780,
    deliveryTime: "30-40 min",
    deliveryFee: 3.5,
    minOrder: 20,
    location: "Asia Town",
    isOpen: false,
    badges: ["Premium", "Fresh Seafood"],
    description: "Authentic Japanese sushi made by master chefs. Fresh fish flown in daily.",
    address: "654 Sushi Street, Asia Town",
    phone: "+1 (555) 567-8901"
  },
  {
    id: "6",
    name: "Taco Fiesta",
    image: tacosImg,
    cuisine: ["Mexican", "Tacos", "Spicy"],
    rating: 4.2,
    reviewCount: 1320,
    deliveryTime: "20-30 min",
    deliveryFee: 2.0,
    minOrder: 12,
    location: "Sunset Strip",
    isOpen: true,
    badges: ["Spicy", "Authentic Mexican"],
    description: "Vibrant Mexican flavors with authentic tacos, burritos, and more.",
    address: "987 Fiesta Ave, Sunset Strip",
    phone: "+1 (555) 678-9012"
  }
];

export const generateMenuItems = (restaurantId: string): MenuItem[] => {
  const categories = ["appetizers", "mains", "pizzas", "salads", "desserts", "beverages"];
  const items: MenuItem[] = [];
  
  const restaurantNames = {
    "1": "Spice Kingdom",
    "2": "Bella Pizzeria", 
    "3": "Burger Junction",
    "4": "Fresh Garden",
    "5": "Tokyo Sushi Bar",
    "6": "Taco Fiesta"
  };

  const itemsByRestaurant = {
    "1": [ // Spice Kingdom - Indian
      { name: "Butter Chicken", desc: "Creamy tomato curry with tender chicken", category: "mains", price: 16.99, isVeg: false },
      { name: "Paneer Tikka", desc: "Grilled cottage cheese with spices", category: "appetizers", price: 12.99, isVeg: true },
      { name: "Biryani", desc: "Aromatic basmati rice with spices", category: "mains", price: 18.99, isVeg: false },
      { name: "Dal Makhani", desc: "Rich black lentils in cream", category: "mains", price: 14.99, isVeg: true },
      { name: "Samosa", desc: "Crispy pastry with spiced filling", category: "appetizers", price: 6.99, isVeg: true },
      { name: "Mango Lassi", desc: "Yogurt-based mango drink", category: "beverages", price: 4.99, isVeg: true },
      { name: "Gulab Jamun", desc: "Sweet milk dumplings in syrup", category: "desserts", price: 7.99, isVeg: true },
      { name: "Tandoori Chicken", desc: "Clay oven roasted chicken", category: "mains", price: 19.99, isVeg: false }
    ],
    "2": [ // Bella Pizzeria - Italian
      { name: "Margherita Pizza", desc: "Classic tomato, mozzarella, basil", category: "pizzas", price: 15.99, isVeg: true },
      { name: "Pepperoni Pizza", desc: "Pepperoni with mozzarella cheese", category: "pizzas", price: 17.99, isVeg: false },
      { name: "Pasta Carbonara", desc: "Creamy pasta with bacon and eggs", category: "mains", price: 16.99, isVeg: false },
      { name: "Bruschetta", desc: "Grilled bread with tomatoes", category: "appetizers", price: 8.99, isVeg: true },
      { name: "Tiramisu", desc: "Coffee-flavored Italian dessert", category: "desserts", price: 8.99, isVeg: true },
      { name: "Caprese Salad", desc: "Fresh mozzarella, tomatoes, basil", category: "salads", price: 12.99, isVeg: true },
      { name: "Italian Soda", desc: "Sparkling flavored water", category: "beverages", price: 3.99, isVeg: true },
      { name: "Quattro Stagioni", desc: "Four seasons pizza with varied toppings", category: "pizzas", price: 19.99, isVeg: false }
    ],
    "3": [ // Burger Junction - American
      { name: "Classic Beef Burger", desc: "Juicy beef patty with lettuce and tomato", category: "mains", price: 12.99, isVeg: false },
      { name: "Chicken Wings", desc: "Spicy buffalo wings with ranch", category: "appetizers", price: 10.99, isVeg: false },
      { name: "Veggie Burger", desc: "Plant-based patty with avocado", category: "mains", price: 11.99, isVeg: true },
      { name: "Loaded Fries", desc: "Fries with cheese, bacon, jalapeños", category: "appetizers", price: 8.99, isVeg: false },
      { name: "Milkshake", desc: "Creamy vanilla milkshake", category: "beverages", price: 5.99, isVeg: true },
      { name: "Onion Rings", desc: "Crispy battered onion rings", category: "appetizers", price: 6.99, isVeg: true },
      { name: "Apple Pie", desc: "Classic American apple pie", category: "desserts", price: 6.99, isVeg: true },
      { name: "BBQ Bacon Burger", desc: "Beef patty with BBQ sauce and bacon", category: "mains", price: 14.99, isVeg: false }
    ],
    "4": [ // Fresh Garden - Healthy
      { name: "Caesar Salad", desc: "Crisp romaine with caesar dressing", category: "salads", price: 11.99, isVeg: true },
      { name: "Quinoa Bowl", desc: "Nutritious quinoa with vegetables", category: "mains", price: 13.99, isVeg: true },
      { name: "Green Smoothie", desc: "Spinach, banana, apple smoothie", category: "beverages", price: 6.99, isVeg: true },
      { name: "Avocado Toast", desc: "Whole grain bread with avocado", category: "appetizers", price: 9.99, isVeg: true },
      { name: "Grilled Chicken Salad", desc: "Mixed greens with grilled chicken", category: "salads", price: 14.99, isVeg: false },
      { name: "Fruit Bowl", desc: "Fresh seasonal fruits", category: "desserts", price: 7.99, isVeg: true },
      { name: "Kombucha", desc: "Fermented tea beverage", category: "beverages", price: 4.99, isVeg: true },
      { name: "Buddha Bowl", desc: "Mixed grains, vegetables, and protein", category: "mains", price: 15.99, isVeg: true }
    ],
    "5": [ // Tokyo Sushi Bar - Japanese
      { name: "California Roll", desc: "Crab, avocado, cucumber roll", category: "mains", price: 12.99, isVeg: false },
      { name: "Salmon Sashimi", desc: "Fresh raw salmon slices", category: "appetizers", price: 15.99, isVeg: false },
      { name: "Chicken Teriyaki", desc: "Grilled chicken with teriyaki sauce", category: "mains", price: 17.99, isVeg: false },
      { name: "Miso Soup", desc: "Traditional soybean soup", category: "appetizers", price: 4.99, isVeg: true },
      { name: "Sake", desc: "Traditional Japanese rice wine", category: "beverages", price: 8.99, isVeg: true },
      { name: "Green Tea Ice Cream", desc: "Matcha flavored ice cream", category: "desserts", price: 6.99, isVeg: true },
      { name: "Tempura", desc: "Lightly battered and fried vegetables", category: "appetizers", price: 11.99, isVeg: true },
      { name: "Dragon Roll", desc: "Eel and cucumber topped with avocado", category: "mains", price: 18.99, isVeg: false }
    ],
    "6": [ // Taco Fiesta - Mexican
      { name: "Beef Tacos", desc: "Seasoned ground beef in corn tortillas", category: "mains", price: 11.99, isVeg: false },
      { name: "Guacamole & Chips", desc: "Fresh avocado dip with tortilla chips", category: "appetizers", price: 7.99, isVeg: true },
      { name: "Chicken Burrito", desc: "Grilled chicken with rice and beans", category: "mains", price: 13.99, isVeg: false },
      { name: "Quesadilla", desc: "Cheese-filled grilled tortilla", category: "appetizers", price: 9.99, isVeg: true },
      { name: "Margarita", desc: "Classic lime margarita", category: "beverages", price: 8.99, isVeg: true },
      { name: "Churros", desc: "Fried dough with cinnamon sugar", category: "desserts", price: 6.99, isVeg: true },
      { name: "Nachos Supreme", desc: "Tortilla chips with cheese and toppings", category: "appetizers", price: 12.99, isVeg: false },
      { name: "Fish Tacos", desc: "Grilled fish with cabbage slaw", category: "mains", price: 14.99, isVeg: false }
    ]
  };

  const baseItems = itemsByRestaurant[restaurantId as keyof typeof itemsByRestaurant] || itemsByRestaurant["1"];
  
  const getImageForCategory = (category: string, itemName: string) => {
    const name = itemName.toLowerCase();
    
    // Specific food type mappings
    if (name.includes('pizza')) return pizzaImg;
    if (name.includes('burger')) return burgerImg;
    if (name.includes('salad')) return saladImg;
    if (name.includes('curry') || name.includes('chicken') || name.includes('biryani') || name.includes('dal')) return curryImg;
    if (name.includes('sushi') || name.includes('sashimi') || name.includes('roll') || name.includes('tempura')) return sushiImg;
    if (name.includes('taco') || name.includes('burrito') || name.includes('quesadilla') || name.includes('nachos')) return tacosImg;
    if (name.includes('pasta') || name.includes('carbonara') || name.includes('spaghetti')) return pastaImg;
    
    // Category-based fallbacks
    switch (category) {
      case 'pizzas': return pizzaImg;
      case 'salads': return saladImg;
      case 'appetizers': return appetizersImg;
      case 'desserts': return dessertsImg;
      case 'beverages': return beveragesImg;
      case 'mains': 
        if (restaurantId === '1') return curryImg;
        if (restaurantId === '2') return pastaImg;
        if (restaurantId === '5') return sushiImg;
        if (restaurantId === '6') return tacosImg;
        return burgerImg;
      default: return heroFoodImg;
    }
  };

  baseItems.forEach((item, index) => {
    items.push({
      id: `${restaurantId}-${index + 1}`,
      name: item.name,
      description: item.desc,
      price: item.price,
      image: getImageForCategory(item.category, item.name),
      category: item.category,
      isVeg: item.isVeg,
      isSpicy: Math.random() > 0.7,
      rating: 3.5 + Math.random() * 1.5,
      badges: Math.random() > 0.6 ? ["Popular"] : [],
      restaurantId
    });
  });

  // Add more items to reach 500+ total across all restaurants
  const additionalItems = Math.floor(80 + Math.random() * 20); // 80-100 items per restaurant
  
  for (let i = baseItems.length; i < additionalItems; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const itemNumber = i + 1;
    
    const getImageForAdditionalItem = (category: string) => {
      switch (category) {
        case 'pizzas': return pizzaImg;
        case 'salads': return saladImg;
        case 'appetizers': return appetizersImg;
        case 'desserts': return dessertsImg;
        case 'beverages': return beveragesImg;
        case 'mains':
          if (restaurantId === '1') return curryImg;
          if (restaurantId === '2') return pastaImg;
          if (restaurantId === '5') return sushiImg;
          if (restaurantId === '6') return tacosImg;
          return burgerImg;
        default: return heroFoodImg;
      }
    };

    items.push({
      id: `${restaurantId}-${itemNumber}`,
      name: `${restaurantNames[restaurantId as keyof typeof restaurantNames]} Special ${itemNumber}`,
      description: `Delicious ${category} item made with premium ingredients and our special recipe.`,
      price: 8.99 + Math.random() * 15,
      image: getImageForAdditionalItem(category),
      category,
      isVeg: Math.random() > 0.6,
      isSpicy: Math.random() > 0.7,
      rating: 3.5 + Math.random() * 1.5,
      badges: Math.random() > 0.7 ? ["Chef's Special", "New"].filter(() => Math.random() > 0.5) : [],
      restaurantId
    });
  }

  return items;
};

export const getAllMenuItems = (): MenuItem[] => {
  const allItems: MenuItem[] = [];
  restaurants.forEach(restaurant => {
    allItems.push(...generateMenuItems(restaurant.id));
  });
  return allItems;
};