"use client";

import { Button } from "@/components/ui/button";
import { BookmarkContext } from "@/providers/BookmarkProvider";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CiBookmark } from "react-icons/ci";

const ManswearCard = () => {
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);

  console.log(bookmarks);

  return (
    <div className="lg:w-7xl mx-auto mt-8 px-2">
      <div className="mt-20">
        <h1 className="font-bold text-xl lg:text-5xl text-center mb-2">
          Manswear
        </h1>
        <h3 className="text-center mb-6 px-2">
          Must see offers from some of Blue Light Card members' best-loved
          <br /> Fashion & Clothing partners.
        </h3>
      </div>

      <div className="grid lg:grid-cols-3 px-2 gap-3">
        {cardInfo?.map((item) => (
          <div className="shadow-xl p-4 rounded-sm" key={item.id}>
            <Image src={item.image} width={400} height={400} alt="Image" />
            <h1 className="mt-2">
              <span className="font-bold">Paucek and Lage</span>{" "}
              {item.description}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <Button className="border-2 rounded-none text-lg" variant="none">
                <Link href={"/redeem_details"}>Redeem {">>"}</Link>
              </Button>

              <Button
                className={`border-2 rounded-none text-lg cursor-pointer ${
                  bookmarks.some((i) => i.id === item.id)
                    ? "bg-[#3366CC] text-white hover:bg-[#3366CC] hover:text-white" // ✅ override hover
                    : "bg-white text-black hover:bg-gray-100 hover:text-black"
                }`}
                variant="ghost"
                onClick={() => toggleBookmark(item)}
              >
                <CiBookmark />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          href={"/manswear"}
          className="bg-[#00308F] text-white mt-12 px-6 py-2 rounded-sm"
        >
          View All {">>"}
        </Link>
      </div>
    </div>
  );
};

export default ManswearCard;

const cardInfo = [
  {
    id: "1",
    image: "/fashion/1.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "2",
    image: "/fashion/2.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "3",
    image: "/fashion/3.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "4",
    image: "/fashion/4.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "5",
    image: "/fashion/5.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "6",
    image: "/fashion/6.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
];
