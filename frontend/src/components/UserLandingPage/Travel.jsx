"use client";
import React, { useContext, useEffect, useState } from "react";
import UserLandingPageCard from "./UserLandingPageCard/UserLandingPageCard";
import { Inter, Montserrat } from "next/font/google";
import Link from "next/link";
import { CategoriesContext } from "@/providers/CategoriesProvider";
import { BookmarkContext } from "@/providers/BookmarkProvider";
import { BASE_URL } from "@/config/config";

const interFont = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const montSerrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const Travel = () => {
  const { categories } = useContext(CategoriesContext);
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  const [travelOffers, setTravelOffers] = useState([]);

  useEffect(() => {
    const normalize = (str) => str.toLowerCase().replace(/[& ]/g, "");
    const travelCategory = categories.find(
      (cat) => normalize(cat.category_name) === "travel"
    );

    if (travelCategory) {
      const allOffers = travelCategory.subcategories.flatMap(
        (sub) => sub.offers || []
      );

      setTravelOffers(allOffers.slice(0, 3));
    }
  }, [categories]);

  return (
    travelOffers.length > 0 && (
      <div className="flex flex-col items-center justify-center pt-24 mb-16">
        <h1 className={`text-[#000000] font-bold text-5xl ${interFont.className}`}>
          Travel
        </h1>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 pt-11">
          {travelOffers.map((offer) => (
            <UserLandingPageCard
              key={offer.id}
              id={offer.id}
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
          href={`/categories/travel`}
          className={`bg-[#00308F] text-[#FFFFFF] mt-12 px-6 py-2 rounded-sm cursor-pointer ${montSerrat.className}`}
        >
          View All {" >>"}
        </Link>
      </div>
    )
  );
};

export default Travel;
