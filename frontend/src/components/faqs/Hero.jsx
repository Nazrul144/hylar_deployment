"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { BASE_URL } from "@/config/config";
import toast from "react-hot-toast";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Hero = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

const handleSearch = async () => {
  if (!query.trim()) return;

  setLoading(true);

  try {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
      `${BASE_URL}/api/offers/searched-offer/?q=${encodeURIComponent(query)}`,
      {
        headers: {
          "Authorization": token ? `Bearer ${token}` : "",
        },
      }
    );

    const data = await response.json();

    console.log("Search result:", data); 

   
    if (data?.error === "SUBSCRIPTION_REQUIRED") {
      setResults([]);
      toast.error("You need an active subscription to search offers.")
      return;
    }

  
    if (!response.ok) {
      setResults([]);
      return;
    }

 
    setResults(Array.isArray(data) ? data : []);

  } catch (error) {
    console.error("Search API error:", error);
    setResults([]);
  }

  setLoading(false);
};


  return (
    <div className="flex flex-col items-center justify-center bg-[#00308F] px-4 lg:px-4 py-10 min-h-[500px]">
      {/* Title */}
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-white text-3xl md:text-4xl font-bold mb-2"
      >
        How can we help you?
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 0.2 },
          },
        }}
        className="text-gray-200 text-sm md:text-base mb-6"
      >
        Browse our articles or search your query below
      </motion.p>

      {/* Search Bar */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 0.4 },
          },
        }}
        className="flex items-center bg-white rounded-md shadow-md overflow-hidden w-full max-w-lg"
      >
        <div className="px-3 text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-2 py-2 text-gray-700 focus:outline-none relative"
        />
        {query && (
          <button
            onClick={handleClear}
            className="px-3 text-gray-400 hover:text-gray-600"
          >
            <X size={22} />
          </button>
        )}
        <Button
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-600 text-white h-12 font-semibold cursor-pointer"
        >
          Search
        </Button>
      </motion.div>

      {/* Search Results Placeholder */}
      <div className="mt-8 w-full max-w-2xl">
        {loading ? (
          <p className="text-white text-center">Searching...</p>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md text-gray-800"
              >
                <h3 className="font-bold">{item.title || "Unnamed offer"}</h3>
                <p className="text-sm text-gray-600">
                  {item.description || "No description available"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          query &&
          !loading && (
            <p className="text-gray-300 text-center">No results found</p>
          )
        )}
      </div>
    </div>
  );
};

export default Hero;
