import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { HeroSection } from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Target, Users, TrendingUp } from "lucide-react";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)]">
          {/* Hero Section */}
          <HeroSection />

          {/* Features Section */}
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold gradient-text mb-4">
                Your AI-Powered Career Journey
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover your potential, explore opportunities, and accelerate your career growth with personalized AI guidance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Card className="bg-gradient-card card-float">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI Career Guidance</h3>
                  <p className="text-muted-foreground">
                    Get personalized career advice tailored to your skills, interests, and goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card card-float">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Target size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Skill Assessment</h3>
                  <p className="text-muted-foreground">
                    Identify your strengths and discover areas for professional development.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card card-float">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
                  <p className="text-muted-foreground">
                    Track your progress and get insights to advance in your chosen field.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Card className="bg-gradient-card card-float max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold gradient-text mb-4">
                    Ready to Start Your Career Journey?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Join thousands of professionals who are already using Liora to accelerate their careers.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 button-glow">
                      <Link to="/chat">
                        Start Chatting
                        <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="card-float">
                      <Link to="/signup">
                        Get Started Free
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
