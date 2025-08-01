import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Kitchen Order</h3>
            <p className="text-primary-foreground/80 mb-4">
              Delicious food delivered fresh to your doorstep. Experience the best flavors in town.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">123 Food Street, City 12345</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@kitchenorder.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4" />
                <div className="text-sm">
                  <div>Mon - Thu: 9:00 AM - 10:00 PM</div>
                  <div>Fri - Sat: 9:00 AM - 11:00 PM</div>
                  <div>Sunday: 10:00 AM - 9:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <div className="hover:text-accent cursor-pointer transition-colors">About Us</div>
              <div className="hover:text-accent cursor-pointer transition-colors">Menu</div>
              <div className="hover:text-accent cursor-pointer transition-colors">Delivery</div>
              <div className="hover:text-accent cursor-pointer transition-colors">Privacy Policy</div>
              <div className="hover:text-accent cursor-pointer transition-colors">Terms of Service</div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-sm text-primary-foreground/70">
            © 2024 Kitchen Order. All rights reserved. Made with ❤️ for food lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};