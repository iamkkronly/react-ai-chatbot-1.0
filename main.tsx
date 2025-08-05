// © 2025 Kaustav Ray

import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { SendHorizonal } from "lucide-react";

const API_KEY = "AIzaSyB9-KCEDBXj9V8BeBgjOgjZt_yxuGHU3sw";

interface Message {
  role: "user" | "bot";
  content: string;
}

function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              ...messages.map((m) => ({
                role: m.role,
                parts: [{ text: m.content }],
              })),
              {
                role: "user",
                parts: [{ text: input }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const botText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      setMessages((prev) => [...prev, { role: "bot", content: botText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error fetching response." },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 p-4 flex flex-col items-center justify-start">
      <h1 className="text-4xl font-bold text-purple-800 mb-6">✨ AI ChatBot</h1>

      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl flex flex-col h-[70vh]">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-[80%] ${
                msg.role === "user"
                  ? "bg-blue-100 self-end ml-auto"
                  : "bg-gray-100 self-start mr-auto"
              }`}
            >
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {msg.content}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          className="flex gap-2 border-t p-3"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow rounded-full px-4 py-2 border border-gray-300 focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full"
          >
            <SendHorizonal size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<ChatBot />);
