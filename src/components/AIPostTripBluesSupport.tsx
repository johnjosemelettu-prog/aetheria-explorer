import React, { useState } from 'react';

const AIPostTripBluesSupport = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        text: "I understand you're feeling down after your trip. It's completely normal. How about we try to focus on the wonderful memories you made?",
        sender: 'ai',
      };
      setMessages([...newMessages, aiResponse]);
    }, 1000);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI-Generated "Post-Trip Blues" Support Chatbot</h1>
      <div className="border rounded-lg p-4 h-64 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span
              className={`inline-block p-2 rounded-lg ${
                message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border rounded-l-lg p-2"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIPostTripBluesSupport;
