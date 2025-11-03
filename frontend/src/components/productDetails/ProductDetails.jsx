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

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  console.log(singleItem);

  const formatNumber = (num) => String(num).padStart(2, "0");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all categories
        const res = await fetch(`${BASE_URL}/api/offers/categories`);
        const data = await res.json();

        // Flatten all offers
        const allOffers = data.data
          .flatMap((cat) => cat.subcategories)
          .flatMap((sub) => sub.offers || []);

        // Find the offer by id
        const item = allOffers.find((offer) => offer.id === Number(id));
        setSingleItem(item || null);

        // Initialize countdown
        if (item?.end_date) {
          const endTime = new Date(item.end_date).getTime();
          const updateCountdown = () => {
            const now = new Date().getTime();
            const diff = endTime - now;
            if (diff > 0) {
              const days = Math.floor(diff / (1000 * 60 * 60 * 24));
              const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
              const minutes = Math.floor((diff / (1000 * 60)) % 60);
              const seconds = Math.floor((diff / 1000) % 60);
              setTime({ days, hours, minutes, seconds });
            } else {
              setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
      <div className="relative w-full pt-6 flex items-center justify-center">
        <Image
          src={`${BASE_URL}${singleItem.image}`}
          alt="banner test"
          width={500}
          height={400}
        />
        <div className="absolute w-full h-full bg-black/40 z-10" />
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
        <p className="text-xl mb-2">{singleItem.description}</p>
        <p className="text-lg">
          Brand:{" "}
          <a
            href={singleItem.brand_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {singleItem.brand_name}
          </a>
        </p>
        <p className="text-gray-500 mt-2">
          Offer ends in: {time.days}d {time.hours}h {time.minutes}m{" "}
          {time.seconds}s
        </p>
      </div>

      {/* Countdown */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl text-gray-700 mb-4">
          Hurry, Before It's Too Late!
        </h2>
        <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
          {[
            { label: "Days", value: time.days },
            { label: "Hr", value: time.hours },
            { label: "Mins", value: time.minutes },
            { label: "Sec", value: time.seconds },
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
        <p className="mt-2 mb-4 text-xl">
          We welcome you to our cozy space where taste meets comfort. Stop by
          for a memorable experience.
        </p>
        <div className="flex justify-center mt-10">
          <div className="text-xl space-y-3">
            <div className="flex items-center gap-2">
              <IoLocationSharp className="text-[#00308F] text-2xl" />
              <span className="font-bold">Address:</span> Maximum Savings
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-[#00308F] text-2xl" />
              <span className="font-bold">Phone:</span> +44 4344 43453
            </div>
            <div className="flex items-center gap-2">
              <MdEmail className="text-[#00308F] text-2xl" />
              <span className="font-bold">Email:</span> example@gmail.com
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <DialogDemo />
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
