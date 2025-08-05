/** @copyright Kaustav Ray */
import React, { useState } from 'react';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB9-KCEDBXj9V8BeBgjOgjZt_yxuGHU3sw',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
          }),
        }
      );

      const data = await res.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

      setMessages([...newMessages, { type: 'bot', text: botReply }]);
    } catch (err) {
      console.error('Error:', err);
      setMessages([...newMessages, { type: 'bot', text: 'Error occurred. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Gemini AI Chatbot</h1>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg h-[70vh] overflow-y-auto mb-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-3 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block px-4 py-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-left">
              <div className="inline-block px-4 py-2 rounded-lg bg-gray-700 animate-pulse">Typing...</div>
            </div>
          )}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-1 p-3 rounded-l-lg bg-gray-800 border border-gray-600 focus:outline-none"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-r-lg"
            onClick={handleSend}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
