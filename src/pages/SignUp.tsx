import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt:", formData);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Liora
        </Button>

        {/* Signup Card */}
        <Card className="bg-gradient-card card-float border-border/50">
          <CardHeader className="text-center space-y-2">
            {/* Logo */}
            <div className="w-20 h-20 mx-auto mb-4">
              <img 
                src="/image-removebg-preview.png" 
                alt="Liora Logo" 
                className="w-full h-full object-contain"
              />
            </div>

            <CardTitle className="text-2xl gradient-text">Join Liora</CardTitle>
            <p className="text-muted-foreground">Start your AI-powered career journey today</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Alex"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Johnson"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                    className="bg-background/50"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="bg-background/50"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    className="bg-background/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters with numbers and letters
                </p>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                  }
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the{" "}
                  <Link to="#" className="text-primary hover:text-primary/80">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="#" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Signup Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90 button-glow"
                disabled={!formData.agreeToTerms}
              >
                Create Account
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            {/* Social Signup */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full card-float">
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full card-float">
                Continue with LinkedIn
              </Button>
            </div>

            {/* Login Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link 
                to="/login" 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
