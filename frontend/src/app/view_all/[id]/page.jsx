"use client";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CiBookmark } from "react-icons/ci";
import { BookmarkContext } from "@/providers/BookmarkProvider";
import { UserContext } from "@/providers/UserProvider";
import { CategoriesContext } from "@/providers/CategoriesProvider";
import { BASE_URL } from "@/config/config";

export default function ViewAllPage() {
  const { id } = useParams(); 
  const subId = Number(id);
  const router = useRouter();

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
        setSubData(null);

        console.log("Looking for subcategory ID:", subId);
        console.log("Categories from context:", categories);

        // Strategy 1: Try to find in context first (fastest)
        if (categories && Array.isArray(categories) && categories.length > 0) {
          for (const category of categories) {
            if (category.subcategories && Array.isArray(category.subcategories)) {
              const subcategory = category.subcategories.find(sub => sub.id === subId);
              if (subcategory) {
                console.log("Found in context:", subcategory);
                setSubData({
                  ...subcategory,
                  parentCategoryName: category.category_name,
                  parentCategoryId: category.id
                });
                setLoading(false);
                return;
              }
            }
          }
        }

        console.log("Not found in context, fetching from API...");

        const categoryIdsToTry = categories && categories.length > 0 
          ? categories.map(cat => cat.id)
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 

        for (const categoryId of categoryIdsToTry) {
          try {
            const response = await fetch(`${BASE_URL}/api/offers/category/${categoryId}/`);
            
            if (response.ok) {
              const result = await response.json();
              console.log(`Category ${categoryId} response:`, result);
              
              if (result.status === "success" && result.data && result.data.subcategories) {
                const subcategory = result.data.subcategories.find(sub => sub.id === subId);
                if (subcategory) {
                  console.log("Found via API:", subcategory);
                  setSubData({
                    ...subcategory,
                    parentCategoryName: result.data.category_name,
                    parentCategoryId: result.data.id
                  });
                  setLoading(false);
                  return;
                }
              }
            }
          } catch (err) {
            console.log(`Failed to fetch category ${categoryId}:`, err);
          
          }
        }

       
        throw new Error("Subcategory not found in any category");

      } catch (err) {
        console.error("Error fetching subcategory:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (subId) {
      fetchSubcategoryData();
    }
  }, [subId, categories]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <p className="text-red-600 dark:text-red-400 text-xl mb-4">Error: {error}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Subcategory ID: {subId}</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  if (!subData) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <p className="text-gray-600 dark:text-gray-400 text-xl mb-4">Subcategory not found</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Subcategory ID: {subId}</p>
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
          {subData.parentCategoryName && (
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Category: {subData.parentCategoryName}
            </p>
          )}
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {offers.length} {offers.length === 1 ? 'offer' : 'offers'} available
          </p>
        </div>

        {offers.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-xl">No offers found for this subcategory</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((item, index) => (
              <OfferCard
                key={item.id}
                item={item}
                index={index}
                user={user}
                router={router}
                bookmarks={bookmarks}
                toggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


const OfferCard = ({ item, index, user, router, bookmarks, toggleBookmark }) => {
  const isBookmarked = bookmarks?.some((b) => b.id === item.id) || false;

  const getImageUrl = () => {
    if (!item.image || item.image === "undefined" || item.image === "null") {
      return "/fallback.jpg";
    }
    if (item.image.startsWith('http')) {
      return item.image;
    }
    const imagePath = item.image.startsWith('/') ? item.image : `/${item.image}`;
    return `${BASE_URL}${imagePath}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="shadow-xl dark:shadow-gray-800 p-4 rounded-sm bg-white dark:bg-gray-800 hover:shadow-2xl dark:hover:shadow-gray-700 transition-shadow border border-transparent dark:border-gray-700"
    >
      <div className="relative w-full h-[200px] mb-3 bg-gray-100 dark:bg-gray-700 rounded">
        <Image
          src={getImageUrl()}
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

      {item.discount_percent && parseFloat(item.discount_percent) > 0 && (
        <p className="text-red-600 dark:text-red-400 font-bold text-xl mt-1">
          {item.discount_percent}% OFF
        </p>
      )}

      <div className="flex items-center gap-3 mt-3">
        <Button className="border-2 border-gray-300 dark:border-gray-600 rounded-none text-lg flex-1 bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" variant="none">
          <Link href={`/redeem_details/${item.id}`} className="w-full">
            Redeem {">>"}
          </Link>
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
};