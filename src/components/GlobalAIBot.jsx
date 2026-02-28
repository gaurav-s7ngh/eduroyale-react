import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function GlobalAIBot({ isOpen, onClose }) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatLog, setChatLog] = useState([
    { sender: 'AI', text: 'SYSTEM ONLINE. I am the EduRoyale AI Core. Ask me about algorithms, physics, or platform rules.' }
  ]);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setChatLog(prev => [...prev, { sender: 'USER', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key Missing! Check your .env file.");

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // The "System Prompt" that gives the AI its personality
      const prompt = `
        You are the "AI Core" for a retro-cyberpunk educational platform called EduRoyale. 
        Keep answers strictly under 3 short paragraphs. 
        Be encouraging, slightly robotic/cyberpunk in your tone, and format clearly.
        Do NOT use markdown like **bold** or *italics*, just use plain text so it renders cleanly in my HTML.
        User asks: ${userMessage}
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      setChatLog(prev => [...prev, { sender: 'AI', text: responseText }]);
    } catch (error) {
      console.error(error);
      setChatLog(prev => [...prev, { sender: 'AI', text: "⚠️ ERROR: Connection to neural net severed. Check API key or internet connection." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // If not open, render nothing or render it hidden off-screen (we'll use transform for smooth sliding)
  return (
    <div 
      className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-black/95 border-l-4 border-retroBlue shadow-[-10px_0_30px_rgba(60,172,255,0.2)] z-[99999] transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {/* ── HEADER ── */}
      <div className="flex justify-between items-center p-4 border-b-2 border-gray-800 bg-retroBlue/10">
        <div className="flex items-center gap-3">
          <span className="text-2xl animate-pulse">🤖</span>
          <div>
            <div className="font-pixel text-[8px] text-retroBlue">GLOBAL UPLINK</div>
            <div className="font-pixel text-[12px] text-white">AI_CORE_v1.0</div>
          </div>
        </div>
        <button onClick={onClose} className="font-pixel text-retroPink hover:text-white text-xl">
          [X]
        </button>
      </div>

      {/* ── CHAT HISTORY ── */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 font-terminal text-xl">
        {chatLog.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.sender === 'USER' ? 'items-end' : 'items-start'}`}>
            <span className={`font-pixel text-[8px] mb-1 ${msg.sender === 'USER' ? 'text-retroGreen' : 'text-retroBlue'}`}>
              {msg.sender === 'USER' ? '▶ PLAYER' : '▶ SYSTEM'}
            </span>
            <div className={`p-3 max-w-[90%] border-2 leading-tight ${
              msg.sender === 'USER' 
                ? 'bg-retroGreen/10 border-retroGreen text-retroGreen' 
                : 'bg-retroBlue/10 border-retroBlue text-white'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex flex-col items-start">
             <span className="font-pixel text-[8px] mb-1 text-retroBlue">▶ SYSTEM</span>
             <div className="p-3 border-2 bg-retroBlue/10 border-retroBlue text-white animate-pulse">
               Querying database...
             </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* ── INPUT FORM ── */}
      <form onSubmit={handleSubmit} className="p-4 border-t-2 border-gray-800 bg-black">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Initialize query..."
            className="flex-1 bg-transparent border-2 border-gray-700 text-white font-terminal text-xl p-2 outline-none focus:border-retroBlue transition-colors"
          />
          <button type="submit" disabled={isTyping} className="bg-retroBlue/20 border-2 border-retroBlue text-retroBlue font-pixel text-[10px] px-4 hover:bg-retroBlue hover:text-black transition-colors disabled:opacity-50">
            SEND
          </button>
        </div>
      </form>
    </div>
  );
}