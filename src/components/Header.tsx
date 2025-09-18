import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
            <img
              src="/image-removebg-preview.png"  // 🔑 must be in /public folder
              alt="Liora Logo"
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-xl font-bold gradient-text">Liora</h1>
          </div>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <Link to="/chat">Chat</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button
            asChild
            className="bg-gradient-primary hover:opacity-90 button-glow"
          >
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
