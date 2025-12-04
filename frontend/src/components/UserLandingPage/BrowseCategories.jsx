"use client";
import { BASE_URL } from "../../config/config";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { BookmarkContext } from "../../providers/BookmarkProvider";
import { UserContext } from "../../providers/UserProvider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { CiBookmark } from "react-icons/ci";

const BrowseCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryOffers, setCategoryOffers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchCategoriesAndOffers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all categories
        const categoriesResponse = await fetch(`${BASE_URL}/api/offers/categories/`);
        
        if (!categoriesResponse.ok) {
          throw new Error(`Failed to fetch categories: ${categoriesResponse.status}`);
        }
        
        const categoriesResult = await categoriesResponse.json();

        if (categoriesResult.status === "success" && categoriesResult.data) {
          const fetchedCategories = categoriesResult.data;
          setCategories(fetchedCategories);

          // Fetch offers for each category
          const offersData = {};
          
          for (const category of fetchedCategories) {
            try {
              const token = localStorage.getItem("access_token");
              const headers = {
                "Content-Type": "application/json",
              };
              
              if (token) {
                headers["Authorization"] = `Bearer ${token}`;
              }

              const categoryResponse = await fetch(
                `${BASE_URL}/api/offers/category/${category.id}/`,
                { headers }
              );
              
              if (categoryResponse.ok) {
                const categoryResult = await categoryResponse.json();
                
                if (categoryResult.status === "success" && categoryResult.data) {
                  // Collect all offers from all subcategories
                  const allOffers = [];
                  
                  if (categoryResult.data.subcategories) {
                    categoryResult.data.subcategories.forEach(subcategory => {
                      if (subcategory.offers && subcategory.offers.length > 0) {
                        allOffers.push(...subcategory.offers);
                      }
                    });
                  }
                  
                  // Store only first 6 offers
                  offersData[category.id] = {
                    categoryName: categoryResult.data.category_name,
                    bannerImage: categoryResult.data.banner_image,
                    offers: allOffers.slice(0, 6)
                  };
                }
              }
            } catch (err) {
              console.error(`Error fetching category ${category.id}:`, err);
            }
          }
          
          setCategoryOffers(offersData);
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndOffers();
  }, []);

  const handleRedeemClick = async (e, offerId) => {
    e.preventDefault();
    
    // Check authentication status
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
      return;
    }


    try {
      const response = await fetch(`${BASE_URL}/api/offers/${offerId}/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      // Handle different response scenarios
      if (!response.ok) {
        if (response.status === 403) {
          // Check for specific error types
          if (result.error === "PROFILE_NOT_FILLED") {
            router.push("/register5");
            return;
          }
          if (result.error === "SUBSCRIPTION_REQUIRED") {
            router.push("/subscription");
            return;
          }
        }
        if (response.status === 401) {
          localStorage.removeItem("access_token");
          router.push("/login");
          return;
        }
      }

      // If everything is okay, redirect to details page
      router.push(`/redeem_details/${offerId}`);
    } catch (error) {
      console.error("Error checking offer access:", error);
      // If there's an error, still try to navigate
      router.push(`/redeem_details/${offerId}`);
    }
  };

  const handleBookmarkClick = (offer) => {
    if (!user) {
      router.push("/login");
      return;
    }
    toggleBookmark(offer);
  };

  const isBookmarked = (offerId) => {
    return bookmarks.some((b) => b.id === offerId);
  };

  if (loading) {
    return (
      <div className="pt-22 flex justify-center items-center h-[40vh]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-22 flex flex-col justify-center items-center h-[40vh]">
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
    <div className="pt-22 py-16 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center gap-8 mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#00308F] dark:text-blue-400 font-medium md:font-bold text-4xl md:text-5xl text-center inter-text px-4"
        >
          Browse Categories
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center justify-center px-4"
        >
          <p className="text-gray-700 dark:text-gray-300 text-center montserrat-text">
            Must see offers from some of Blue Light Card
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-center montserrat-text">
            members' best-loved partners.
          </p>
        </motion.div>

        {/* Category Banner Images */}
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-20 max-w-7xl mx-auto px-4">
          {categories.map((category, index) => {
            const categoryData = categoryOffers[category.id];
            const imageUrl = categoryData?.bannerImage
              ? `${BASE_URL}${categoryData.bannerImage}`
              : "/fallback.jpg";

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/category/${category.id}`}
                  className="w-60 h-60 relative overflow-hidden group block rounded-lg shadow-lg hover:shadow-xl dark:shadow-gray-700 dark:hover:shadow-gray-600 transition-all"
                >
                  <Image
                    src={imageUrl}
                    alt={category.category_name || "Category"}
                    fill
                    sizes="240px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={index < 4}
                    unoptimized={true}
                  />

                  <div className="absolute inset-x-0 bottom-0 h-1/4 backdrop-blur-sm bg-black/40 dark:bg-black/60" />
                  <p className="absolute bottom-4 inset-x-0 text-center text-white text-2xl font-semibold inter-text px-2">
                    {category.category_name}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Offers by Category */}
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {categories.map((category) => {
          const categoryData = categoryOffers[category.id];
          
          // Don't render if no offers
          if (!categoryData || !categoryData.offers || categoryData.offers.length === 0) {
            return null;
          }

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Category Title with View All Link */}
              <div className="flex items-center justify-between border-b-2 border-blue-600 dark:border-blue-400 pb-3">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00308F] dark:text-blue-400 inter-text">
                  {categoryData.categoryName}
                </h2>
                <Link
                  href={`/category/${category.id}`}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold text-sm md:text-base transition-colors flex items-center gap-1 group"
                >
                  View All
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </div>

              {/* Offers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryData.offers.map((offer, index) => {
                  const offerImageUrl = offer.image
                    ? `${BASE_URL}${offer.image}`
                    : "/fallback.jpg";
                  const bookmarked = isBookmarked(offer.id);

                  return (
                    <motion.div
                      key={offer.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl dark:shadow-gray-700 dark:hover:shadow-gray-600 overflow-hidden transition-all group"
                    >
                      {/* Offer Image */}
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={offerImageUrl}
                          alt={offer.brand_name || "Offer"}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          unoptimized={true}
                        />
                        
                        {/* Discount Badge */}
                        {offer.discount_percent && parseFloat(offer.discount_percent) > 0 && (
                          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                            {offer.discount_percent}% OFF
                          </div>
                        )}
                      </div>

                      {/* Offer Details */}
                      <div className="p-4 space-y-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white inter-text line-clamp-1">
                          {offer.brand_name}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm montserrat-text line-clamp-2">
                          {offer.product || "Exclusive offer available"}
                        </p>

                        {/* Subcategory with Bookmark */}
                        <div className="flex items-center justify-between gap-2">
                          {offer.subcategory_name ? (
                            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                              {offer.subcategory_name}
                            </span>
                          ) : (
                            <span></span>
                          )}
                          
                          {/* Bookmark Button */}
                          <Button
                             variant="ghost"
                            onClick={() => toggleBookmark(offer)}
                            className={`border-2 rounded-md text-sm sm:text-base transition-all duration-200 cursor-pointer ${
                              bookmarked
                                ? "bg-[#3366CC] dark:bg-blue-600 text-white hover:bg-[#2855b3] dark:hover:bg-blue-700 border-[#3366CC] dark:border-blue-600"
                                : "bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600"
                            }`}
                            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                          >
                           <CiBookmark size={20} className="sm:w-6 sm:h-6" />
                          </Button>
                        </div>

                        {/* Action Button */}
                        <button
                          onClick={(e) => handleRedeemClick(e, offer.id)}
                          className="block w-full bg-[#00308F] dark:bg-blue-600 hover:bg-[#002070] dark:hover:bg-blue-700 text-white text-center py-2 rounded-md font-semibold transition-colors mt-4 cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* No Offers Message */}
      {Object.keys(categoryOffers).length === 0 && (
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 px-6 py-4 rounded-md shadow-sm">
            No offers available at the moment
          </p>
        </div>
      )}
    </div>
  );
};

export default BrowseCategories;