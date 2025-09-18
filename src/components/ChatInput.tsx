import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Mic, Plus, Bot } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatInput() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const careerResponses = [
    "That's a great question! Career transitions can be exciting. What specific field are you considering moving into?",
    "I understand you're thinking about your career path. Could you tell me more about your current skills and interests?",
    "Career development is a journey! What particular aspect of your career would you like to focus on - skills, direction, or growth opportunities?",
    "I'm here to help with your career goals. Are you looking for advice on skill development, job searching, or career planning?",
    "That's an interesting career question. What's your background, and what kind of change are you hoping to make?",
    "Career growth is important! Tell me about your current situation and where you'd like to be in the future.",
    "I'd love to help you with your career journey. What specific challenges or opportunities are you facing right now?"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: message.trim(),
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const randomResponse = careerResponses[Math.floor(Math.random() * careerResponses.length)];
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="sticky bottom-0 bg-background/80 backdrop-blur-md border-t border-border">
      {/* Messages Display */}
      {messages.length > 0 && (
        <div className="max-w-4xl mx-auto p-4 max-h-60 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 animate-fade-in ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!msg.isUser && (
                  <div>
                    <img className="w-8 h-8" src="/image-removebg-preview.png" />
                  </div>
                )}
                
                <Card className={`max-w-md ${
                  msg.isUser 
                    ? "bg-gradient-primary text-white" 
                    : "bg-gradient-card"
                }`}>
                  <CardContent className="p-3">
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-2 ${
                      msg.isUser ? "text-white/70" : "text-muted-foreground"
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </CardContent>
                </Card>

                {msg.isUser && (
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium">You</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-2 bg-gradient-card rounded-2xl p-3 card-float">
            {/* Add attachment button */}
            <Button 
              type="button"
              variant="ghost" 
              size="icon"
              className="shrink-0 hover:bg-accent"
            >
              <Plus size={20} />
            </Button>

            {/* Text input */}
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isTyping ? "Liora is thinking..." : "Ask me anything about your career journey..."}
                className={`
                  resize-none border-0 bg-transparent focus-visible:ring-0 
                  placeholder:text-muted-foreground/70 min-h-[40px] max-h-32
                  ${isTyping ? 'typing-indicator' : ''}
                `}
                disabled={isTyping}
                rows={1}
              />
            </div>

            {/* Voice input button */}
            <Button 
              type="button"
              variant="ghost" 
              size="icon"
              className="shrink-0 hover:bg-accent"
            >
              <Mic size={20} />
            </Button>

            {/* Send button */}
            <Button 
              type="submit"
              size="icon"
              className="shrink-0 bg-gradient-primary hover:opacity-90 button-glow"
              disabled={!message.trim() || isTyping}
            >
              <Send size={20} />
            </Button>
          </div>
        </form>

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground animate-fade-in">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
            </div>
            <span>Liora is analyzing your question...</span>
          </div>
        )}
      </div>
    </div>
  );
}