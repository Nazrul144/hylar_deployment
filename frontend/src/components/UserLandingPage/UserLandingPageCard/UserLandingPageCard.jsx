"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CiBookmark } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { BookmarkContext } from "@/providers/BookmarkProvider";

const UserLandingPageCard = ({
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
}) => {
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  const isBookmarked = bookmarks.some((item) => item.id === id);

  return (
    <div className="shadow-lg p-4 rounded-md w-full max-w-[450px] relative bg-white dark:bg-gray-900">
      {/* Image */}
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
          onClick={() =>
            toggleBookmark({ id, imageName, descriptionBoldText })
          }
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
};

export default UserLandingPageCard;
