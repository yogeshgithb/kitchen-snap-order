import { ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export const Header = ({ cartItemCount = 0, onCartClick }: HeaderProps) => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-warm bg-clip-text text-transparent">
              Kitchen Snap
            </h1>
            <div className="hidden md:flex items-center space-x-2 bg-secondary rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search menu..."
                className="border-0 bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          {onCartClick && (
            <Button
              variant="cart"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              Cart
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};