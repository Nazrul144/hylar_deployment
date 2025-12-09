"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BASE_URL } from "../../../config/config";

const CatagoriesSlider = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/api/offers/categories/`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status}`);
        }
        
        const result = await response.json();

        if (result.status === "success" && result.data) {
          setCategories(result.data);
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    router.push(`/category/${categoryId}`);
  };

  // Different gradient combinations for each card
  const gradients = [
    "from-blue-500 via-purple-500 to-pink-500",
    "from-cyan-500 via-blue-500 to-indigo-500",
    "from-purple-500 via-pink-500 to-rose-500",
    "from-emerald-500 via-teal-500 to-cyan-500",
    "from-orange-500 via-red-500 to-pink-500",
    "from-indigo-500 via-purple-500 to-blue-500",
    "from-fuchsia-500 via-purple-500 to-indigo-500",
    "from-amber-500 via-orange-500 to-red-500",
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[40vh]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[40vh]">
        <p className="text-red-600 dark:text-red-400 text-xl mb-4">⚠️ {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-sm transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <p className="text-center mt-10 text-xl dark:text-gray-300">
        No categories available
      </p>
    );
  }

  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      {/* Header Section */}
      <div className="mb-12 px-4">
        <h1 className="text-center text-[#00308F] dark:text-blue-400 font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
          Browse Categories
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-center text-sm md:text-base">
          Must see offers from some of Blue Light Card members' best-loved partners.
        </p>
      </div>

      {/* Category Cards Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const gradient = gradients[index % gradients.length];

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleCategoryClick(category.id)}
                className="cursor-pointer group"
              >
                {/* Glassmorphism Card */}
                <div className="relative h-64 rounded-2xl overflow-hidden backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.5)] transition-all duration-300">
                  
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-300`}></div>
                  
             
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                  
             
                  <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-white/20 via-white/10 to-transparent"></div>
                  
       
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="text-center space-y-4">
                    
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                      
                     
                      <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] leading-tight px-4 group-hover:scale-110 transition-transform duration-300">
                        {category.category_name}
                      </h3>
                      
                    
                      <div className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                      
                      {/* Hover Indicator */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white/90 text-sm font-medium">Click to explore →</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Border Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/20 via-transparent to-white/20 blur-sm"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CatagoriesSlider;