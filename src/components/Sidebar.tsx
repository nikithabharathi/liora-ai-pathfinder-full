import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Clock, 
  MessageCircle, 
  Search, 
  TrendingUp,
  Crown
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [userHistory] = useState([
    { id: 1, action: "Asked about career transition to tech", time: "2 hours ago", icon: MessageCircle },
    { id: 2, action: "Searched for UX design skills", time: "1 day ago", icon: Search },
    { id: 3, action: "Career assessment completed", time: "3 days ago", icon: TrendingUp },
    { id: 4, action: "Skills gap analysis", time: "1 week ago", icon: Clock },
    { id: 5, action: "Industry trends report", time: "2 weeks ago", icon: TrendingUp },
  ]);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-background border-r border-border 
        transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:top-0 md:h-[calc(100vh-4rem)] md:translate-x-0
        animate-slide-in
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Auth Buttons */}
          <div className="space-y-3 mb-6">
            <Button 
              asChild
              className="w-full bg-gradient-primary hover:opacity-90 button-glow card-float"
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="w-full hover:bg-accent card-float"
            >
              <Link to="/login">Login</Link>
            </Button>
          </div>

          {/* User History */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <Clock size={16} />
              Recent Activity
            </h3>
            
            <ScrollArea className="h-[300px]">
              <div className="space-y-3">
                {userHistory.map((item) => (
                  <Card key={item.id} className="bg-gradient-card card-float cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <item.icon size={16} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate">
                            {item.action}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.time}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* User Profile Card */}
          <div className="mt-6">
            <Card className="bg-gradient-card card-float border border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <User size={24} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">Alex Johnson</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-gradient-secondary text-white border-0 px-2 py-1"
                      >
                        <Crown size={12} className="mr-1" />
                        Pro Plan
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </aside>
    </>
  );
}