// components/ThemeToggle.jsx
import { useEffect, useState } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  // Load saved theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Handle toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    // <button
    //   onClick={toggleTheme}
    //   className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-200 transition"
    //   aria-label="Toggle Theme"
    // >
    //   {theme === 'dark' ? <BsSun className="w-5 h-5 text-yellow-400" /> : <BsMoon className="w-5 h-5 text-gray-800" />}
    // </button>
    <>
    </>
  );
}
