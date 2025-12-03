"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { Inter, Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import { BASE_URL } from "../../config/config";
import { BookmarkContext } from "../../providers/BookmarkProvider";
import { UserContext } from "../../providers/UserProvider";

const interFont = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const montSerrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const ProductDetails = ({ id }) => {
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

  
        const token = localStorage.getItem("access_token");

      
        const headers = {
          "Content-Type": "application/json",
        };


        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}/api/offers/${id}/`, {
          method: "GET",
          headers: headers,
          credentials: "include",
        });

        const result = await response.json();
      

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("access_token");
            router.push("/login");
            throw new Error("Please login to view offer details");
          }
          if (response.status === 403) {
           
            if (result.error === "SUBSCRIPTION_REQUIRED") {
              router.push("/subscription")
            }
            if(result.error === "PROFILE_NOT_FILLED"){
              router.push("/profile")
            }
          }
        }

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
  }, [id, router]);

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


  if (!offer) {
    return <p className="text-center mt-10 text-xl">No offer details found</p>;
  }

  const imageUrl = offer.image ? `${BASE_URL}${offer.image}` : "/fallback.jpg";
  const isBookmarked = bookmarks.some((b) => b.id === offer.id);

  return (
    <div className="pt-22 flex flex-col items-center justify-center gap-8 py-16 max-w-4xl mx-auto px-4">

      <div className="w-full h-72 md:h-96 relative rounded-lg overflow-hidden shadow">
        <Image
          src={imageUrl}
          alt={offer.brand_name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

    
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