"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";

import React from 'react'

const Faqs = () => {
      const [query, setQuery] = useState("");

  const handleClear = () => setQuery("");
  const handleSearch = () => {
    console.log("Searching for:", query);
    // 👉 perform search action here
    
  };
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#00308F] px-4">
      {/* Title */}
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
        How can we help you?
      </h1>
      <p className="text-gray-200 text-sm md:text-base mb-6">
        Browse our articles or search your query below
      </p>

      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-md shadow-md overflow-hidden w-full max-w-lg">
        <div className="px-3 text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            console.log("Typing",e.target.value) // real time log
          }}
          
          className="flex-1 px-2 py-2 text-gray-700 focus:outline-none"
        />
        {query && (
          <button
            onClick={handleClear}
            className="px-3 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
        <button
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 font-semibold"
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default Faqs

