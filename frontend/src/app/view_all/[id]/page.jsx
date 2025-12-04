"use client";
import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { CiBookmark } from "react-icons/ci";
import { BookmarkContext } from "../../../providers/BookmarkProvider";
import { UserContext } from "../../../providers/UserProvider";
import { CategoriesContext } from "../../../providers/CategoriesProvider";
import { BASE_URL } from "../../../config/config";

export default function ViewAllPage() {
  const { id } = useParams();
  const subId = Number(id);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const categoryId = searchParams.get('categoryId');

  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  const { user } = useContext(UserContext);
  const { categories } = useContext(CategoriesContext);

  const [subData, setSubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategoryData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Looking for subcategory ID:", subId);

        // Strategy 1: If categoryId is provided, use it directly (faster)
        if (categoryId) {
          const endpoint = `${BASE_URL}/api/offers/category/${categoryId}/`;
          console.log("Fetching from provided categoryId:", endpoint);

          const response = await fetch(endpoint);

          if (response.ok) {
            const result = await response.json();
            
            if (result.status === "success" && result.data) {
              const categoryData = result.data;
              const subcategory = categoryData.subcategories?.find(
                (sub) => sub.id === subId
              );

              if (subcategory) {
                setSubData({
                  ...subcategory,
                  category_name: categoryData.category_name,
                });
                setLoading(false);
                return;
              }
            }
          }
        }

        // Strategy 2: Try to find in context first (if available)
        if (categories && Array.isArray(categories) && categories.length > 0) {
          console.log("Searching in categories context...");
          for (const category of categories) {
            if (category.subcategories && Array.isArray(category.subcategories)) {
              const subcategory = category.subcategories.find(sub => sub.id === subId);
              if (subcategory) {
                console.log("Found in context:", subcategory);
                setSubData({
                  ...subcategory,
                  category_name: category.category_name,
                });
                setLoading(false);
                return;
              }
            }
          }
        }

        // Strategy 3: Search through all categories via API
        console.log("Not found in context, searching all categories via API...");
        
        const categoryIdsToTry = categories && categories.length > 0 
          ? categories.map(cat => cat.id)
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Fallback range

        for (const catId of categoryIdsToTry) {
          try {
            const response = await fetch(`${BASE_URL}/api/offers/category/${catId}/`);
            
            if (response.ok) {
              const result = await response.json();
              
              if (result.status === "success" && result.data && result.data.subcategories) {
                const subcategory = result.data.subcategories.find(sub => sub.id === subId);
                if (subcategory) {
                  console.log("Found via API in category:", catId);
                  setSubData({
                    ...subcategory,
                    category_name: result.data.category_name,
                  });
                  setLoading(false);
                  return;
                }
              }
            }
          } catch (err) {
            console.log(`Failed to fetch category ${catId}:`, err);
          }
        }

        throw new Error("Subcategory not found in any category");

      } catch (err) {
        console.error("Error fetching subcategory:", err);
        setError(err.message || "Failed to load subcategory data");
      } finally {
        setLoading(false);
      }
    };

    if (subId) {
      fetchSubcategoryData();
    }
  }, [subId, categoryId, categories]);

  const containerVariants = useMemo(
    () => ({
      show: { transition: { staggerChildren: 0.1 } },
    }),
    []
  );

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
    }),
    []
  );

  const handleRedeemClick = (e, itemId) => {
    if (!user) {
      e.preventDefault();
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] px-4">
        <p className="text-red-600 dark:text-red-400 text-xl mb-4">⚠️ {error}</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  if (!subData) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <p className="text-gray-600 dark:text-gray-400 text-xl mb-4">Subcategory not found</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const offers = subData.offers || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="lg:max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <Button 
            onClick={() => router.back()} 
            variant="outline"
            className="mb-4 border-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            ← Back
          </Button>
          <h1 className="text-4xl lg:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
            {subData.subcategory_name}
          </h1>
          {subData.category_name && (
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Category: {subData.category_name}
            </p>
          )}
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {offers.length} {offers.length === 1 ? "Offer" : "Offers"} Available
          </p>
        </div>

        {offers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-xl mb-4">
              No offers found for this subcategory.
            </p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {offers.map((item) => {
              const isBookmarked = bookmarks.some((b) => b.id === item.id);

              return (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  className="shadow-xl dark:shadow-gray-800 p-4 rounded-sm bg-white dark:bg-gray-800 hover:shadow-2xl dark:hover:shadow-gray-700 transition-shadow border border-transparent dark:border-gray-700"
                >
                  <div className="relative w-full h-[200px] mb-3 bg-gray-100 dark:bg-gray-700 rounded">
                    <Image
                      src={item.image ? `${BASE_URL}${item.image}` : "/fallback.jpg"}
                      fill
                      alt={item.brand_name || "Offer"}
                      className="object-contain"
                    />
                  </div>

                  <h2 className="mt-2 text-lg font-semibold line-clamp-2 text-gray-900 dark:text-white">
                    {item.brand_name}
                  </h2>

                  {item.product && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-1">
                      {item.product}
                    </p>
                  )}

                  {item.discount_percent && (
                    <p className="text-red-600 dark:text-red-400 font-bold text-xl mt-1">
                      {item.discount_percent}% OFF
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-3">
                    <Button 
                      className="border-2 border-gray-300 dark:border-gray-600 rounded-none text-lg flex-1 bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" 
                      variant="none"
                      onClick={(e) => handleRedeemClick(e, item.id)}
                    >
                      {user ? (
                        <Link href={`/redeem_details/${item.id}`}>Redeem {">>"}</Link>
                      ) : (
                        <span>Redeem {">>"}</span>
                      )}
                    </Button>

                    <Button
                      className={`border-2 rounded-none text-lg transition-colors duration-200 ${
                        isBookmarked
                          ? "bg-[#3366CC] dark:bg-blue-600 text-white hover:bg-[#2855b3] dark:hover:bg-blue-700 border-[#3366CC] dark:border-blue-600"
                          : "bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600"
                      }`}
                      variant="ghost"
                      onClick={() => {
                        if (!user) {
                          router.push("/register");
                          return;
                        }
                        toggleBookmark(item);
                      }}
                    >
                      <CiBookmark size={24} />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}