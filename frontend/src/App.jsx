/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { IoIosSend } from "react-icons/io";
import ThemeToggle from './ThemeToggle';
import { useEffect, useRef, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [sessionId] = useState(uuidv4());
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMessage = { sender: "user", text: query };
    setChat((prev) => [...prev, userMessage]);

    const currentQuery = query; // Capture current query
    setQuery("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Show typing...
    const typingMessage = { sender: "bot", text: "Typing..." };
    setChat((prev) => [...prev, typingMessage]);

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        session_id: sessionId,
        message: currentQuery,
      });

      // Replace "Typing..." with real reply
      setChat((prev) => [
        ...prev.slice(0, -1), // Remove the last "Typing..." message
        { sender: "bot", text: res.data.reply },
      ]);
    } catch (err) {
      console.error("Error during API call:", err);
      setChat((prev) => [
        ...prev.slice(0, -1),
        { sender: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleNewChat = () => {
    setLoading(true);
    setQuery('');
    setChat([]);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const placeholders = [
    "Are you interested in investing in Real Estate in Bangalore?",
    "Looking for high ROI properties in Whitefield?",
    "Want to buy a 2BHK apartment near Electronic City?",
    "Searching for pre-launch villa projects in Bangalore?",
    "Need guidance on commercial properties in Bangalore?",
    "Feel free to ask me anything about real estate in Bangalore!"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState(placeholders[0]);
  const textareaRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAnimatedPlaceholder("");
    const timeout = setTimeout(() => {
      setAnimatedPlaceholder(placeholders[currentIndex]);
    }, 200);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <>
      {loading && (
        <div className="absolute w-screen h-screen inset-0 z-50 flex items-center justify-center backdrop-blur bg-white/20">
          <div className="w-10 h-10 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div
        className="absolute fixed inset-0 h-screen w-screen bg-cover bg-center -z-10 bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }}
      ></div>

      <div className="h-screen w-screen backdrop-blur-sm py-4 bg-white/25 text-[#1a1a1a] z-10">
        {/* Header */}
        <div className="absolute fixed flex justify-between items-center p-4">
          <div
            onClick={handleNewChat}
            className="flex fixed absolute items-center space-x-2 text-xl font-bold cursor-pointer bg-white/70 px-4 hover:shadow shadow-gray-400 hover:bg-white py-1.5 absolute top-4 rounded-full"
          >
            <FaEdit color="#2c2c2c" />
            <span className="text-gray-800">New</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Greeting */}
        <div className="text-center bg-white/50 w-fit m-auto px-10 py-3 rounded-2xl">
          <h1 className="text-3xl md:text-4xl text-gray-900 font-extrabold">Welcome to Real Estate Chatbot.</h1>
          <p className="text-xl font-semibold text-gray-700 mt-2">How can I help you today?</p>
        </div>

        {/* Input and Chat Area */}
        {/* Main Chat Area */}
        <div className="flex flex-col justify-end items-center h-[calc(100vh-7.5rem)]">
          <div className="rounded-2xl w-[90%] md:w-[60%] flex flex-col p-4 h-full overflow-hidden">

            {/* Scrollable Chat Box */}
            <div className="bg-white/60 rounded-t-2xl overflow-hidden mx-6 flex flex-col gap-4 px-4 py-2 overflow-y-auto flex-1" style={{ scrollBehavior: 'smooth' }}>
              {chat.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`${msg.sender === "user" ? " bg-orange-50" : "bg-gray-100"} rounded-xl px-4 py-3 max-w-[75%] shadow-md shadow-gray-300 text-gray-800 whitespace-pre-wrap leading-relaxed`}
                    style={{ whiteSpace: 'pre-wrap', fontFamily: msg.sender === 'bot' ? 'monospace' : 'inherit' }}
                  >
                    {msg.text === "Typing..." ? (
                      <div className="text-gray-600 italic animate-pulse">Typing...</div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Fixed Input Box */}
            <div className="flex items-center bg-white/90 shadow-sm shadow-gray-500 py-8 rounded-xl px-6 gap-3">
              <textarea
                ref={textareaRef}
                placeholder={animatedPlaceholder}
                rows={1}
                maxLength={1000}
                className="flex-grow resize-none bg-white font-semibold outline-none shadow-inner px-4 py-2.5 rounded-md shadow-gray-200 w-full text-lg placeholder-gray-400 text-gray-600 overflow-y-auto max-h-[8.5rem] leading-snug transition-all duration-300"
                style={{
                  height: "auto",
                  minHeight: "3rem",
                  overflowX: "hidden",
                }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(); // use custom send handler
                  }
                }}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
                }}
              />
              <button
                onClick={sendMessage}
                className='cursor-pointer hover:shadow shadow-gray-400 mt-auto flex gap-1 text-base bg-yellow-600 hover:bg-yellow-700 rounded-lg px-4 py-1.5'
              >
                <span className='text-white font-extrabold'>Send</span>
                <IoIosSend className='w-5 h-5 text-white' />
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
