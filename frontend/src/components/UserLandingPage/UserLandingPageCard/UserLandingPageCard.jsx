"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiBookmark } from "react-icons/ci";
import { Button } from "../../ui/button";

const UserLandingPageCard = React.memo(({
  id,
  imageName,
  descriptionBoldText,
  descriptionLightText,
  descriptionFont,
  discountClass = "",
  priceClass = "",
  buttonName = "Redeem >>",
  buttonFont,
  bookmarkColor = "light",
  isBookmarked,
  onBookmarkClick,
}) => {
  return (
    <div className="shadow-lg p-4 rounded-md w-full max-w-[450px] relative bg-white dark:bg-gray-900">
      <div className="relative w-full h-[200px] mb-4 rounded-md overflow-hidden">
        <Image
          src={imageName || "/fallback.jpg"}
          alt={descriptionBoldText}
          fill
          className="object-cover"
        />
      </div>

      <h2 className={`text-xl font-semibold ${descriptionFont?.className}`}>
        {descriptionBoldText}
      </h2>

      <p className={`${discountClass} ${descriptionFont?.className}`}>
        {descriptionLightText}
      </p>

      <div className="flex items-center justify-between mt-4">
        <Button
          className={`border-2 rounded-none text-lg ${buttonFont?.className}`}
          variant="none"
          asChild
        >
          <Link href={`/redeem_details/${id}`}>
            {buttonName} {">>"}
          </Link>
        </Button>

        <Button
          className={`border-2 rounded-none text-lg cursor-pointer
            ${
              isBookmarked
                ? "bg-[#3366CC] text-white hover:bg-[#3366CC]"
                : "bg-white text-black dark:bg-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
            }
          `}
          variant="ghost"
          onClick={onBookmarkClick}
        >
          <CiBookmark
            className={`text-2xl ${
              bookmarkColor === "dark" ? "dark:text-white" : "text-black"
            }`}
          />
        </Button>
      </div>
    </div>
  );
});

UserLandingPageCard.displayName = "UserLandingPageCard";

export default UserLandingPageCard;