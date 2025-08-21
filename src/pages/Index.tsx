import { useState, useMemo } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { HeroSection } from "@/components/HeroSection";
import { MenuCategories } from "@/components/MenuCategories";
import { SearchFilters } from "@/components/SearchFilters";
import { RestaurantCard } from "@/components/RestaurantCard";
import { MenuItemCard } from "@/components/MenuItemCard";
import { restaurants, getAllMenuItems } from "@/data/restaurants";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [deliveryTimeFilter, setDeliveryTimeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("restaurants");
  const { toast } = useToast();

  const allMenuItems = useMemo(() => getAllMenuItems(), []);

  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants.filter(restaurant => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = restaurant.name.toLowerCase().includes(query);
        const matchesCuisine = restaurant.cuisine.some(c => c.toLowerCase().includes(query));
        const matchesDescription = restaurant.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCuisine && !matchesDescription) return false;
      }

      // Cuisine filter
      if (selectedCuisines.length > 0) {
        const hasMatchingCuisine = selectedCuisines.some(selectedCuisine =>
          restaurant.cuisine.some(restaurantCuisine =>
            restaurantCuisine.toLowerCase().includes(selectedCuisine.toLowerCase())
          )
        );
        if (!hasMatchingCuisine) return false;
      }

      // Rating filter
      if (restaurant.rating < ratingFilter) return false;

      // Price range filter (delivery fee)
      if (restaurant.deliveryFee < priceRange[0] || restaurant.deliveryFee > priceRange[1]) return false;

      // Delivery time filter
      if (deliveryTimeFilter !== "all") {
        const deliveryMinutes = parseInt(restaurant.deliveryTime.split("-")[0]);
        if (deliveryTimeFilter === "fast" && deliveryMinutes >= 30) return false;
        if (deliveryTimeFilter === "medium" && (deliveryMinutes < 30 || deliveryMinutes > 45)) return false;
        if (deliveryTimeFilter === "slow" && deliveryMinutes <= 45) return false;
      }

      return true;
    });

    // Sort restaurants
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "deliveryTime":
          return parseInt(a.deliveryTime.split("-")[0]) - parseInt(b.deliveryTime.split("-")[0]);
        case "deliveryFee":
          return a.deliveryFee - b.deliveryFee;
        case "minOrder":
          return a.minOrder - b.minOrder;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCuisines, sortBy, ratingFilter, priceRange, deliveryTimeFilter]);

  const filteredMenuItems = useMemo(() => {
    if (!searchQuery) return [];
    
    const query = searchQuery.toLowerCase();
    return allMenuItems.filter(item => {
      const matchesName = item.name.toLowerCase().includes(query);
      const matchesDescription = item.description.toLowerCase().includes(query);
      const matchesCategory = item.category.toLowerCase().includes(query);
      
      return matchesName || matchesDescription || matchesCategory;
    }).slice(0, 50); // Limit to 50 results for performance
  }, [searchQuery, allMenuItems]);

  const handleAddToCart = (item: any) => {
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <MainLayout>
      <HeroSection />
      
      <MenuCategories 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      <SearchFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCuisines={selectedCuisines}
        onCuisineToggle={handleCuisineToggle}
        sortBy={sortBy}
        onSortChange={setSortBy}
        ratingFilter={ratingFilter}
        onRatingChange={setRatingFilter}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        deliveryTimeFilter={deliveryTimeFilter}
        onDeliveryTimeChange={setDeliveryTimeFilter}
      />

      <section className="container mx-auto px-4 py-8">
        <Tabs value={searchQuery ? "menu-items" : activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            <TabsTrigger value="menu-items">Menu Items</TabsTrigger>
          </TabsList>

          <TabsContent value="restaurants" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {filteredRestaurants.length} Restaurant{filteredRestaurants.length !== 1 ? 's' : ''} 
                {searchQuery && ` for "${searchQuery}"`}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>

            {filteredRestaurants.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No restaurants found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="menu-items" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {filteredMenuItems.length} Menu Item{filteredMenuItems.length !== 1 ? 's' : ''} 
                {searchQuery && ` for "${searchQuery}"`}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMenuItems.map((item) => {
                const restaurant = restaurants.find(r => r.id === item.restaurantId);
                return (
                  <MenuItemCard 
                    key={item.id} 
                    item={item} 
                    restaurantName={restaurant?.name || "Unknown Restaurant"}
                    onAddToCart={handleAddToCart}
                  />
                );
              })}
            </div>

            {filteredMenuItems.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No menu items found</h3>
                <p className="text-muted-foreground">Try searching for different dishes or ingredients</p>
              </div>
            )}

            {!searchQuery && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Search for menu items</h3>
                <p className="text-muted-foreground">Use the search bar above to find specific dishes</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </MainLayout>
  );
};

export default Index;
