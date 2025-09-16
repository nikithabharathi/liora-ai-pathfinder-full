import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ isSidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border animate-fade-in">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <Button
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          
          {/* Liora Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <h1 className="text-xl font-bold gradient-text">Liora</h1>
          </div>
        </div>

        {/* Desktop auth buttons - shown only on larger screens when sidebar is collapsed */}
        <div className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Login
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90 button-glow">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}