"use client";
import React, { useContext, useEffect, useState } from "react";
import UserLandingPageCard from "./UserLandingPageCard/UserLandingPageCard";
import { Inter, Montserrat } from "next/font/google";
import Link from "next/link";
import { BASE_URL } from "@/config/config";
import { CategoriesContext } from "@/providers/CategoriesProvider";
import { BookmarkContext } from "@/providers/BookmarkProvider";

const interFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const montSerrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const Finance = () => {
  const { categories } = useContext(CategoriesContext);
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  const [financeOffers, setFinanceOffers] = useState([]);

  useEffect(() => {
    const financeCategory = categories.find(
      (cat) => cat.category_name.toLowerCase() === "finance"
    );

    if (financeCategory) {
      const allOffers = financeCategory.subcategories.flatMap(
        (sub) => sub.offers || []
      );

      setFinanceOffers(allOffers.slice(0, 3)); // Only top 3 offers
    }
  }, [categories]);

  if (!financeOffers?.length) return null; // hide if empty

  return (
    <div className="mb-16">
      <div className="flex flex-col items-center justify-center pt-24">
        <h1 className={`text-[#000000] font-bold text-5xl ${interFont.className}`}>
          Finance
        </h1>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 pt-11">
          {financeOffers.map((offer) => (
            <UserLandingPageCard
              key={offer.id}
              id={offer.id} // ⭐ REQUIRED
              imageName={`${BASE_URL}${offer.image}`}
              descriptionBoldText={offer.brand_name}
              descriptionLightText={`${offer.discount_percent || 0}% OFF`}
              descriptionFont={interFont}
              buttonName="Redeem"
              buttonFont={montSerrat}
              bookMarkIcon="bookmark"
              isBookmarked={bookmarks.some((b) => b.id === offer.id)}
              onBookmarkClick={() => toggleBookmark(offer)}
            />
          ))}
        </div>

        <Link
          href={`/categories/finance`}
          className={`bg-[#00308F] text-[#FFFFFF] mt-12 px-6 py-2 rounded-sm cursor-pointer ${montSerrat.className}`}
        >
          View All {">>"}
        </Link>
      </div>
    </div>
  );
};

export default Finance;
