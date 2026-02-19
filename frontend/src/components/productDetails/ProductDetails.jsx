"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "../../config/config";
import { WishlistContext } from "../../providers/WishlistContext";
import { UserContext } from "../../providers/UserProvider";
import {
  FaBookmark,
  FaCopy,
  FaCheck,
  FaStore,
  FaPhone,
  FaEnvelope,
  FaMapPin,
} from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { HiArrowLeft, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ProductDetails = ({ id }) => {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const { savedProductIds, toggleSave } = useContext(WishlistContext);
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchOfferDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ Correct key: "access" (not "access_token")
        const token = localStorage.getItem("access");
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${BASE_URL}/api/offers/products/${id}/`, {
          method: "GET",
          headers,
        });

        const result = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("access");
            router.push("/login");
            return;
          }
          if (response.status === 403) {
            if (result.error === "SUBSCRIPTION_REQUIRED") {
              router.push("/subscription");
              return;
            }
            if (result.error === "PROFILE_NOT_FILLED") {
              router.push("/register5");
              return;
            }
          }
          throw new Error(result.message || "Failed to load offer details");
        }

        // ✅ Accept both success formats
        const isSuccess =
          result.success === true ||
          result.status === "success" ||
          result.statusCode === 200;

        if (!isSuccess || !result.data) {
          throw new Error("Invalid response from server");
        }

        setOffer(result.data);
      } catch (err) {
        console.error("Error fetching offer details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferDetails();
  }, [id, router]);

  const handleCouponCopy = () => {
    if (!offer?.coupon_code) return;
    navigator.clipboard.writeText(offer.coupon_code);
    setCopied(true);
    toast.success("Coupon code copied!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleBookmark = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    const result = await toggleSave(offer.id);
    if (result.success) {
      toast.success(
        result.isSaved ? "Saved to wishlist!" : "Removed from wishlist.",
      );
    } else {
      toast.error(result.message || "Failed to update wishlist.");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="pt-22 min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 animate-pulse">
          <div className="h-72 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
          <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
          <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-14 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="pt-22 min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-red-500 dark:text-red-400 text-lg font-medium text-center">
          ⚠️ {error}
        </p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
        >
          <HiArrowLeft size={18} /> Go Back
        </button>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="pt-22 min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No offer details found.
        </p>
      </div>
    );
  }

  const imageUrl = offer.image
    ? offer.image.startsWith("http")
      ? offer.image
      : `${BASE_URL}${offer.image}`
    : "/fallback.jpg";

  const isBookmarked = savedProductIds.has(offer.id);
  const hasDiscount =
    offer.discount_percent && parseFloat(offer.discount_percent) > 0;
  const isExpired =
    offer.end_datetime && new Date(offer.end_datetime) < new Date();

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="pt-22 min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors text-sm font-medium cursor-pointer"
        >
          <HiArrowLeft size={16} />
          Back
        </button>

        {/* ── Card ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
        >
          {/* Hero image */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100 dark:bg-gray-800">
            <Image
              src={imageUrl}
              alt={offer.brand_name || offer.name}
              fill
              className="object-contain p-4"
              unoptimized
              priority
            />

            {/* Expired badge */}
            {isExpired && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Expired
              </div>
            )}

            {/* Discount badge */}
            {hasDiscount && !isExpired && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {parseFloat(offer.discount_percent).toFixed(0)}% OFF
              </div>
            )}

           
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Category breadcrumb */}
            {(offer.category_name || offer.subcategory_name) && (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                {offer.category_name && (
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {offer.category_name}
                  </span>
                )}
                {offer.category_name && offer.subcategory_name && (
                  <span className="text-gray-300 dark:text-gray-600">›</span>
                )}
                {offer.subcategory_name && (
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {offer.subcategory_name}
                  </span>
                )}
              </div>
            )}

            {/* Brand + Discount */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {offer.brand_name}
              </h1>
              {offer.name && offer.name !== offer.brand_name && (
                <p className="mt-1 text-gray-500 dark:text-gray-400 text-base">
                  {offer.name}
                </p>
              )}
              {hasDiscount && (
                <p className="mt-2 text-red-500 dark:text-red-400 font-bold text-xl">
                  {parseFloat(offer.discount_percent).toFixed(2)}% OFF
                </p>
              )}
            </div>

            {/* Description */}
            {offer.description && (
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                {offer.description}
              </p>
            )}

            {/* ── Coupon Code ──────────────────────────────────────────── */}
            {offer.coupon_code && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-dashed border-blue-300 dark:border-blue-700 rounded-xl p-4">
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                  Coupon Code
                </p>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono font-bold text-xl text-gray-900 dark:text-white tracking-widest">
                    {offer.coupon_code}
                  </span>
                  <button
                    onClick={handleCouponCopy}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      copied
                        ? "bg-green-500 text-white"
                        : "bg-[#00308F] dark:bg-blue-600 hover:bg-[#002070] dark:hover:bg-blue-700 text-white"
                    }`}
                  >
                    {copied ? <FaCheck size={13} /> : <FaCopy size={13} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            )}

            {/* ── Validity Dates ───────────────────────────────────────── */}
            {(offer.start_datetime || offer.end_datetime) && (
              <div className="grid grid-cols-2 gap-4">
                {offer.start_datetime && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      Valid From
                    </p>
                    <p className="text-gray-900 dark:text-white font-semibold text-sm">
                      {formatDate(offer.start_datetime)}
                    </p>
                  </div>
                )}
                {offer.end_datetime && (
                  <div
                    className={`rounded-xl p-4 border ${
                      isExpired
                        ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                        : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
                        isExpired
                          ? "text-red-500 dark:text-red-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Valid Until
                    </p>
                    <p
                      className={`font-semibold text-sm ${
                        isExpired
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {formatDate(offer.end_datetime)}
                      {isExpired && " (Expired)"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ── Shop Locations ───────────────────────────────────────── */}
            {offer.shops && offer.shops.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FaStore
                    size={15}
                    className="text-[#00308F] dark:text-blue-400"
                  />
                  Where to Redeem
                </h3>
                <div className="space-y-3">
                  {offer.shops.map((shop, index) => (
                    <div
                      key={shop.id || index}
                      className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 space-y-2"
                    >
                      {shop.address && (
                        <div className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                          <FaMapPin
                            size={13}
                            className="text-[#00308F] dark:text-blue-400 mt-0.5 flex-shrink-0"
                          />
                          <span>{shop.address}</span>
                        </div>
                      )}
                      {shop.phone && (
                        <div className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                          <FaPhone
                            size={12}
                            className="text-[#00308F] dark:text-blue-400 flex-shrink-0"
                          />
                          <a
                            href={`tel:${shop.phone}`}
                            className="hover:text-[#00308F] dark:hover:text-blue-400 transition-colors"
                          >
                            {shop.phone}
                          </a>
                        </div>
                      )}
                      {shop.email && (
                        <div className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                          <FaEnvelope
                            size={12}
                            className="text-[#00308F] dark:text-blue-400 flex-shrink-0"
                          />
                          <a
                            href={`mailto:${shop.email}`}
                            className="hover:text-[#00308F] dark:hover:text-blue-400 transition-colors"
                          >
                            {shop.email}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Action Buttons ───────────────────────────────────────── */}
            <div className="flex items-center gap-3 pt-2">
              {/* Redeem / Visit brand button */}
              {offer.brand_url ? (
                <Link
                  href={offer.brand_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      router.push("/login");
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#00308F] hover:bg-[#002070] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm"
                >
                  Redeem Offer
                  <HiArrowTopRightOnSquare size={16} />
                </Link>
              ) : (
                <button
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      router.push("/login");
                    }
                  }}
                  className="flex-1 bg-[#00308F] hover:bg-[#002070] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm"
                >
                  Redeem Offer
                </button>
              )}

              {/* Bookmark button */}
              <button
                onClick={handleBookmark}
                aria-label={isBookmarked ? "Remove bookmark" : "Save offer"}
                className={`flex items-center justify-center w-12 h-12 rounded-xl border-2 transition-all flex-shrink-0 ${
                  isBookmarked
                    ? "bg-[#00308F] dark:bg-blue-600 border-[#00308F] dark:border-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-[#00308F] dark:hover:border-blue-500"
                }`}
              >
                {isBookmarked ? (
                  <FaBookmark size={16} />
                ) : (
                  <CiBookmark size={22} />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
