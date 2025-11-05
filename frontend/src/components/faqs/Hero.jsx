"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Hero = () => {
  const [query, setQuery] = useState("");

  const handleClear = () => setQuery("");
  const handleSearch = () => {
    ("Searching for:", query);
  };

  return (
    <div className="flex flex-col items-center justify-center h-96 bg-[#00308F] px-4 lg:px-4">
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
    </div>
  );
};

export default Hero;
