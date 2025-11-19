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
  buttonName = "Redeem >>",
  buttonFont,
}) => {
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  const isBookmarked = bookmarks.some((item) => item.id === id);

  return (
    <div className="shadow-lg p-4 rounded-md max-w-[300px] relative">
      {/* Image */}
      <div className="relative w-full h-[200px] mb-4 rounded-md overflow-hidden">
        <Image
          src={imageName || "/fallback.jpg"}
          alt={descriptionBoldText}
          fill
          className="object-cover"
        />
      </div>

      {/* Offer Texts */}
      <h2 className={`text-xl font-semibold ${descriptionFont?.className}`}>
        {descriptionBoldText}
      </h2>
      <p className={`text-gray-600 ${descriptionFont?.className}`}>
        {descriptionLightText}
      </p>

      {/* Action Buttons */}
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
          className={`border-2 rounded-none text-lg cursor-pointer ${
            isBookmarked
              ? "bg-[#3366CC] text-white hover:bg-[#3366CC] hover:text-white"
              : "bg-white text-black hover:bg-gray-100 hover:text-black"
          }`}
          variant="ghost"
          onClick={() => toggleBookmark({ id, imageName, descriptionBoldText })}
        >
          <CiBookmark />
        </Button>
      </div>
    </div>
  );
};

export default UserLandingPageCard;
