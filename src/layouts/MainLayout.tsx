import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface MainLayoutProps {
  children: ReactNode;
  cartItemCount?: number;
  onCartClick?: () => void;
}

export const MainLayout = ({ children, cartItemCount, onCartClick }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header cartItemCount={cartItemCount} onCartClick={onCartClick} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};