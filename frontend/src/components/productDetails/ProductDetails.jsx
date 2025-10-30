"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { DialogDemo } from "../dialog/DialogDemo";
import { FiRefreshCw } from "react-icons/fi";
import { Spinner } from "../ui/spinner";

const ProductDetails = ({ id }) => {
  const [singleItem, setSingleItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Countdown state
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const formatNumber = (num) => String(num).padStart(2, "0");

  // Fetch single item from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();

        const allOffers = data.data
          .flatMap((cat) => cat.subcategories)
          .flatMap((sub) => sub.offers || []);

        const item = allOffers.find(
          (offer) => offer.id.toString() === id.toString()
        );
        setSingleItem(item || null);

        // Initialize countdown from end_date
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

  if (loading) return <div className="flex justify-center mt-10 "><Spinner className="size-8" /></div>
  if (!singleItem) return <p className="text-center mt-10">Item not found.</p>;

  return (
    <div className="lg:w-7xl mx-auto px-2">
      <div>
        {/* Static Banner */}
        <Image
          src="/detailsPageBannerImage/banner.png"
          width={1600}
          height={600}
          alt="Banner Image"
          className="mb-10"
        />

        {/* Title */}
        <h1 className="font-bold text-xl lg:text-5xl text-[#00308F] mb-4 text-center mt-16">
          Voucher Gift – Get {singleItem.discount_percent || 0}% OFF Your Meal!
        </h1>

        {/* Discount / Product Info */}
        <div className="text-center mb-10">
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
          <p className="text-gray-500">
            Offer ends in: {time.days}d {time.hours}h {time.minutes}m{" "}
            {time.seconds}s
          </p>
        </div>

        {/* Countdown */}
        <div className="mt-10">
          <h1 className="text-center text-2xl text-gray-700">
            Hurry, Before It's Too Late!
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
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

          {/* Shop Info */}
          <div className="mt-10">
            <h1 className="text-xl lg:text-3xl font-bold text-[#00308F] text-center">
              Visit Our Shop
            </h1>
            <h3 className="text-center mt-2 mb-4 text-xl">
              We welcome you to our cozy space where taste meets comfort. Stop
              by for a <br /> memorable dining experience.
            </h3>
            <div className="flex justify-center mt-10">
              <div className="text-xl space-y-3">
                <div className="flex items-center gap-2">
                  <IoLocationSharp className="text-[#00308F] text-2xl" />
                  <h1 className="font-bold">Address: </h1>
                  <span> Maximum Savings</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-[#00308F] text-2xl" />
                  <h1 className="font-bold">Phone:</h1>
                  <span>+44 4344 43453</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdEmail className="text-[#00308F] text-2xl" />
                  <h1 className="font-bold">Email:</h1>
                  <span>example@gmail.com</span>
                </div>
              </div>
            </div>
            {/* Dialog */}
          
            <div className="flex items-center justify-center gap-3 mt-6">
              {/* View Coupon / Dialog Button */}
              <DialogDemo />

              {/* Refresh Button */}
              <button
                onClick={() => window.location.reload()} // Reload the page
                className="flex items-center justify-center w-12 h-12 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                title="Refresh Page"
              >
                <FiRefreshCw className="text-xl text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
