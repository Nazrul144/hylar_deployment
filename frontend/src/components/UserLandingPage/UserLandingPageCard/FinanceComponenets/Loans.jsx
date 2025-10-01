"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { CiBookmark } from "react-icons/ci";
import { motion } from "framer-motion";
import { BookmarkContext } from "@/providers/BookmarkProvider";

const Loans = () => {
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
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
    <div className="lg:w-7xl mx-auto mt-4">
      {/* Heading */}
      <div className="mt-14">
        <h1 className="common-text font-bold text-5xl text-center mb-2 inter-text">
          Loans
        </h1>
        <h3 className="text-center mb-6">
          Must see offers from some of Blue Light Card members' best-loved{" "}
          <br />
          Fashion & Clothing partners.
        </h3>
      </div>

      <motion.div
        className="grid lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
      >
        {cardInfo?.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            className="shadow-xl p-4 rounded-sm"
          >
            <Image
              src={item.image}
              width={400}
              height={400}
              alt="Image"
              className="block"
            />
            <h1 className="mt-2">
              <span className="font-bold">Paucek and Lage</span>{" "}
              {item.description}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <Button
                className="border-2 rounded-none text-lg cursor-pointer"
                variant="none"
              >
                <Link href={"/redeem_details"}>Redeem {">>"}</Link>
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

      <div className="flex justify-center">
        <Link
          href={"/loans"}
          className="bg-[#00308F] text-[#FFFFFF] mt-12 px-6 py-2 rounded-sm cursor-pointer"
        >
          View All {">>"}
        </Link>
      </div>
    </div>
  );
};

export default Loans;

const cardInfo = [
  { id: "1", image: "/2.jpg", description: " - Happy World Rainforest Day 🌿" },
  { id: "2", image: "/2.jpg", description: " - Happy World Rainforest Day 🌿" },
  { id: "3", image: "/2.jpg", description: " - Happy World Rainforest Day 🌿" },
  { id: "4", image: "/2.jpg", description: " - Happy World Rainforest Day 🌿" },
  { id: "5", image: "/2.jpg", description: " - Happy World Rainforest Day 🌿" },
  { id: "6", image: "/2.jpg", description: " - Happy World Rainforest Day 🌿" },
];
