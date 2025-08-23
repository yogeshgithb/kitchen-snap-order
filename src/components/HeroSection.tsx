import { Button } from "@/components/ui/button";
import heroFood from "@/assets/hero-food.jpg";

interface HeroSectionProps {
  onOrderNow?: () => void;
  onViewMenu?: () => void;
}

export const HeroSection = ({ onOrderNow, onViewMenu }: HeroSectionProps) => {
  const handleOrderNow = () => {
    if (onOrderNow) {
      onOrderNow();
    } else {
      // Default behavior - scroll to menu section
      const menuSection = document.getElementById('menu-section');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleViewMenu = () => {
    if (onViewMenu) {
      onViewMenu();
    } else {
      // Default behavior - scroll to browse menu section
      const browseSection = document.getElementById('browse-menu');
      if (browseSection) {
        browseSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative h-[500px] bg-gradient-hero flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroFood})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl px-4">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Fresh Flavors,
          <span className="block bg-gradient-to-r from-primary-glow to-white bg-clip-text text-transparent">
            Fast Delivery
          </span>
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
          Experience gourmet cuisine crafted with love and delivered to your doorstep
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="hero" 
            size="lg" 
            className="text-lg px-8 py-3"
            onClick={handleOrderNow}
          >
            Order Now
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-3 bg-white/10 border-white/30 text-white hover:bg-white/20"
            onClick={handleViewMenu}
          >
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
};