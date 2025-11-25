"use client";
import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CiBookmark } from "react-icons/ci";
import { CategoriesContext } from "@/providers/CategoriesProvider";
import { BookmarkContext } from "@/providers/BookmarkProvider";
import { UserContext } from "@/providers/UserProvider";
import { BASE_URL } from "@/config/config";

export default function ViewAllPage() {
  const { id } = useParams(); // subcategory id
  const subId = Number(id);
  const router = useRouter();

  const { categories } = useContext(CategoriesContext);
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  const { user } = useContext(UserContext);

  const [subData, setSubData] = useState(null);

  useEffect(() => {
    if (!categories?.length) return;

    let found = null;
    for (const cat of categories) {
      const sub = cat.subcategories?.find((s) => s.id === subId);
      if (sub) {
        found = { ...sub, parentCategoryName: cat.category_name };
        break;
      }
    }
    setSubData(found);
  }, [categories, subId]);

  const containerVariants = useMemo(
    () => ({
      show: { transition: { staggerChildren: 0.2 } },
    }),
    []
  );

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
    }),
    []
  );

  if (!subData) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  const offers = subData.offers || [];

  return (
    <div className="container mx-auto py-10 px-2">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">{subData.subcategory_name} — All Offers</h1>
        <p className="text-gray-500 mt-1">
          Category: {subData.parentCategoryName}
        </p>
      </div>

      {offers.length === 0 ? (
        <p className="text-center text-gray-600">No offers found for this subcategory.</p>
      ) : (
        <motion.div
          className="grid lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {offers.map((item) => {
            const isBookmarked = bookmarks.some((b) => b.id === item.id);

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="shadow-xl p-4 rounded-sm"
              >
                <Image
                  src={item.image ? `${BASE_URL}${item.image}` : "/fallback.jpg"}
                  width={400}
                  height={200}
                  alt={item.brand_name}
                  className="object-contain w-full h-[200px]"
                />

                <h2 className="mt-2 text-lg font-semibold">{item.brand_name}</h2>

                {item.discount_percent && (
                  <p className="text-red-600 font-bold text-xl mt-1">
                    {item.discount_percent}% OFF
                  </p>
                )}

                <div className="flex items-center gap-3 mt-3">
                  <Button className="border-2 rounded-none text-lg" variant="none">
                    <Link href={`/redeem_details/${item.id}`}>Redeem {">>"}</Link>
                  </Button>

                  <Button
                    className={`border-2 rounded-none text-lg transition-colors duration-200 ${
                      isBookmarked
                        ? "bg-[#3366CC] text-white hover:bg-[#3366CC]"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                    variant="ghost"
                    onClick={() => {
                      if (!user) {
                        router.push("/register");
                        return;
                      }
                      toggleBookmark(item);
                    }}
                  >
                    <CiBookmark />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
