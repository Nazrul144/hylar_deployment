"use client";
import React, { useState, useEffect, useContext, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { CiBookmark } from "react-icons/ci";
import { BookmarkContext } from "../../providers/BookmarkProvider";
import { useParams, useRouter } from "next/navigation";
import { BASE_URL } from "../../config/config";
import { UserContext } from "../../providers/UserProvider";
import { motion } from "framer-motion";

const AllCategories = () => {
  const params = useParams();
  const id = Number(params.id);
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { bookmarks = [], toggleBookmark } = useContext(BookmarkContext);

  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);
        setCategoryData(null);

        const response = await fetch(`${BASE_URL}/api/offers/category/${id}/`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch category data: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.status === "success" && result.data) {
          setCategoryData(result.data);
        } else {
          throw new Error("Invalid data structure from API");
        }
      } catch (err) {
        console.error("Error fetching category:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategoryData();
    }
  }, [id]);

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
        <Button onClick={() => router.push("/")}>Go Back Home</Button>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <p className="text-gray-600 dark:text-gray-400 text-xl mb-4">Category not found</p>
        <Button onClick={() => router.push("/")}>Go Back Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Banner Section */}
      {categoryData.banner_image && categoryData.banner_image !== "undefined" ? (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] pt-6 flex flex-col items-center justify-center">
          <Image
            src={`${BASE_URL}${categoryData.banner_image}`}
            alt={`${categoryData.category_name} Banner`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute w-full h-full z-10 bg-black/40 dark:bg-black/60" />
          <div className="absolute z-20 text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
              {categoryData.category_name}
            </h1>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] pt-6 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800">
          <div className="absolute z-20 text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase text-white drop-shadow-lg">
              {categoryData.category_name}
            </h1>
          </div>
        </div>
      )}

      {categoryData.subcategories && 
       Array.isArray(categoryData.subcategories) && 
       categoryData.subcategories.length > 0 ? (
        <div>
          {categoryData.subcategories.map((sub) => (
            <SubcategorySection
              key={sub.id}
              subcategory={sub}
              user={user}
              router={router}
            />
          ))}
          
          {categoryData.subcategories.every(sub => !sub.offers || sub.offers.length === 0) && (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-xl">No offers available in this category yet</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 dark:text-gray-400 text-xl">No subcategories available for this category</p>
        </div>
      )}
    </div>
  );
};

const SubcategorySection = ({ subcategory, user, router }) => {
  if (!subcategory.offers || subcategory.offers.length === 0) {
    return null;
  }

  const visibleItems = subcategory.offers.slice(0, 6);
  const hasMore = subcategory.offers.length > 6;

  return (
    <div className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 text-gray-900 dark:text-white">
          {subcategory.subcategory_name}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {subcategory.description || "Explore our best deals for you."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {visibleItems.map((item, index) => (
          <OfferCard
            key={item.id}
            item={item}
            user={user}
            router={router}
            index={index}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <Link
            href={`/view_all/${subcategory.id}`}
            className="bg-[#00308F] dark:bg-blue-600 text-white px-6 py-3 rounded-sm hover:bg-[#002366] dark:hover:bg-blue-700 transition-colors inline-block font-semibold text-sm sm:text-base"
          >
            View All
          </Link>
        </div>
      )}
    </div>
  );
};

const OfferCard = ({ item, user, router, index }) => {
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
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
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex flex-col h-full shadow-lg dark:shadow-gray-800 p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-700 transition-all border border-gray-200 dark:border-gray-700"
    >
      {/* Image Container - Fixed Height */}
      <div className="relative w-full h-48 mb-4 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
        <Image
          src={getImageUrl()}
          fill
          alt={item.brand_name || "Offer"}
          className="object-contain p-2"
        />
      </div>

      {/* Content Container - Flex Grow */}
      <div className="flex flex-col flex-grow">
        {/* Brand Name - Fixed Height with Line Clamp */}
        <h2 className="text-base sm:text-lg font-semibold line-clamp-2 text-gray-900 dark:text-white min-h-[3rem]">
          {item.brand_name}
        </h2>

        {/* Discount Badge */}
        {item.discount_percent && parseFloat(item.discount_percent) > 0 && (
          <p className="text-red-600 dark:text-red-400 font-bold text-lg sm:text-xl mt-2">
            {item.discount_percent}% OFF
          </p>
        )}

        {/* Spacer to push buttons to bottom */}
        <div className="flex-grow"></div>

        {/* Action Buttons - Fixed at Bottom */}
        <div className="flex items-center gap-2 sm:gap-3 mt-4">
          <Button className="border-2 border-gray-300 dark:border-gray-600 rounded-md text-sm sm:text-base flex-1 bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors" variant="none">
            <Link href={`/redeem_details/${item.id}`} className="w-full">
              Redeem {">>"}
            </Link>
          </Button>

          <Button
            className={`border-2 rounded-md text-sm sm:text-base transition-all duration-200 ${
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
            <CiBookmark size={20} className="sm:w-6 sm:h-6" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AllCategories;