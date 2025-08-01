import { Search, Filter, Star, Clock, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCuisines: string[];
  onCuisineToggle: (cuisine: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  ratingFilter: number;
  onRatingChange: (rating: number) => void;
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  deliveryTimeFilter: string;
  onDeliveryTimeChange: (time: string) => void;
}

const cuisines = ["Indian", "Italian", "American", "Healthy", "Japanese", "Mexican", "Chinese", "Thai", "Mediterranean"];

export const SearchFilters = ({
  searchQuery,
  onSearchChange,
  selectedCuisines,
  onCuisineToggle,
  sortBy,
  onSortChange,
  ratingFilter,
  onRatingChange,
  priceRange,
  onPriceRangeChange,
  deliveryTimeFilter,
  onDeliveryTimeChange
}: SearchFiltersProps) => {
  return (
    <div className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-[88px] z-40 py-4">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search restaurants, cuisines, or dishes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 h-12 text-base"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Sort */}
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="deliveryTime">Delivery Time</SelectItem>
              <SelectItem value="deliveryFee">Delivery Fee</SelectItem>
              <SelectItem value="minOrder">Min Order</SelectItem>
            </SelectContent>
          </Select>

          {/* Delivery Time */}
          <Select value={deliveryTimeFilter} onValueChange={onDeliveryTimeChange}>
            <SelectTrigger className="w-[140px]">
              <Clock className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Delivery Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Time</SelectItem>
              <SelectItem value="fast">Under 30 min</SelectItem>
              <SelectItem value="medium">30-45 min</SelectItem>
              <SelectItem value="slow">45+ min</SelectItem>
            </SelectContent>
          </Select>

          {/* Advanced Filters */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                {/* Rating Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Minimum Rating</label>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Slider
                      value={[ratingFilter]}
                      onValueChange={(value) => onRatingChange(value[0])}
                      max={5}
                      min={0}
                      step={0.5}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium min-w-[2rem]">{ratingFilter}+</span>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Delivery Fee</label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <Slider
                      value={priceRange}
                      onValueChange={onPriceRangeChange}
                      max={10}
                      min={0}
                      step={0.5}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium min-w-[4rem]">${priceRange[0]}-${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Clear Filters */}
          {(selectedCuisines.length > 0 || ratingFilter > 0 || priceRange[0] > 0 || priceRange[1] < 10 || deliveryTimeFilter !== "all") && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                selectedCuisines.forEach(cuisine => onCuisineToggle(cuisine));
                onRatingChange(0);
                onPriceRangeChange([0, 10]);
                onDeliveryTimeChange("all");
              }}
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Cuisine Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {cuisines.map((cuisine) => (
            <Badge
              key={cuisine}
              variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/80 transition-colors"
              onClick={() => onCuisineToggle(cuisine)}
            >
              {cuisine}
            </Badge>
          ))}
        </div>

        {/* Active Filters Display */}
        {selectedCuisines.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedCuisines.map((cuisine) => (
              <Badge key={cuisine} variant="secondary" className="gap-1">
                {cuisine}
                <button
                  onClick={() => onCuisineToggle(cuisine)}
                  className="hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};