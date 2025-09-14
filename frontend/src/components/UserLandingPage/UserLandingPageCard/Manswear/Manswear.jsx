"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"

type PaginationProps = {
  currentPage: number
  totalPages: number
}




const Manswear = ({
  currentPage,
  totalPages,
}: PaginationProps) => {

   

  return (
    <div className="lg:w-7xl mx-auto mt-8">
      {/*Heading Text*/}
      <div className="mt-20">
        <h1 className="common-text font-bold text-5xl text-center mb-2 inter-text">
          Manswear
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
                onClick={handleButton}
                  className="border-2 rounded-none text-lg cursor-pointer"
                  variant="none"
                >
                  <CiBookmark />
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/*Pagination*/}
        <div className="flex justify-center">
           <div className="flex items-center justify-between gap-3">
      <p className="text-muted-foreground grow text-sm" aria-live="polite">
        Page <span className="text-foreground">{currentPage}</span> of{" "}
        <span className="text-foreground">{totalPages}</span>
      </p>
      <Pagination className="w-auto">
        <PaginationContent className="gap-3">
          <PaginationItem>
            <Button
              variant="outline"
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              aria-disabled={currentPage === 1 ? true : undefined}
              role={currentPage === 1 ? "link" : undefined}
              asChild
            >
              <a
                href={
                  currentPage === 1 ? undefined : `#/page/${currentPage - 1}`
                }
              >
                Previous
              </a>
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="outline"
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              aria-disabled={currentPage === totalPages ? true : undefined}
              role={currentPage === totalPages ? "link" : undefined}
              asChild
            >
              <a
                href={
                  currentPage === totalPages
                    ? undefined
                    : `#/page/${currentPage + 1}`
                }
              >
                Next
              </a>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Manswear;



const cardInfo = [
  {
    id: "1",
    image: "/1.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "2",
    image: "/2.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "3",
    image: "/3.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "4",
    image: "/4.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "5",
    image: "/1.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "6",
    image: "/4.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "7",
    image: "/1.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "8",
    image: "/2.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "9",
    image: "/3.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "10",
    image: "/4.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "11",
    image: "/1.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  {
    id: "12",
    image: "/4.jpg",
    description: " - Happy World Rainforest Day 🌿",
  },
  
];
