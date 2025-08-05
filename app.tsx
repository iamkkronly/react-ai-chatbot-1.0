// Copyright (c) Kaustav Ray

import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyB9-KCEDBXj9V8BeBgjOgjZt_yxuGHU3sw'; // Replace with your Gemini API key

export default function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = `You: ${input}`;
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
        {
          contents: [{ parts: [{ text: input }] }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            key: API_KEY,
          },
        }
      );

      const aiResponse = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      setMessages((prev) => [...prev, `Gemini: ${aiResponse}`]);
    } catch (error) {
      setMessages((prev) => [...prev, 'Gemini: Failed to fetch response.']);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Gemini AI Chatbot</h1>
        <div className="h-96 overflow-y-auto border rounded p-3 space-y-2 mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded ${
                msg.startsWith('You') ? 'bg-blue-50 text-right' : 'bg-gray-50 text-left'
              }`}
            >
              {msg}
            </div>
          ))}
          {loading && <div className="italic text-gray-500">Gemini is typing...</div>}
        </div>
        <div className="flex items-center space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
