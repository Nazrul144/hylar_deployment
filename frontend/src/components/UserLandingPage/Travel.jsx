"use client";
import React, { useContext, useEffect, useState, useCallback, useMemo } from "react";
import UserLandingPageCard from "./UserLandingPageCard/UserLandingPageCard";
import { Inter, Montserrat } from "next/font/google";
import Link from "next/link";
import { CategoriesContext } from "@/providers/CategoriesProvider";
import { BookmarkContext } from "@/providers/BookmarkProvider";
import { BASE_URL } from "@/config/config";

const interFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const montSerrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Travel = () => {
  const { categories } = useContext(CategoriesContext);
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);

  const [travelOffers, setTravelOffers] = useState([]);
  const [totalTravelOffers, setTotalTravelOffers] = useState(0);
  const [travelCategoryId, setTravelCategoryId] = useState(null);

  const bookmarkIds = useMemo(() => {
    return new Set(bookmarks.map(b => b.id));
  }, [bookmarks]);

  useEffect(() => {
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return;
    }

    const normalize = (str) => str?.toLowerCase().replace(/[& ]/g, "") || "";
    const travelCategory = categories.find(
      (cat) => normalize(cat?.category_name) === "travel"
    );

    if (travelCategory) {
      setTravelCategoryId(travelCategory.id);

<<<<<<< HEAD
      if (travelCategory.subcategories && Array.isArray(travelCategory.subcategories)) {
        const allOffers = travelCategory.subcategories.flatMap(
          (sub) => sub?.offers || []
        );

        setTotalTravelOffers(allOffers.length); 
        setTravelOffers(allOffers.slice(0, 3)); 
      } else {
        setTotalTravelOffers(0);
        setTravelOffers([]);
      }
=======
      const allOffers = (travelCategory.subcategories || []).flatMap(
        (sub) => sub.offers || []
      );

      setTotalTravelOffers(allOffers.length);
      setTravelOffers(allOffers.slice(0, 3));
>>>>>>> ef789bdf02f912e3e547c210f8013129d8727b1c
    }
  }, [categories]);

  const handleBookmarkClick = useCallback((offer) => {
    toggleBookmark(offer);
  }, [toggleBookmark]);

  if (!travelOffers.length) return null;

  return (
    <div className="flex flex-col items-center justify-center pt-24 mb-16">
      <h1
        className={`text-[#000000] dark:text-white font-bold text-5xl ${interFont.className}`}
      >
        Travel
      </h1>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 pt-11">
        {travelOffers.map((offer) => (
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
            isBookmarked={bookmarkIds.has(offer.id)}
            onBookmarkClick={() => handleBookmarkClick(offer)}
          />
        ))}
      </div>

      {travelCategoryId && totalTravelOffers >= 6 && (
        <Link
          href={`/category/${travelCategoryId}`}
          className={`bg-[#00308F] text-[#FFFFFF] mt-12 px-6 py-2 rounded-sm cursor-pointer ${montSerrat.className}`}
        >
          View All {">>"}
        </Link>
      )}
    </div>
  );
};

export default Travel;