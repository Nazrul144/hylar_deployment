import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiBookmark } from "react-icons/ci";

const Insurance = () => {
  return (
    <div>
      <div className="lg:w-7xl mx-auto mt-8">
        {/*Heading Text*/}
        <div className="mt-20">
          <h1 className="common-text font-bold text-5xl text-center mb-2 inter-text">
            Insurance
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
            {cardInfo?.map((item) => (
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
                    Redeem {">>"}
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
          <div className="flex justify-center">
            <Link
              href={"/insurance"}
              className={`bg-[#00308F] text-[#FFFFFF] mt-12 px-6 py-2 rounded-sm cursor-pointer `}
            >
              View All {">>"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;

const cardInfo = [
  {
    id: "1",
    image: "/3.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "2",
    image: "/2.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "3",
    image: "/1.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "4",
    image: "/2.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "5",
    image: "/1.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "6",
    image: "/3.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
];
