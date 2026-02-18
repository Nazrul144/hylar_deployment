"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import CatagoriesSlider from "../CatagoriesSlider";
import { BookmarkContext } from "@/providers/WishlistContext";

const Womenswear = () => {
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  const [womenswear, setWomenswear] = useState([]);

  useEffect(() => {
    const getManswearData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setWomenswear(data);
    };
    getManswearData();
  }, []);

  return (
    <div>
      {/*Slider*/}
      <div className="relative w-full h-[550px] pt-6 flex flex-col items-center justify-center">
        <video
          src={"fashion/cover.mp4"}
          autoPlay
          muted
          loop
          controls={false}
          className="absolute w-full h-full  
                object-cover"
        />
        <div className="absolute w-full h-full z-10 bg-gray-800/40" />{" "}
        {/*Overlay*/}
        <div className="absolute flex flex-col items-center justify-center gap-4 z-30">
          <h1
            className={`text-[#FFFFFF] text-center font-extrabold text-8xl montserrat-text`}
          >
            FASHION
          </h1>
        </div>
      </div>
      <div className="lg:w-7xl mx-auto mt-8">
        {/*Heading Text*/}
        <div className="mt-20">
          <h1 className="common-text font-bold text-5xl text-center mb-2 inter-text">
            Womenswear
          </h1>
          <h3 className="text-center mb-6">
            Must see offers from some of Blue Light Card members' best-loved{" "}
            <br />
            Fashion & Clothing partners.
          </h3>
          {/*Card*/}
        </div>
        <div>
          <div className="grid lg:grid-cols-3 gap-4">
            {womenswear?.map((item) => (
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
                    className="border-2 rounded-none text-lg"
                    variant="none"
                  >
                    <Link href={`/redeem_details/${item.id}`}>
                      Redeem {">>"}
                    </Link>
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
              </div>
            ))}
          </div>
          {/*Pagination*/}
          <div className="flex justify-center mt-12">
            <ul className="flex justify-center gap-1 text-gray-900">
              <li>
                <a
                  href="#"
                  className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
                  aria-label="Previous page"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium transition-colors hover:bg-gray-50"
                >
                  1
                </a>
              </li>

              <li className="block size-8 rounded border border-indigo-600 bg-indigo-600 text-center text-sm/8 font-medium text-white">
                2
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium transition-colors hover:bg-gray-50"
                >
                  3
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium transition-colors hover:bg-gray-50"
                >
                  4
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
                  aria-label="Next page"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <CatagoriesSlider />
        </div>
      </div>
    </div>
  );
};

export default Womenswear;
