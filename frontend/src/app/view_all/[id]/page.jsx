"use client";
import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CiBookmark } from "react-icons/ci";
import { BookmarkContext } from "@/providers/BookmarkProvider";
import { UserContext } from "@/providers/UserProvider";
import { BASE_URL } from "@/config/config";

export default function ViewAllPage() {
  const { id } = useParams();
  const subId = Number(id);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const categoryId = searchParams.get('categoryId');

  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  const { user } = useContext(UserContext);

  const [subData, setSubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategoryData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!categoryId) {
          throw new Error("Category ID is missing. Please navigate from the category page.");
        }

        const endpoint = `${BASE_URL}/api/offers/category/${categoryId}/`;
        console.log("Fetching category from:", endpoint);

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const result = await response.json();
        console.log("Category API Response:", result);

        if (result.status === "success" && result.data) {
          const categoryData = result.data;
          const subcategory = categoryData.subcategories?.find(
            (sub) => sub.id === subId
          );

          if (!subcategory) {
            throw new Error("Subcategory not found");
          }

          setSubData({
            ...subcategory,
            category_name: categoryData.category_name,
          });
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (err) {
        console.error("Error fetching subcategory:", err);
        setError(err.message || "Failed to load subcategory data");
      } finally {
        setLoading(false);
      }
    };

    if (subId && categoryId) {
      fetchSubcategoryData();
    } else if (subId && !categoryId) {
      setError("Category ID is missing. Please navigate from the category page.");
      setLoading(false);
    }
  }, [subId, categoryId]);

  const containerVariants = useMemo(
    () => ({
      show: { transition: { staggerChildren: 0.1 } },
    }),
    []
  );

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
    }),
    []
  );

  const handleRedeemClick = (e, itemId) => {
    if (!user) {
      e.preventDefault();
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] px-4">
        <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  if (!subData) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-600 text-xl">Subcategory not found</p>
      </div>
    );
  }

  const offers = subData.offers || [];

  return (
    <div className="container mx-auto py-10 px-4 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-2">
          {subData.subcategory_name}
        </h1>
        <p className="text-gray-600 text-lg">
          {subData.category_name && `Category: ${subData.category_name}`}
        </p>
        <p className="text-gray-500 mt-2">
          {offers.length} {offers.length === 1 ? "Offer" : "Offers"} Available
        </p>
      </div>

      {offers.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-xl mb-4">
            No offers found for this subcategory.
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      ) : (
        <>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                  className="shadow-xl p-4 rounded-sm hover:shadow-2xl transition-shadow"
                >
                  <Image
                    src={item.image ? `${BASE_URL}${item.image}` : "/fallback.jpg"}
                    width={400}
                    height={200}
                    alt={item.brand_name || "Offer"}
                    className="object-contain w-full h-[200px]"
                  />

                  <h2 className="mt-2 text-lg font-semibold">{item.brand_name}</h2>

                  {item.product && (
                    <p className="text-gray-600 text-sm mt-1">{item.product}</p>
                  )}

                  {item.discount_percent && (
                    <p className="text-red-600 font-bold text-xl mt-1">
                      {item.discount_percent}% OFF
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-3">
                    <Button 
                      className="border-2 rounded-none text-lg" 
                      variant="none"
                      onClick={(e) => handleRedeemClick(e, item.id)}
                    >
                      {user ? (
                        <Link href={`/redeem_details/${item.id}`}>Redeem {">>"}</Link>
                      ) : (
                        <span>Redeem {">>"}</span>
                      )}
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

          <div className="flex justify-center mt-10">
            <Button
              onClick={() => router.back()}
              className="bg-gray-600 text-white px-6 py-2 rounded-sm hover:bg-gray-700"
            >
              ← Back to Category
            </Button>
          </div>
        </>
      )}
    </div>
  );
}