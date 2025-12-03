"use client";
import React, { useContext, useEffect, useState, useCallback, useMemo } from "react";
import UserLandingPageCard from "./UserLandingPageCard/UserLandingPageCard";
import { Inter, Montserrat } from "next/font/google";
import Link from "next/link";
import { BookmarkContext } from "../../providers/BookmarkProvider";
import { BASE_URL } from "../../config/config";
import { CategoriesContext } from "../../providers/CategoriesProvider";


const interFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const montSerrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Fashion = () => {
  const { categories } = useContext(CategoriesContext);
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);

  const [fashionOffers, setFashionOffers] = useState([]);
  const [totalFashionOffers, setTotalFashionOffers] = useState(0);
  const [fashionCategoryId, setFashionCategoryId] = useState(null);

  const bookmarkIds = useMemo(() => {
    return new Set(bookmarks.map(b => b.id));
  }, [bookmarks]);

  useEffect(() => {
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return;
    }

    const fashionCategory = categories.find(
      (cat) => cat?.category_name?.toLowerCase() === "fashion"
    );

    if (fashionCategory) {
      setFashionCategoryId(fashionCategory.id);

      if (fashionCategory.subcategories && Array.isArray(fashionCategory.subcategories)) {
        const allOffers = fashionCategory.subcategories.flatMap(
          (sub) => sub?.offers || []
        );

        setTotalFashionOffers(allOffers.length);
        setFashionOffers(allOffers.slice(0, 3));
      } else {
        setTotalFashionOffers(0);
        setFashionOffers([]);
      }
    }
  }, [categories]);

  const handleBookmarkClick = useCallback((offer) => {
    toggleBookmark(offer);
  }, [toggleBookmark]);

  if (!fashionOffers?.length) return null;

  return (
    <div className="flex flex-col items-center justify-center pt-24 mb-16">
      <h1
        className={`text-[#000000] dark:text-white font-bold text-5xl ${interFont.className}`}
      >
        Fashion
      </h1>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 pt-11">
        {fashionOffers.map((offer) => (
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

      {fashionCategoryId && totalFashionOffers >= 1 && (
        <Link
          href={`/category/${fashionCategoryId}`}
          className={`bg-[#00308F] text-[#FFFFFF] mt-12 px-6 py-2 rounded-sm cursor-pointer ${montSerrat.className}`}
        >
          View All {">>"}
        </Link>
      )}
    </div>
  );
};

export default Fashion;