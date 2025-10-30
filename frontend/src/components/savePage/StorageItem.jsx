"use client";

import { useContext } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CiBookmark } from "react-icons/ci";
import { BookmarkContext } from "@/providers/BookmarkProvider";

const StorageItem = () => {
  const { bookmarks, removeBookmark } = useContext(BookmarkContext);

  return (
    <div className="lg:w-7xl mx-auto mt-8 px-2">
      {bookmarks.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500 text-lg font-medium bg-gray-50 border border-dashed border-gray-300 px-6 py-4 rounded-md shadow-sm">
            No bookmarks found
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 px-2 gap-3">
          {bookmarks.map((item) => (
            <div className="shadow-xl p-4 rounded-sm" key={item.id}>
              <Image
                src={
                  item.image
                    ? `https://cestoid-uncoarsely-kayla.ngrok-free.dev${item.image}`
                    : "/fallback.jpg"
                }
                width={400}
                height={400}
                alt={item.product || "Menswear Image"}
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
              />
              <h1 className="mt-2">{item.description}</h1>
              <div className="flex items-center gap-3 mt-3">
                <Button
                  className="border-2 rounded-none text-lg"
                  variant="none"
                >
                  <Link href={"/redeem_details"}>Redeem {">>"}</Link>
                </Button>
                <Button
                  onClick={() => removeBookmark(item.id)}
                  className="border-2 rounded-none text-lg cursor-pointer text-red-500 hover:bg-red-100"
                  variant="none"
                >
                  <CiBookmark />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StorageItem;
