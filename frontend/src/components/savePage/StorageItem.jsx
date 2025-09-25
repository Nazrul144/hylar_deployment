"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CiBookmark } from "react-icons/ci";

const StorageItem = () => {
  const [bookmarks, setBookmarkedItems] = useState([]);

useEffect(() => {
  const savedRaw = localStorage.getItem("bookmark");
  if (savedRaw) {
    try {
      const saved = JSON.parse(savedRaw);
      if (Array.isArray(saved)) {
        setBookmarkedItems(saved); // <- pure objects
      }
    } catch (error) {
      console.error("Failed to parse bookmarks from localStorage:", error);
      setBookmarkedItems([]);
    }
  }
}, []);


  return (
    <div className="lg:w-7xl mx-auto mt-8 px-2">
      <div className="grid lg:grid-cols-3 px-2 gap-3">
        {bookmarks.map((item) => (
          <div className="shadow-xl p-4 rounded-sm" key={item.id}>
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
                className="border-2 rounded-none text-lg cursor-pointer"
                variant="none"
              >
                <CiBookmark />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorageItem;
