import { Clock, Star, MapPin, Badge } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/data/restaurants";
import { useNavigate } from "react-router-dom";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-warm transition-all duration-300 cursor-pointer overflow-hidden">
      <div className="relative" onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-semibold">Currently Closed</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {restaurant.badges.map((badge, index) => (
            <span key={index} className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
              {badge}
            </span>
          ))}
        </div>
      </div>
      
      <CardContent className="p-4" onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{restaurant.rating}</span>
            <span className="text-muted-foreground text-sm">({restaurant.reviewCount})</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {restaurant.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {restaurant.cuisine.map((cuisine, index) => (
            <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
              {cuisine}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{restaurant.location}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-muted-foreground">Delivery:</span>
            <span className="font-medium ml-1">${restaurant.deliveryFee}</span>
            <span className="text-muted-foreground ml-2">Min:</span>
            <span className="font-medium ml-1">${restaurant.minOrder}</span>
          </div>
          <Button 
            variant="default" 
            size="sm"
            disabled={!restaurant.isOpen}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/restaurant/${restaurant.id}`);
            }}
          >
            {restaurant.isOpen ? "Order Now" : "Closed"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};