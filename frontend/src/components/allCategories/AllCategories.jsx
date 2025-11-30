"use client";
import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CiBookmark } from "react-icons/ci";
import { BookmarkContext } from "@/providers/BookmarkProvider";
import { useParams, useRouter } from "next/navigation";
import { BASE_URL } from "@/config/config";
import { UserContext } from "@/providers/UserProvider";

const AllCategories = () => {
  const params = useParams();
  const id = Number(params.id);
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);

  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bookmarkIds = useMemo(() => {
    return new Set(bookmarks.map(b => b.id));
  }, [bookmarks]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);

        const endpoint = `${BASE_URL}/api/offers/category/${id}/`;
        console.log("Fetching from:", endpoint);

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const result = await response.json();
        console.log("API Response:", result);

        if (result.status === "success" && result.data) {
          setCategoryData(result.data);
        } else if (result.data) {
          setCategoryData(result.data);
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (err) {
        console.error("Error fetching category:", err);
        setError(err.message || "Failed to load category data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategoryData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-600 text-xl">Category not found</p>
      </div>
    );
  }

  const OfferCard = React.memo(({ item }) => {
    const isBookmarked = bookmarkIds.has(item.id);

    const handleRedeemClick = (e) => {
      if (!user) {
        e.preventDefault();
        router.push("/login");
      }
    };

    return (
      <div className="shadow-xl p-4 rounded-sm">
        <Image
          src={item.image ? `${BASE_URL}${item.image}` : "/fallback.jpg"}
          width={400}
          height={200}
          alt={item.brand_name || "Offer"}
          className="object-contain w-full h-[200px]"
        />

        <h2 className="mt-2 text-lg font-semibold">{item.brand_name}</h2>

        {item.discount_percent && (
          <p className="text-red-600 font-bold text-xl mt-1">
            {item.discount_percent}% OFF
          </p>
        )}

        <div className="flex items-center gap-3 mt-3">
          <Button 
            className="border-2 rounded-none text-lg" 
            variant="none"
            onClick={handleRedeemClick}
          >
            {user ? (
              <Link href={`/redeem_details/${item.id}`}>Redeem {">>"}</Link>
            ) : (
              <span>Redeem {">>"}</span>
            )}
          </Button>

          <Button
            className={`border-2 rounded-none text-lg ${
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
      </div>
    );
  });
  OfferCard.displayName = "OfferCard";

  const RenderSection = React.memo(
    ({ title, description, items, subcategoryId, categoryId }) => {
      if (!items || items.length === 0) return null;

      const visibleItems = items.slice(0, 6);

      return (
        <div className="lg:w-7xl mx-auto mt-16 px-2">
          <div className="text-center mb-8">
            <h1 className="font-bold text-4xl lg:text-5xl mb-2">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {visibleItems.map((item) => (
              <OfferCard key={item.id} item={item} />
            ))}
          </div>

          {items.length > 6 && (
            <div className="flex justify-center mt-10">
              <Link
                href={`/view_all/${subcategoryId}?categoryId=${categoryId}`}
                className="bg-[#00308F] text-white px-6 py-2 rounded-sm inline-block"
              >
                View All
              </Link>
            </div>
          )}
        </div>
      );
    }
  );
  RenderSection.displayName = "RenderSection";

  return (
    <div>
      {categoryData.banner_image && (
        <div className="relative w-full h-[550px] pt-6 flex flex-col items-center justify-center">
          <Image
            src={`${BASE_URL}${categoryData.banner_image}`}
            alt={categoryData.category_name || "Banner"}
            fill
            className="object-cover"
          />
          <div className="absolute w-full h-full z-10 bg-black/30" />
          <div className="absolute z-20 text-center">
            <h1 className="text-7xl font-extrabold uppercase bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              {categoryData.category_name}
            </h1>
          </div>
        </div>
      )}

      {categoryData.subcategories && categoryData.subcategories.length > 0 ? (
        categoryData.subcategories.map((sub) => (
          <RenderSection
            key={sub.id}
            subcategoryId={sub.id}
            categoryId={categoryData.id}
            title={sub.subcategory_name}
            description={sub.description || "Explore our best deals for you."}
            items={sub.offers || []}
          />
        ))
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 text-xl">No offers available yet</p>
        </div>
      )}
    </div>
  );
};

export default AllCategories;