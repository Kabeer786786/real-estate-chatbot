/* eslint-disable react-hooks/exhaustive-deps */
import { IoIosSend } from "react-icons/io";
import ThemeToggle from './ThemeToggle';
import { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";

export default function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  },[])

  const handleSubmit = () => {
    alert('Query Selected is : ' + query);
  }

  const handleNewChat = () => {
    setLoading(true);
    setQuery('');
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  return (
    <>
      {loading && (
        <div className="absolute w-screen h-screen inset-0 z-1000 flex items-center justify-center backdrop-blur bg-white/20 rounded-2xl">
          <div className="w-10 h-10 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10 bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }}
      ></div>

      <div className="min-h-screen backdrop-blur-sm bg-white/25 text-[#1a1a1a] z-10">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <div onClick={handleNewChat} className="flex items-center space-x-2 text-xl font-bold cursor-pointer bg-white/70 px-4 hover:shadow shadow-gray-400 hover:bg-white py-1.5 absolute top-4 rounded-full ">
            <FaEdit color="#2c2c2c" />
            <span className="text-gray-800">New</span>
          </div>
          <div className="flex items-center space-x-4">
            {/* <HiBell className="w-5 h-5 text-gray-600" />
          <div className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm">
            S
          </div> */}
            <ThemeToggle />
          </div>
        </div>

        {/* Greeting */}
        <div className="text-center mt-32 bg-white/50 w-fit m-auto px-10 py-3 rounded-2xl">
          <h1 className="text-3xl md:text-4xl text-gray-900 font-extrabold ">Welcome to Real Estate Chatbot.</h1>
          <p className="text-xl font-semibold text-gray-700 mt-2">How can I help you today?</p>
        </div>

        {/* Input Box */}
        <div className="flex justify-center mt-6">
          <div className="bg-white/60 rounded-2xl shadow-sm w-[90%] md:w-[60%] flex flex-col p-4 gap-3">
            <div className="flex flex-col gap-4 px-6 py-2">
              {/* <FiPaperclip className="w-5 h-5 text-gray-500" /> */}
              <div className="flex gap-5 items-center w-full rounded-md  ">
                <PlaceholderTextarea query={query} setQuery={setQuery} />
                <button onClick={handleSubmit} className='cursor-pointer hover:shadow shadow-gray-400 mt-auto flex gap-1 text-base bg-yellow-600 hover:bg-yellow-700 rounded-lg px-4 py-1.5'>
                  <span className='text-white font-extrabold'>Send</span>
                  <IoIosSend className='w-5 h-5 text-white' />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                {[
                  "Trending localities to buy a home",
                  "Price per sq.ft in Whitefield",
                  "Compare Sarjapur vs Electronic City",
                  "New projects near Hebbal",
                  "Is it a good time to invest?",
                  "Flats under ₹60L in Bangalore",
                ].map((item, idx) => (
                  <button
                    key={idx}
                    className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-full hover:bg-white cursor-pointer text-gray-600 font-medium shadow hover:shadow-md transition"
                    onClick={() => setQuery(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}

const PlaceholderTextarea = ({ query, setQuery }) => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000); // Change placeholder every 3s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate with a fade-out/in effect
    setAnimatedPlaceholder("");
    const timeout = setTimeout(() => {
      setAnimatedPlaceholder(placeholders[currentIndex]);
    }, 200); // Short delay for transition effect
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const handleOnChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <textarea
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
      onChange={handleOnChange}
      onInput={(e) => {
        e.target.style.height = "auto";
        e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
      }}
    />
  );
};