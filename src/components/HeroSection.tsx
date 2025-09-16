import { useState, useEffect } from "react";
import { Sparkles, Target, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Welcome to Liora — Your AI Career & Skills Advisor";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Target,
      title: "Career Guidance",
      description: "Personalized career path recommendations based on your goals and skills",
    },
    {
      icon: TrendingUp,
      title: "Skills Development",
      description: "Identify skill gaps and get curated learning resources",
    },
    {
      icon: Users,
      title: "Industry Insights",
      description: "Stay updated with market trends and industry demands",
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-hero animate-fade-in">
      <div className="text-center max-w-4xl mx-auto space-y-8">
        {/* Hero Title with Typing Animation */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary animate-float" />
            <div className="w-2 h-2 bg-gradient-primary rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-gradient-secondary rounded-full animate-pulse [animation-delay:0.2s]" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="gradient-text">
              {displayText}
            </span>
            <span className="animate-pulse text-primary">|</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Unlock your potential with AI-powered career guidance, personalized skill assessments, 
            and strategic insights to navigate your professional journey with confidence.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="bg-gradient-card card-float animate-fade-in border-border/50"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Start Prompts */}
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          {[
            "Help me transition to tech",
            "What skills should I learn?",
            "Career assessment",
            "Industry trends"
          ].map((prompt, index) => (
            <button
              key={prompt}
              className="px-4 py-2 bg-muted/50 hover:bg-accent rounded-full text-sm 
                       transition-all duration-300 hover:scale-105 border border-border/50 
                       hover:border-primary/50 card-float"
              style={{ animationDelay: `${index * 0.1 + 0.8}s` }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}