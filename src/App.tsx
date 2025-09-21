import { useState } from "react";

const Chat = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userPrompt) return;
    setLoading(true);

    try {
      const response = await fetch("/.netlify/functions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      const data = await response.json();
      setReply(data.reply);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setReply("Failed to get response from AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Career & Skills Advisor</h1>
      <textarea
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        placeholder="Enter your career question..."
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Thinking..." : "Ask AI"}
      </button>
      {reply && (
        <div>
          <h2>AI Response:</h2>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
