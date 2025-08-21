import { Star, Clock, Leaf, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/data/restaurants";

interface MenuItemCardProps {
  item: MenuItem;
  restaurantName: string;
  onAddToCart?: (item: MenuItem) => void;
}

export const MenuItemCard = ({ item, restaurantName, onAddToCart }: MenuItemCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-2 right-2 flex gap-1">
            {item.isVeg && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Leaf className="h-3 w-3 mr-1" />
                Veg
              </Badge>
            )}
            {item.isSpicy && (
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                <Flame className="h-3 w-3 mr-1" />
                Spicy
              </Badge>
            )}
          </div>
          <div className="absolute top-2 left-2">
            <Badge className="bg-primary/90 text-primary-foreground">
              ${item.price.toFixed(2)}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.name}</h3>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{item.rating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-muted-foreground">from {restaurantName}</span>
            </div>
          </div>

          {item.badges.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {item.badges.map((badge, index) => (
                <Badge key={index} variant="outline">
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          <Button 
            className="w-full" 
            onClick={() => onAddToCart?.(item)}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};