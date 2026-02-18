"use client";
import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";
import { WishlistContext } from "../../../providers/WishlistContext";
import { UserContext } from "../../../providers/UserProvider";
import { BASE_URL } from "../../../config/config";
import toast from "react-hot-toast";

export default function ViewAllPage() {
  const { id } = useParams();
  const subId = Number(id);
  const router = useRouter();
  const searchParams = useSearchParams();

  const slug = searchParams.get("slug");

  const { savedProductIds, toggleSave } = useContext(WishlistContext);
  const { user } = useContext(UserContext);

  const [subData, setSubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setError("Missing category information.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${BASE_URL}/api/offers/categories/${slug}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.statusCode === 200 && result.data) {
          const subcategory = result.data.subcategories?.find(
            (sub) => sub.id === subId
          );

          if (subcategory) {
            setSubData(subcategory);
          } else {
            throw new Error("Subcategory not found.");
          }
        } else {
          throw new Error(result.message || "Failed to load data.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (subId) fetchData();
  }, [subId, slug]);

  const handleToggleSave = async (productId) => {
    if (!user) {
      router.push("/login");
      return;
    }
    const result = await toggleSave(productId);
    if (result.success) {
      if (result.isSaved) {
        toast.success("Saved to wishlist!");
      } else {
        toast.success("Removed from wishlist.");
      }
    } else {
      toast.error(result.message || "Failed to update wishlist.");
    }
  };

  const containerVariants = useMemo(() => ({
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  }), []);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  }), []);

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
        <p className="text-red-600 dark:text-red-400 text-xl mb-4">⚠️ {error}</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  if (!subData) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <p className="text-gray-600 dark:text-gray-400 text-xl mb-4">Subcategory not found</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const products = subData.products || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="lg:max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="mb-4 border-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            ← Back
          </Button>
          <h1 className="text-4xl lg:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
            {subData.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {products.length} {products.length === 1 ? "Product" : "Products"} Available
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-xl mb-4">
              No products found for this subcategory.
            </p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {products.map((item) => {
              const isBookmarked = savedProductIds.has(item.id);
              return (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  className="shadow-xl dark:shadow-gray-800 p-4 rounded-sm bg-white dark:bg-gray-800 hover:shadow-2xl dark:hover:shadow-gray-700 transition-shadow border border-transparent dark:border-gray-700"
                >
                  <div className="relative w-full h-[200px] mb-3 bg-gray-100 dark:bg-gray-700 rounded">
                    <Image
                      src={
                        item.image && item.image !== "undefined"
                          ? item.image.startsWith("http")
                            ? item.image
                            : `${BASE_URL}${item.image}`
                          : "/fallback.jpg"
                      }
                      fill
                      alt={item.brand_name || "Product"}
                      className="object-contain"
                    />
                  </div>

                  <h2 className="mt-2 text-lg font-semibold line-clamp-2 text-gray-900 dark:text-white">
                    {item.brand_name}
                  </h2>

                  {item.discount_percent && parseFloat(item.discount_percent) > 0 && (
                    <p className="text-red-600 dark:text-red-400 font-bold text-xl mt-1">
                      {item.discount_percent}% OFF
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-3">
                    <Button
                      className="border-2 border-gray-300 dark:border-gray-600 rounded-none text-lg flex-1 bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                      variant="none"
                    >
                      {user ? (
                        <Link href={`/redeem_details/${item.id}`}>
                          Redeem {">>"}
                        </Link>
                      ) : (
                        <span onClick={() => router.push("/login")}>
                          Redeem {">>"}
                        </span>
                      )}
                    </Button>

                    <Button
                      className={`border-2 rounded-none text-lg transition-colors duration-200 ${
                        isBookmarked
                          ? "bg-[#3366CC] dark:bg-blue-600 text-white hover:bg-[#2855b3] dark:hover:bg-blue-700 border-[#3366CC] dark:border-blue-600"
                          : "bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600"
                      }`}
                      variant="ghost"
                      onClick={() => handleToggleSave(item.id)}
                    >
                      {isBookmarked ? (
                        <FaBookmark size={18} className="text-white" />
                      ) : (
                        <CiBookmark size={24} />
                      )}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}