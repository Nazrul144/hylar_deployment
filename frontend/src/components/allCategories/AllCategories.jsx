"use client";
import React, { useState, useEffect, useContext, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CiBookmark } from "react-icons/ci";
import { BookmarkContext } from "@/providers/BookmarkProvider";
import { useParams, useRouter } from "next/navigation";
import { BASE_URL } from "@/config/config";
import { UserContext } from "@/providers/UserProvider";

const AllCategories = () => {
  const params = useParams();
  const id = Number(params.id);
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { bookmarks = [], toggleBookmark } = useContext(BookmarkContext);

  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
<<<<<<< HEAD

  // FIXED: Added safety check for bookmarks
  const bookmarkIds = useMemo(() => {
    return new Set((bookmarks || []).map(b => b.id));
  }, [bookmarks]);
=======
>>>>>>> ef789bdf02f912e3e547c210f8013129d8727b1c

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);
<<<<<<< HEAD

        const endpoint = `${BASE_URL}/api/offers/category/${id}/`;
        console.log("Fetching from:", endpoint);

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const result = await response.json();
        console.log("API Response:", result);

        if (result.status === "success" && result.data) {
          setCategoryData(result.data);
        } else if (result.data) {
          setCategoryData(result.data);
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (err) {
        console.error("Error fetching category:", err);
        setError(err.message || "Failed to load category data");
=======
        setCategoryData(null); // Reset data on route change

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
>>>>>>> ef789bdf02f912e3e547c210f8013129d8727b1c
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

<<<<<<< HEAD
  // IMPROVED: Better error handling
  if (error) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-2">Error loading category</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-600 text-xl">Category not found</p>
      </div>
    );
  }

  const OfferCard = React.memo(({ item }) => {
    const isBookmarked = bookmarkIds.has(item.id);

    const handleRedeemClick = (e) => {
      if (!user) {
        e.preventDefault();
        router.push("/login");
      }
    };

    return (
      <div className="shadow-xl p-4 rounded-sm">
        <Image
          src={item.image ? `${BASE_URL}${item.image}` : "/fallback.jpg"}
          width={400}
          height={200}
          alt={item.brand_name || "Offer"}
          className="object-contain w-full h-[200px]"
        />

        <h2 className="mt-2 text-lg font-semibold">{item.brand_name}</h2>

        {item.discount_percent && (
          <p className="text-red-600 font-bold text-xl mt-1">
            {item.discount_percent}% OFF
          </p>
        )}

        <div className="flex items-center gap-3 mt-3">
          <Button 
            className="border-2 rounded-none text-lg" 
            variant="none"
            onClick={handleRedeemClick}
          >
            {user ? (
              <Link href={`/redeem_details/${item.id}`}>Redeem {">>"}</Link>
            ) : (
              <span>Redeem {">>"}</span>
            )}
          </Button>

          <Button
            className={`border-2 rounded-none text-lg ${
              isBookmarked
                ? "bg-[#3366CC] text-white hover:bg-[#3366CC]"
                : "bg-white text-black hover:bg-gray-100"
            }`}
            variant="ghost"
            onClick={() => {
              if (!user) {
                router.push("/register");
                return;
              }
              // IMPROVED: Added safety check for toggleBookmark
              if (toggleBookmark) {
                toggleBookmark(item);
              }
            }}
          >
            <CiBookmark />
          </Button>
        </div>
      </div>
    );
  });
  OfferCard.displayName = "OfferCard";

  const RenderSection = React.memo(
    ({ title, description, items, subcategoryId, categoryId }) => {
      // IMPROVED: More defensive checking
      if (!Array.isArray(items) || items.length === 0) return null;

      const visibleItems = items.slice(0, 6);

      return (
        <div className="lg:w-7xl mx-auto mt-16 px-2">
          <div className="text-center mb-8">
            <h1 className="font-bold text-4xl lg:text-5xl mb-2">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {visibleItems.map((item) => (
              <OfferCard key={item.id} item={item} />
            ))}
          </div>

          {items.length > 6 && (
            <div className="flex justify-center mt-10">
              <Link
                href={`/view_all/${subcategoryId}?categoryId=${categoryId}`}
                className="bg-[#00308F] text-white px-6 py-2 rounded-sm inline-block"
              >
                View All
              </Link>
            </div>
          )}
        </div>
      );
    }
  );
  RenderSection.displayName = "RenderSection";

  return (
    <div>
      {categoryData.banner_image && (
        <div className="relative w-full h-[550px] pt-6 flex flex-col items-center justify-center">
          <Image
            src={`${BASE_URL}${categoryData.banner_image}`}
            alt={categoryData.category_name || "Banner"}
            fill
            className="object-cover"
          />
          <div className="absolute w-full h-full z-10 " />
          <div className="absolute z-20 text-center">
            <h1 className="text-7xl font-extrabold uppercase bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
=======
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
        <div className="relative w-full h-[550px] pt-6 flex flex-col items-center justify-center">
          <Image
            src={`${BASE_URL}${categoryData.banner_image}`}
            alt={`${categoryData.category_name} Banner`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute w-full h-full z-10  dark:bg-black/60" />
          <div className="absolute z-20 text-center">
            <h1 className="text-7xl font-extrabold uppercase bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
>>>>>>> ef789bdf02f912e3e547c210f8013129d8727b1c
              {categoryData.category_name}
            </h1>
          </div>
        </div>
<<<<<<< HEAD
      )}

      {Array.isArray(categoryData.subcategories) && categoryData.subcategories.length > 0 ? (
        categoryData.subcategories.map((sub) => (
          <RenderSection
            key={sub.id}
            subcategoryId={sub.id}
            categoryId={categoryData.id}
            title={sub.subcategory_name}
            description={sub.description || "Explore our best deals for you."}
            items={sub.offers || []}
          />
        ))
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 text-xl">No offers available yet</p>
=======
      ) : (
        <div className="relative w-full h-[550px] pt-6 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800">
          <div className="absolute z-20 text-center">
            <h1 className="text-7xl font-extrabold uppercase text-white drop-shadow-lg">
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
>>>>>>> ef789bdf02f912e3e547c210f8013129d8727b1c
        </div>
      )}
    </div>
  );
};

<<<<<<< HEAD
=======

const SubcategorySection = ({ subcategory, user, router }) => {
  // Don't render if no offers
  if (!subcategory.offers || subcategory.offers.length === 0) {
    return null;
  }

  const visibleItems = subcategory.offers.slice(0, 6);
  const hasMore = subcategory.offers.length > 6;

  return (
    <div className="lg:max-w-7xl mx-auto mt-16 px-4">
      <div className="text-center mb-8">
        <h1 className="font-bold text-4xl lg:text-5xl mb-2 text-gray-900 dark:text-white">
          {subcategory.subcategory_name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {subcategory.description || "Explore our best deals for you."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            className="bg-[#00308F] dark:bg-blue-600 text-white px-6 py-3 rounded-sm hover:bg-[#002366] dark:hover:bg-blue-700 transition-colors inline-block font-semibold"
          >
            View All
          </Link>
        </div>
      )}
    </div>
  );
};

// Offer Card Component
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

>>>>>>> ef789bdf02f912e3e547c210f8013129d8727b1c
export default AllCategories;