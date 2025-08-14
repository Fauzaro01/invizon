"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SearchBar({
  data,
  onFilter,
  placeholder = "Search...",
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    setQuery(value);
    if (value.trim() === "") {
      onFilter(data);
      setResults([]);
      return;
    }

    const filtered = data.filter(
      (item) =>
        item.title?.toLowerCase().includes(value.toLowerCase()) ||
        item.name?.toLowerCase().includes(value.toLowerCase()) ||
        item.content?.toLowerCase().includes(value.toLowerCase()) ||
        item.category?.toLowerCase().includes(value.toLowerCase())
    );

    onFilter(filtered);
    setResults(filtered);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#234362] focus:border-transparent shadow-sm"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {query && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {query && results.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-lg shadow-lg border z-10"
        >
          <p className="text-gray-500 text-center">
            No results found for "{query}"
          </p>
        </motion.div>
      )}
    </div>
  );
}
