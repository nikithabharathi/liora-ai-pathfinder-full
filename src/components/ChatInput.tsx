import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, Plus } from "lucide-react";

export function ChatInput() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Simulate sending message
    setIsTyping(true);
    console.log("Sending message:", message);
    
    // Clear input
    setMessage("");
    
    // Simulate response delay
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
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

  return (
    <div className="sticky bottom-0 bg-background/80 backdrop-blur-md border-t border-border p-4">
      <div className="max-w-4xl mx-auto">
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