"use client";
import { BASE_URL } from "@/config/config";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { Inter, Montserrat } from "next/font/google";
import UserLandingPageCard from "./UserLandingPageCard/UserLandingPageCard";
import { BookmarkContext } from "@/providers/BookmarkProvider";
import { UserContext } from "@/providers/UserProvider";
import { useRouter } from "next/navigation";

const interFont = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const montSerrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const BrowseCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/api/offers/categories`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Browse Categories API Response:", result);

        if (result.status === "success" && result.data) {
          setCategories(result.data);
        } else if (Array.isArray(result.data)) {
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

  const handleRedeemClick = (e, offerId) => {
    if (!user) {
      e.preventDefault();
      router.push("/login");
    }
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
        <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return <p className="text-center mt-10 text-xl">No categories available</p>;
  }

  return (
    <div className="pt-22 flex flex-col items-center justify-center gap-8 py-16">
      {/* Browse Categories Header */}
      <h1 className="text-[#00308F] font-medium md:font-bold text-5xl text-center inter-text">
        Browse Categories
      </h1>

      <div className="flex flex-col items-center justify-center">
        <p className="text-[#000000] text-center montserrat-text">
          Must see offers from some of Blue Light Card
        </p>
        <p className="text-[#000000] text-center montserrat-text">
          members' best-loved partners.
        </p>
      </div>

      {/* Category Cards */}
      <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-20 max-w-7xl mx-auto px-4">
        {categories.map((category) => {
          const imageUrl = category.banner_image 
            ? `${BASE_URL}${category.banner_image}` 
            : "/fallback.jpg";

          return (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="w-60 h-60 relative overflow-hidden group block rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <Image
                src={imageUrl}
                alt={category.category_name || "Category"}
                fill
                sizes="240px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority={false}
                unoptimized={true}
              />

              <div className="absolute inset-x-0 bottom-0 h-1/4 backdrop-blur-sm bg-black/40" />
              <p className="absolute bottom-4 inset-x-0 text-center text-white text-2xl font-semibold inter-text px-2">
                {category.category_name}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Mixed Offers from All Categories */}
      <div className="w-full max-w-7xl mx-auto px-4 mt-16">
        {categories.map((category) => {
          // Get all offers from this category
          const allOffers = category.subcategories?.flatMap(
            (sub) => sub?.offers || []
          ) || [];

          // Only show if there are offers
          if (allOffers.length === 0) return null;

          // Show first 6 offers
          const displayOffers = allOffers.slice(0, 6);

          return (
            <div key={category.id} className="mb-20">
              {/* Category Section Header */}
              <div className="text-center mb-8">
                <h2 className={`text-[#000000] dark:text-white font-bold text-4xl lg:text-5xl ${interFont.className}`}>
                  {category.category_name}
                </h2>
              </div>

              {/* Offers Grid */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 flex-wrap">
                {displayOffers.map((offer) => (
                  <UserLandingPageCard
                    key={offer.id}
                    id={offer.id}
                    imageName={offer.image ? `${BASE_URL}${offer.image}` : "/fallback.jpg"}
                    descriptionBoldText={offer.brand_name}
                    descriptionLightText={`${offer.discount_percent || 0}% OFF`}
                    descriptionFont={interFont}
                    discountClass="text-red-500 font-bold"   
                    priceClass="text-red-500"      
                    buttonName="Redeem"
                    buttonFont={montSerrat}
                    bookMarkIcon="bookmark"
                    bookmarkColor="dark"
                    isBookmarked={bookmarks.some((b) => b.id === offer.id)}
                    onBookmarkClick={() => toggleBookmark(offer)}
                    user={user}
                    onRedeemClick={handleRedeemClick}
                  />
                ))}
              </div>

              {/* View All Button - show if more than 6 offers */}
              {allOffers.length > 6 && (
                <div className="text-center mt-10">
                  <Link
                    href={`/category/${category.id}`}
                    className={`bg-[#00308F] text-[#FFFFFF] px-8 py-3 rounded-sm cursor-pointer inline-block hover:bg-[#002070] transition-colors ${montSerrat.className}`}
                  >
                    View All {category.category_name} {">>"}
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrowseCategories;