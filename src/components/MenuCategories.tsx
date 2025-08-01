import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", name: "All", icon: "🍽️" },
  { id: "mains", name: "Main Dishes", icon: "🍖" },
  { id: "pizzas", name: "Pizzas", icon: "🍕" },
  { id: "salads", name: "Salads", icon: "🥗" },
  { id: "appetizers", name: "Appetizers", icon: "🥟" },
  { id: "desserts", name: "Desserts", icon: "🍰" },
  { id: "beverages", name: "Beverages", icon: "🥤" },
];

interface MenuCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const MenuCategories = ({ activeCategory, onCategoryChange }: MenuCategoriesProps) => {
  return (
    <section className="py-8 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-center mb-6 text-foreground">
          Browse Our Menu
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                activeCategory === category.id && "shadow-warm"
              )}
            >
              <span className="text-lg">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};