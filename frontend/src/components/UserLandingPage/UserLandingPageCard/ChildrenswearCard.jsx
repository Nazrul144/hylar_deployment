"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { CiBookmark } from "react-icons/ci";
import { motion } from "framer-motion";
import { BookmarkContext } from "@/providers/WishlistContext";

const ChildrenswearCard = () => {
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  const [loading, setLoading] = useState(true);
  const [childrenwear, setChildrenwear] = useState([]);

  useEffect(() => {
    const fetchChildrenwear = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();

      const ChildrenwearOffers = data.data
        .flatMap((cat) => cat.subcategories)
        .filter((sub) => sub.subcategory_name === "Childrenwear")
        .flatMap((sub) => sub.offers || []);

      setChildrenwear(ChildrenwearOffers);
      setLoading(false);
    };

    fetchChildrenwear();
  }, []);

  // Motion variants
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="lg:w-7xl mx-auto mt-8 px-2">
      {/* Heading */}
      <div className="mt-20">
        <h1 className="common-text font-bold lg:text-5xl text-center mb-2 inter-text">
          Childrenswear
        </h1>
        <h3 className="text-center mb-6">
          Must see offers from some of Blue Light Card members' best-loved{" "}
          <br />
          Fashion & Clothing partners.
        </h3>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      ) : (
        <motion.div
          className="grid lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
        >
          {childrenwear.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className="shadow-xl p-4 rounded-sm"
            >
              {/* Image */}
              <Image
                src={
                  item.image
                    ? `https://cestoid-uncoarsely-kayla.ngrok-free.dev${item.image}`
                    : "/fallback.jpg"
                }
                width={400}
                height={400}
                alt={item.product || "Womenswear"}
                style={{ width: "400px", height: "200px" }}
                className="object-contain"
              />

              {/* Brand Name */}
              <h2 className="mt-2 text-lg font-semibold">{item.brand_name}</h2>

              {/* Discount */}
              {item.discount_percent && (
                <p className="text-red-600 font-bold text-xl mt-1">
                  {item.discount_percent}% OFF
                </p>
              )}

              <div className="flex items-center gap-3 mt-3">
                <Button
                  className="border-2 rounded-none text-lg cursor-pointer"
                  variant="none"
                >
                  <Link href={`/redeem_details/${item.id}`}>Redeem {">>"}</Link>
                </Button>
                <Button
                  className={`border-2 rounded-none text-lg cursor-pointer ${
                    bookmarks.some((i) => i.id === item.id)
                      ? "bg-[#3366CC] text-white hover:bg-[#3366CC] hover:text-white"
                      : "bg-white text-black hover:bg-gray-100 hover:text-black"
                  }`}
                  variant="ghost"
                  onClick={() => toggleBookmark(item)}
                >
                  <CiBookmark />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="flex justify-center">
        <Link
          href={"/childrenwear"}
          className="bg-[#00308F] text-[#FFFFFF] mt-12 px-6 py-2 rounded-sm cursor-pointer"
        >
          View All {">>"}
        </Link>
      </div>
    </div>
  );
};

export default ChildrenswearCard;
