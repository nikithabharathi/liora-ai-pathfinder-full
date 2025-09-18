import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Clock, 
  MessageCircle, 
  Search, 
  TrendingUp,
  Crown,
  Settings,
  Moon,
  Sun,
  LogOut,
  CreditCard,
  Star,
  ChevronDown,
  Edit,
  Bell,
  Shield,
  HelpCircle,
  Download,
  Share,
  Heart,
  Award,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Zap
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  const [userHistory] = useState([
    { id: 1, action: "Asked about career transition to tech", time: "2 hours ago", icon: MessageCircle },
    { id: 2, action: "Searched for UX design skills", time: "1 day ago", icon: Search },
    { id: 3, action: "Career assessment completed", time: "3 days ago", icon: TrendingUp },
    { id: 4, action: "Skills gap analysis", time: "1 week ago", icon: Clock },
    { id: 5, action: "Industry trends report", time: "2 weeks ago", icon: TrendingUp },
  ]);
  
  const [userData] = useState(() => {
    try {
      const raw = localStorage.getItem("liora_user");
      if (!raw) return null;
      const user = JSON.parse(raw) as { 
        firstName?: string; 
        lastName?: string; 
        email?: string;
        phone?: string;
        location?: string;
        website?: string;
        joinDate?: string;
        lastActive?: string;
      };
      return user;
    } catch {
      return null;
    }
  });

  const displayName = userData ? 
    `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || userData.email || "Guest" 
    : "Guest";

  const handleLogout = () => {
    localStorage.removeItem("liora_user");
    navigate("/");
    setShowProfileMenu(false);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    // Apply theme to document
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

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
                <div className="space-y-4">
                  {/* Profile Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {!logoError ? (
                        <img 
                          src="/image-removebg-preview.png" 
                          alt="Liora" 
                          className="w-8 h-8 object-contain"
                          onError={() => setLogoError(true)}
                        />
                      ) : (
                        <User size={20} className="text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm">{displayName || "Guest"}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-gradient-secondary text-white border-0 px-2 py-1"
                        >
                          <Crown size={10} className="mr-1" />
                          Pro Plan
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="h-8 w-8"
                    >
                      <ChevronDown size={16} />
                    </Button>
                  </div>

                  {/* User Stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Award size={12} />
                      <span>Level 5</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Star size={12} />
                      <span>2.4k Points</span>
                    </div>
                  </div>

                  {/* Profile Menu */}
                  {showProfileMenu && (
                    <div className="space-y-2 pt-2 border-t border-border/50">
                      {/* User Info Section */}
                      <div className="space-y-2 pb-2">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Profile</h4>
                        
                        {/* Edit Profile */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-sm"
                          onClick={() => {
                            // Navigate to edit profile page
                            setShowProfileMenu(false);
                          }}
                        >
                          <Edit size={16} className="mr-2" />
                          Edit Profile
                        </Button>

                        {/* Contact Info */}
                        {userData?.email && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground px-2 py-1">
                            <Mail size={12} />
                            <span className="truncate">{userData.email}</span>
                          </div>
                        )}
                        
                        {userData?.phone && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground px-2 py-1">
                            <Phone size={12} />
                            <span>{userData.phone}</span>
                          </div>
                        )}
                        
                        {userData?.location && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground px-2 py-1">
                            <MapPin size={12} />
                            <span>{userData.location}</span>
                          </div>
                        )}
                      </div>

                      <Separator className="my-2" />

                      {/* App Features */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Features</h4>
                        
                        {/* Settings */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-sm"
                          onClick={() => {
                            setShowProfileMenu(false);
                          }}
                        >
                          <Settings size={16} className="mr-2" />
                          Settings
                        </Button>

                        {/* Notifications */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-sm"
                          onClick={() => {
                            setShowProfileMenu(false);
                          }}
                        >
                          <Bell size={16} className="mr-2" />
                          Notifications
                        </Button>

                        {/* Theme Toggle */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-sm"
                          onClick={toggleTheme}
                        >
                          {isDarkMode ? <Sun size={16} className="mr-2" /> : <Moon size={16} className="mr-2" />}
                          {isDarkMode ? "Light Mode" : "Dark Mode"}
                        </Button>

                        {/* Privacy & Security */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-sm"
                          onClick={() => {
                            setShowProfileMenu(false);
                          }}
                        >
                          <Shield size={16} className="mr-2" />
                          Privacy & Security
                        </Button>
                      </div>

                      <Separator className="my-2" />

                      {/* Subscription & Billing */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Subscription</h4>
                        
                        {/* Manage Plan */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-sm"
                          onClick={() => {
                            setShowProfileMenu(false);
                          }}
                        >
                          <CreditCard size={16} className="mr-2" />
                          Manage Plan
                        </Button>

                        {/* Usage Stats */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-sm"
                          onClick={() => {
                            setShowProfileMenu(false);
                          }}
                        >
                          <Zap size={16} className="mr-2" />
                          Usage Stats
                        </Button>
                      </div>

                      <Separator className="my-2" />

                      {/* Support & Actions */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Support</h4>
                        
                        {/* Help */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-sm"
                          onClick={() => {
                            setShowProfileMenu(false);
                          }}
                        >
                          <HelpCircle size={16} className="mr-2" />
                          Help & Support
                        </Button>

                        {/* Export Data */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-sm"
                          onClick={() => {
                            setShowProfileMenu(false);
                          }}
                        >
                          <Download size={16} className="mr-2" />
                          Export Data
                        </Button>

                        {/* Share Profile */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-sm"
                          onClick={() => {
                            setShowProfileMenu(false);
                          }}
                        >
                          <Share size={16} className="mr-2" />
                          Share Profile
                        </Button>
                      </div>

                      <Separator className="my-2" />

                      {/* Logout */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-sm text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </aside>
    </>
  );
}