"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { DialogDemo } from "../dialog/DialogDemo";
import { FiRefreshCw } from "react-icons/fi";
import { Spinner } from "../ui/spinner";
import { BASE_URL } from "@/config/config";

const ProductDetails = ({ id }) => {
  const [singleItem, setSingleItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const [offerCountdown, setOfferCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Voucher Cooldown
  const [voucherCooldownSec, setVoucherCooldownSec] = useState(null);
  const [onCooldown, setOnCooldown] = useState(false);

  const formatNumber = (n) => String(n).padStart(2, "0");

  /** Fetch offer details */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/offers/categories`);
        const data = await res.json();

        const allOffers = data.data
          .flatMap((cat) => cat.subcategories)
          .flatMap((sub) => sub.offers || []);

        const item = allOffers.find((offer) => offer.id === Number(id));
        setSingleItem(item || null);

        /** Countdown for offer ending */
        if (item?.end_date) {
          const endTime = new Date(item.end_date).getTime();

          const updateCountdown = () => {
            const now = Date.now();
            const diff = endTime - now;

            if (diff > 0) {
              setOfferCountdown({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
              });
            } else {
              setOfferCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
          };

          updateCountdown();
          const interval = setInterval(updateCountdown, 1000);
          return () => clearInterval(interval);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  /** Fetch Voucher Cooldown (same logic as DialogDemo) */
  useEffect(() => {
    if (!singleItem) return;

    const checkVoucherCooldown = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return; // not logged in

        const res = await fetch(
          `${BASE_URL}/api/offers/voucher/${singleItem.id}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const json = await res.json();

        // Backend returning error because user is on cooldown
        if (res.status === 425 && json?.data) {
          const voucher = json.data;
          const offer = json.data.offer;

          const lastClaim = new Date(voucher.claimed_at).getTime();
          const now = Date.now();
          const hours = offer.voucher_cooldown_hours || 24;
          const cooldownMs = hours * 60 * 60 * 1000;
          const remainingMs = cooldownMs - (now - lastClaim);

          if (remainingMs > 0) {
            setOnCooldown(true);
            setVoucherCooldownSec(Math.floor(remainingMs / 1000));
          }
          return;
        }

        // If successful response
        if (res.ok && json?.data?.claimed && json?.data?.claimed_at) {
          const voucher = json.data;
          const offer = json.data.offer;

          const lastClaimTs = new Date(voucher.claimed_at).getTime();
          const cooldownMs =
            (offer.voucher_cooldown_hours || 24) * 60 * 60 * 1000;

          const remaining = cooldownMs - (Date.now() - lastClaimTs);

          if (remaining > 0) {
            setOnCooldown(true);
            setVoucherCooldownSec(Math.floor(remaining / 1000));
          }
        }
      } catch (err) {
        console.error("Voucher cooldown check failed:", err);
      }
    };

    checkVoucherCooldown();
  }, [singleItem]);

  /** Live countdown for voucher cooldown */
  useEffect(() => {
    if (!voucherCooldownSec) return;

    const interval = setInterval(() => {
      setVoucherCooldownSec((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setOnCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [voucherCooldownSec]);

  const formatCooldown = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  /** If loading */
  if (loading)
    return (
      <div className="flex justify-center mt-10">
        <Spinner className="size-8" />
      </div>
    );

  if (!singleItem) return <p className="text-center mt-10">Item not found.</p>;

  return (
    <div className="lg:w-7xl mx-auto px-2">
      {/* Banner */}
      <div className="relative w-full pt-6 flex items-center justify-center ">
        <Image
          src={`${BASE_URL}${singleItem.image}`}
          alt="banner"
          width={500}
          height={400}
        />
        <div className="absolute z-20 text-center">
          <h1 className="text-5xl lg:text-7xl font-extrabold uppercase bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            {singleItem.brand_name}
          </h1>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center mt-16 mb-10">
        <h1 className="font-bold text-xl lg:text-4xl text-[#00308F] mb-4">
          Voucher Gift – Get {singleItem.discount_percent || 0}% OFF!
        </h1>

        {/* VOUCHER COOLDOWN TIMER */}
        {onCooldown ? (
          <p className="text-red-600 font-semibold text-xl mt-4">
            New voucher available in:{" "}
            <span className="font-bold text-[#00308F]">
              {formatCooldown(voucherCooldownSec)}
            </span>
          </p>
        ) : (
          <p className="text-green-600 text-lg font-semibold">Voucher Available ✔</p>
        )}

        <p className="text-gray-500 mt-4">
          Offer ends in: {offerCountdown.days}d {offerCountdown.hours}h{" "}
          {offerCountdown.minutes}m {offerCountdown.seconds}s
        </p>
      </div>

      {/* Countdown Grid */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl text-gray-700 mb-4">
          Hurry, Before It's Too Late!
        </h2>

        <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
          {[
            { label: "Days", value: offerCountdown.days },
            { label: "Hr", value: offerCountdown.hours },
            { label: "Mins", value: offerCountdown.minutes },
            { label: "Sec", value: offerCountdown.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center w-20 h-24 bg-white shadow-md rounded-xl"
            >
              <span className="text-3xl font-mono font-bold text-gray-800">
                {formatNumber(item.value)}
              </span>
              <span className="text-sm text-gray-500 mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Shop Info */}
      <div className="mt-16 text-center">
        <h2 className="text-xl lg:text-3xl font-bold text-[#00308F]">
          Visit Our Shop
        </h2>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <DialogDemo offerId={singleItem?.id} />

          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center w-12 h-12 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
            title="Refresh Page"
          >
            <FiRefreshCw className="text-xl text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
