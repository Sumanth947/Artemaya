import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]); // Store chat messages
  const [input, setInput] = useState(''); // Input state
  const [isTyping, setIsTyping] = useState(false); // Typing indicator

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to messages array
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsTyping(true);

    // Dummy API response simulation
    setTimeout(() => {
      const dummyResponses = {
        "What is your name?": "I am your friendly AI chatbot!",
        "How can you help me?": "I can assist with answering questions, providing information, and more!",
        "Tell me a fun fact.": "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible!",
        "What foods can help during my period?": "Foods rich in iron and magnesium, like spinach, dark chocolate, and nuts, can help reduce cramps and fatigue.",
        "What diet is good for managing PCOS?": "A diet rich in whole grains, lean protein, and low in processed sugars can help manage PCOS symptoms effectively.",
        "How does nutrition affect menstrual health?": "Proper nutrition can balance hormones, reduce symptoms like cramps, and improve overall menstrual health."
      };

      const response = dummyResponses[input] || "I'm sorry, I don't have an answer for that.";
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg p-3 max-w-md shadow-md transition-all duration-200 ${
                  message.role === 'user'
                    ? 'bg-pink-500 text-white'
                    : 'bg-white text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 rounded-lg p-3 shadow-md">AI is typing...</div>
            </div>
          )}
        </div>
      </div>

      {/* Input Form */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-pink-500 text-white py-2 px-4 rounded-r-md hover:bg-pink-600 transition-colors duration-300 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
