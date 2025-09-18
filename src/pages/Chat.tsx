import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ChatInput } from "@/components/ChatInput";

const Chat = () => {
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

        {/* Main Chat Content */}
        <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)]">
          {/* Chat Header */}
          <div className="border-b border-border bg-background/80 backdrop-blur-md">
            <div className="max-w-4xl mx-auto px-6 py-4">
              <h1 className="text-2xl font-bold gradient-text">AI Career Chat</h1>
              <p className="text-muted-foreground mt-1">
                Get personalized career advice and guidance from Liora AI
              </p>
            </div>
          </div>

          {/* Chat Input */}
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default Chat;
