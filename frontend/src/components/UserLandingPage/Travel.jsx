"use client";
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import UserLandingPageCard from "./UserLandingPageCard/UserLandingPageCard";
import { Inter, Montserrat } from "next/font/google";
import Link from "next/link";
import { CategoriesContext } from "../../providers/CategoriesProvider";

import { UserContext } from "../../providers/UserProvider";
import { BASE_URL } from "../../config/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { WishlistContext } from "../../providers/WishlistContext";

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
  const { savedProductIds, toggleSave } = useContext(WishlistContext);
  const { user } = useContext(UserContext);
  const router = useRouter();

  const [travelOffers, setTravelOffers] = useState([]);
  const [totalTravelOffers, setTotalTravelOffers] = useState(0);
  const [travelCategoryId, setTravelCategoryId] = useState(null);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return;
    }

    const normalize = (str) => str?.toLowerCase().replace(/[& ]/g, "") || "";
    const travelCategory = categories.find(
      (cat) => normalize(cat?.category_name) === "travel",
    );

    if (travelCategory) {
      setTravelCategoryId(travelCategory.id);

      if (
        travelCategory.subcategories &&
        Array.isArray(travelCategory.subcategories)
      ) {
        const allOffers = travelCategory.subcategories.flatMap(
          (sub) => sub?.offers || [],
        );

        setTotalTravelOffers(allOffers.length);
        setTravelOffers(allOffers.slice(0, 3));
      } else {
        setTotalTravelOffers(0);
        setTravelOffers([]);
      }
    }
  }, [categories]);

  const handleBookmarkClick = useCallback(
    async (offerId) => {
      if (!user) {
        router.push("/login");
        return;
      }

      if (savingId === offerId) return;
      setSavingId(offerId);

      const result = await toggleSave(offerId);

      if (result.success) {
        if (result.isSaved) {
          toast.success("Saved to wishlist!");
        } else {
          toast.success("Removed from wishlist.");
        }
      } else {
        toast.error(result.message || "Failed to update wishlist.");
      }

      setSavingId(null);
    },
    [toggleSave, user, router, savingId],
  );

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
            imageName={
              offer.image ? `${BASE_URL}${offer.image}` : "/fallback.jpg"
            }
            descriptionBoldText={offer.brand_name}
            descriptionLightText={`${offer.discount_percent || 0}% OFF`}
            descriptionFont={interFont}
            discountClass="text-red-500 font-bold"
            priceClass="text-red-500"
            buttonName="Redeem"
            buttonFont={montSerrat}
            bookMarkIcon="bookmark"
            bookmarkColor="dark"
            isBookmarked={savedProductIds.has(offer.id)}
            onBookmarkClick={() => handleBookmarkClick(offer.id)}
            isSaving={savingId === offer.id}
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
