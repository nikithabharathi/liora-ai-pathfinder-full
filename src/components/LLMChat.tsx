import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

export default function LLMChat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage.content }),
      });

      const data = await res.json();
      const aiMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
      toast.success("AI replied!");
    } catch (err) {
      console.error(err);
      const errorMessage = { role: "assistant", content: "Error: Could not get a response." };
      setMessages((prev) => [...prev, errorMessage]);
      toast.error("Failed to generate response!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 border rounded-lg shadow-md bg-white flex flex-col h-[80vh]">
      <h2 className="text-2xl font-bold mb-4">LLM Chat</h2>

      <div className="flex-1 overflow-y-auto mb-4 border p-2 rounded bg-gray-50">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded ${
              m.role === "user" ? "bg-blue-100 text-blue-900 self-end" : "bg-gray-200 text-gray-900 self-start"
            }`}
          >
            <strong>{m.role === "user" ? "You" : "AI"}:</strong> {m.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your question here..."
          className="flex-1 p-2 border rounded resize-none h-20"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Send"}
        </button>
      </form>
    </div>
  );
}
