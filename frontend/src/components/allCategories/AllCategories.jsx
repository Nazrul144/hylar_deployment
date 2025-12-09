"use client";
import React, { useState, useEffect, useContext } from "react";
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

  // Calculate total products count
  const totalProducts = categoryData?.subcategories?.reduce((total, sub) => {
    return total + (sub.offers?.length || 0);
  }, 0) || 0;

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
    <div className="min-h-screen bg-white dark:bg-gray-900 mt-12 lg:mt-0">
      {/* Banner Section */}
      {categoryData.banner_image && categoryData.banner_image !== "undefined" ? (
        <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] pt-4 sm:pt-6 bg-white dark:bg-zinc-950">
  
  {/* Geometric Grid Background */}
  <div className="absolute inset-0 opacity-10 dark:opacity-5">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
  </div>
  
  {/* Main Layout */}
  <div className="relative w-full h-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-4 sm:py-6 md:py-8 flex items-center">
    
    <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-center">
      
      {/* Left: Image (3 columns) */}
      <div className="lg:col-span-3 relative h-[200px] xs:h-[240px] sm:h-[280px] md:h-[350px] lg:h-[420px] xl:h-[480px]">
        
        {/* Diamond Pattern Background */}
        <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 md:-top-4 md:-left-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
          <div className="absolute inset-0 bg-blue-500 rotate-45 opacity-20"></div>
          <div className="absolute inset-1 sm:inset-2 bg-blue-600 rotate-45 opacity-30"></div>
          <div className="absolute inset-2 sm:inset-3 md:inset-4 bg-blue-700 rotate-45 opacity-40"></div>
        </div>
        
        {/* Main Image */}
        <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
          <Image
            src={`${BASE_URL}${categoryData.banner_image}`}
            alt={`${categoryData.category_name} Banner`}
            fill
            className="object-cover"
            quality={100}
            priority
          />
        </div>
        
        {/* Bottom Diamond Accent */}
        <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 md:-bottom-4 md:-right-4 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-purple-500 rotate-45 opacity-80 shadow-lg sm:shadow-xl"></div>
      </div>
      
      {/* Right: Text Content (2 columns) */}
      <div className="lg:col-span-2 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
        
        {/* Diamond Icon */}
        <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rotate-45 shadow-md sm:shadow-lg">
          <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white dark:bg-zinc-950 -rotate-45"></div>
        </div>
        
        {/* Title */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <div className="h-0.5 sm:h-1 w-12 sm:w-14 md:w-16 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-zinc-900 dark:text-white leading-tight">
            {categoryData.category_name}
          </h1>
        </div>
        
        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Explore our curated collection of premium products designed for excellence.
        </p>
        
        {/* Stats */}
        <div className="flex gap-4 sm:gap-5 md:gap-6">
          <div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">{totalProducts}+</p>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">Products</p>
          </div>
          <div className="w-px h-10 sm:h-12 bg-zinc-300 dark:bg-zinc-700"></div>
          <div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">50%</p>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">Savings</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      ) : (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] pt-6 flex flex-col items-center justify-center bg-linear-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800">
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
      <div className="flex flex-col grow">
      
        <h2 className="text-base sm:text-lg font-semibold line-clamp-2 text-gray-900 dark:text-white min-h-12">
          {item.brand_name}
        </h2>

     
        {item.discount_percent && parseFloat(item.discount_percent) > 0 && (
          <p className="text-red-600 dark:text-red-400 font-bold text-lg sm:text-xl mt-2">
            {item.discount_percent}% OFF
          </p>
        )}

     
        <div className="grow"></div>

  
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