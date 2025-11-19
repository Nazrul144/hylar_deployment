"use client";
import React, { useContext, useEffect, useState } from "react";
import UserLandingPageCard from "./UserLandingPageCard/UserLandingPageCard";
import { Inter, Montserrat } from "next/font/google";
import Link from "next/link";
import { BASE_URL } from "@/config/config";
import { CategoriesContext } from "@/providers/CategoriesProvider";
import { BookmarkContext } from "@/providers/BookmarkProvider";

const interFont = Inter({ subsets: ["latin"] });
const montSerrat = Montserrat({ subsets: ["latin"] });

const HomeAndLifeStyle = () => {
  const { categories } = useContext(CategoriesContext);
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);

  const [homeOffers, setHomeOffers] = useState([]);

  useEffect(() => {
    if (!categories.length) return;

    // Normalize category name for comparison
    const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, "");
    const targetNames = ["homeandlifestyle", "homeandlifestyles"];

    const homeCategory = categories.find((cat) =>
      targetNames.includes(normalize(cat.category_name))
    );

    if (homeCategory) {
      const allOffers = homeCategory.subcategories.flatMap(
        (sub) => sub.offers || []
      );

      setHomeOffers(allOffers.slice(0, 3)); // Show first 3 only
    } else {
      console.warn("Home & Lifestyle category not found in:", categories);
    }
  }, [categories]);

  // Do not render section if empty
  if (!homeOffers.length) return null;

  return (
    <div className="flex flex-col items-center justify-center pt-24">
      {/* Title */}
      <h1 className="text-[#000000] font-bold text-5xl inter-text">
        Home & Lifestyle
      </h1>

      {/* Cards */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 pt-11">
        {homeOffers.map((offer) => (
          <UserLandingPageCard
            key={offer.id}
            id={offer.id} // Passing the offer ID
            imageName={`${BASE_URL}${offer.image}`}
            descriptionBoldText={offer.brand_name}
            descriptionLightText={`${offer.discount_percent}% OFF`}
            descriptionFont={interFont}
            buttonName="Redeem"
            buttonFont={montSerrat}
            isBookmarked={bookmarks.some((b) => b.id === offer.id)}
            onBookmarkClick={() => toggleBookmark(offer)}
          />
        ))}
      </div>

      {/* View All Link */}
      <Link
        href={`/categories/home&lifestyle`}
        className={`bg-[#00308F] text-[#FFFFFF] mt-12 px-6 py-2 rounded-sm cursor-pointer ${montSerrat.className}`}
      >
        View All {">>"}
      </Link>
    </div>
  );
};

export default HomeAndLifeStyle;
