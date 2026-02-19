"use client";
import { BASE_URL } from "../../config/config";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaBookmark } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { HiArrowRight } from "react-icons/hi2";
import toast from "react-hot-toast";
import { WishlistContext } from "../../providers/WishlistContext";

// ─── Main Component ───────────────────────────────────────────────────────────

const BrowseCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryOffers, setCategoryOffers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingId, setSavingId] = useState(null);

  const { savedProductIds, toggleSave } = useContext(WishlistContext);
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchCategoriesAndOffers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Step 1 — Fetch all categories (public endpoint)
        const categoriesResponse = await fetch(`${BASE_URL}/api/offers/categories/`);
        if (!categoriesResponse.ok) {
          throw new Error(`Failed to fetch categories: ${categoriesResponse.status}`);
        }

        const categoriesResult = await categoriesResponse.json();

        // Accept any success format from the API
        const isSuccess =
          categoriesResult.success === true ||
          categoriesResult.status === "success" ||
          categoriesResult.statusCode === 200;

        const rawData =
          categoriesResult.data ||
          categoriesResult.results ||
          categoriesResult.categories;

        if (!isSuccess || !rawData) {
          throw new Error(categoriesResult.message || "Failed to load categories");
        }

        const fetchedCategories = Array.isArray(rawData) ? rawData : [rawData];
        setCategories(fetchedCategories);

        // Step 2 — Fetch offers per category (with auth token if logged in)
        const token = localStorage.getItem("access");
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const offersData = {};

        await Promise.all(
          fetchedCategories.map(async (category) => {
            // Use slug if available, fallback to id
            const identifier = category.slug || category.category_slug || category.id;
            const url = `${BASE_URL}/api/offers/categories/${identifier}/`;

            try {
              const res = await fetch(url, { headers });
              if (!res.ok) return;

              const result = await res.json();

              const detailSuccess =
                result.success === true ||
                result.status === "success" ||
                result.statusCode === 200;

              if (!detailSuccess || !result.data) return;

              const data = result.data;
              const allOffers = [];

              if (data?.subcategories && Array.isArray(data.subcategories)) {
                data.subcategories.forEach((sub) => {
                  const items = sub.products || sub.offers || sub.items || [];
                  allOffers.push(...items);
                });
              }

              if (allOffers.length === 0) return;

              offersData[category.id] = {
                categoryName:
                  data?.name || data?.category_name || category.name || category.category_name,
                offers: allOffers.slice(0, 6), // max 6 per category — home page preview
              };
            } catch {
              // silently skip failed categories
            }
          })
        );

        setCategoryOffers(offersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndOffers();
  }, [user]); // re-run when user logs in so auth token is attached

  const handleRedeemClick = async (e, offerId) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    if (!token) { router.push("/login"); return; }

    try {
      const response = await fetch(`${BASE_URL}/api/offers/${offerId}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          if (result.error === "PROFILE_NOT_FILLED") { router.push("/register5"); return; }
          if (result.error === "SUBSCRIPTION_REQUIRED") { router.push("/subscription"); return; }
        }
        if (response.status === 401) {
          localStorage.removeItem("access");
          router.push("/login");
          return;
        }
      }
      router.push(`/redeem_details/${offerId}`);
    } catch {
      router.push(`/redeem_details/${offerId}`);
    }
  };

  const handleBookmarkClick = async (offerId) => {
    if (!user) { router.push("/login"); return; }
    if (savingId === offerId) return;
    setSavingId(offerId);
    const result = await toggleSave(offerId);
    if (result.success) {
      toast.success(result.isSaved ? "Saved to wishlist!" : "Removed from wishlist.");
    } else {
      toast.error(result.message || "Failed to update wishlist.");
    }
    setSavingId(null);
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {[1, 2].map((s) => (
            <div key={s} className="space-y-6">
              <div className="h-7 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((c) => (
                  <div key={c} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                    <div className="p-4 space-y-3">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                      <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col justify-center items-center gap-4 px-4">
        <p className="text-red-500 dark:text-red-400 text-lg font-medium text-center">⚠️ {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-2 rounded-lg transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ── No data state ──────────────────────────────────────────────────────────
  if (Object.keys(categoryOffers).length === 0) {
    return (
      <div className="min-h-[50vh] flex justify-center items-center">
        <p className="text-gray-400 dark:text-gray-500 text-lg">No offers available at the moment.</p>
      </div>
    );
  }

  const categoriesWithOffers = categories.filter(
    (c) => categoryOffers[c.id]?.offers?.length > 0
  );

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      {/* Page header */}
      <div className="text-center mb-14 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#00308F] dark:text-blue-400"
        >
          Browse Categories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-3 text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-sm mx-auto"
        >
          Must-see offers from Blue Light Card members' best-loved partners.
        </motion.p>
      </div>

      {/* Category sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {categoriesWithOffers.map((category, catIndex) => {
          const categoryData = categoryOffers[category.id];
          const identifier = category.slug || category.category_slug || category.id;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.05 }}
            >
              {/* Section header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {categoryData.categoryName}
                </h2>
                <Link
                  href={`/category/${identifier}`}
                  className="flex items-center gap-1 text-[#00308F] dark:text-blue-400 hover:underline font-semibold text-sm transition-colors group"
                >
                  View All
                  <HiArrowRight
                    size={14}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryData.offers.map((offer, index) => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    index={index}
                    isBookmarked={savedProductIds.has(offer.id)}
                    isSaving={savingId === offer.id}
                    onRedeem={handleRedeemClick}
                    onBookmark={handleBookmarkClick}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

// ─── Offer Card ───────────────────────────────────────────────────────────────

const OfferCard = ({ offer, index, isBookmarked, isSaving, onRedeem, onBookmark }) => {
  const getImageUrl = () => {
    if (!offer.image || offer.image === "undefined" || offer.image === "null") {
      return "/fallback.jpg";
    }
    if (offer.image.startsWith("http")) return offer.image;
    return `${BASE_URL}${offer.image}`;
  };

  const hasDiscount = offer.discount_percent && parseFloat(offer.discount_percent) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
    >
      {/* Product image */}
      <div className="relative h-48 w-full bg-gray-50 dark:bg-gray-700 overflow-hidden">
        <Image
          src={getImageUrl()}
          alt={offer.brand_name || "Offer"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-2 transition-transform duration-300 hover:scale-105"
          unoptimized={true}
        />
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Brand name */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1 min-h-10">
          {offer.brand_name}
        </h3>

        {/* Discount */}
        {hasDiscount && (
          <p className="text-red-500 dark:text-red-400 font-bold text-base mb-3">
            {parseFloat(offer.discount_percent).toFixed(2)}% OFF
          </p>
        )}

        <div className="mt-auto" />

        {/* Redeem + Bookmark row — matches second screenshot exactly */}
        <div className="flex items-center gap-2 mt-3">
          {/* Redeem button — outlined style like screenshot 2 */}
          <button
            onClick={(e) => onRedeem(e, offer.id)}
            className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium py-2 px-3 rounded-md text-sm transition-colors text-center"
          >
            Redeem &gt;&gt;
          </button>

          {/* Bookmark button — same row, same height */}
          <button
            onClick={() => onBookmark(offer.id)}
            disabled={isSaving}
            aria-label={isBookmarked ? "Remove from wishlist" : "Save to wishlist"}
            className={`flex items-center justify-center w-10 h-9 rounded-md border-2 transition-all duration-200 shrink-0 ${
              isBookmarked
                ? "bg-[#3366CC] dark:bg-blue-600 border-[#3366CC] dark:border-blue-600 text-white"
                : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
            } ${isSaving ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isBookmarked
              ? <FaBookmark size={14} className="text-white" />
              : <CiBookmark size={18} />
            }
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BrowseCategories;
