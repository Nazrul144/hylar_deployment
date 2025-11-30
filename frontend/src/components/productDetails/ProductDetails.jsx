"use client";
import { BASE_URL } from "@/config/config";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { Inter, Montserrat } from "next/font/google";
import { BookmarkContext } from "@/providers/BookmarkProvider";
import { UserContext } from "@/providers/UserProvider";
import { useRouter, useParams } from "next/navigation";

const interFont = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const montSerrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const ProductDetails = () => {
  const { id } = useParams(); 
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  const { user } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchOfferDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/api/offers/${id}/`);

        if (!response.ok) {
          throw new Error(`Failed to load offer details`);
        }

        const result = await response.json();
        console.log("Offer Details API Response:", result);

        if (result.status === "success" && result.data) {
          setOffer(result.data);
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (err) {
        console.error("Error fetching offer details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferDetails();
  }, [id]);

  const handleRedeemClick = (e) => {
    if (!user) {
      e.preventDefault();
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div className="pt-22 flex justify-center items-center h-[40vh]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-22 flex flex-col justify-center items-center h-[40vh]">
        <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!offer) {
    return <p className="text-center mt-10 text-xl">No offer details found</p>;
  }

  const imageUrl = offer.image ? `${BASE_URL}${offer.image}` : "/fallback.jpg";
  const isBookmarked = bookmarks.some((b) => b.id === offer.id);

  return (
    <div className="pt-22 flex flex-col items-center justify-center gap-8 py-16 max-w-4xl mx-auto px-4">

      {/* MAIN IMAGE */}
      <div className="w-full h-72 md:h-96 relative rounded-lg overflow-hidden shadow">
        <Image
          src={imageUrl}
          alt={offer.brand_name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* PRODUCT DETAILS */}
      <h1 className="text-[#00308F] font-medium md:font-bold text-5xl text-center inter-text">
        {offer.brand_name}
      </h1>

      <p className="text-[#000000] text-center montserrat-text text-xl">
        {offer.discount_percent}% OFF
      </p>

      <p className="text-gray-700 text-center max-w-2xl leading-relaxed">
        {offer.description}
      </p>

      {/* Bookmark Button */}
      <button
        onClick={() => toggleBookmark(offer)}
        className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded transition"
      >
        {isBookmarked ? "★ Bookmarked" : "☆ Add to Bookmark"}
      </button>

      {/* Redeem Button */}
      <Link
        href={offer.redeem_url || "#"}
        onClick={handleRedeemClick}
        className={`bg-[#00308F] text-[#FFFFFF] px-8 py-3 rounded-sm cursor-pointer inline-block hover:bg-[#002070] transition-colors ${montSerrat.className}`}
      >
        Redeem
      </Link>
    </div>
  );
};

export default ProductDetails;
