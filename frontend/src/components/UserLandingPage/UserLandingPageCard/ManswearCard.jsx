"use client";

import { Button } from "@/components/ui/button";
import { BookmarkContext } from "@/providers/BookmarkProvider";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { CiBookmark } from "react-icons/ci";
import { motion } from "framer-motion";

const ManswearCard = () => {
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);

  // Loading state
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false)
  const [manswear, setManswear] = useState([])
  
  useEffect(()=>{
    const getManswearData = async()=>{
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await res.json()
      setManswear(data)
      setLoading(false);
    }
    getManswearData()
  },[])

  const visibleAll = showAll ? manswear : manswear.slice(0,6)


 
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="lg:w-7xl mx-auto mt-8 px-2">
      <div className="mt-20">
        <h1 className="font-bold text-xl lg:text-5xl text-center mb-2">Manswear</h1>
        <h3 className="text-center mb-6 px-2">
          Must see offers from some of Blue Light Card members' best-loved
          <br /> Fashion & Clothing partners.
        </h3>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      ) : (
        <motion.div
          className="grid lg:grid-cols-3 px-2 gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
        >
          {visibleAll?.map((item) => (
            <motion.div key={item.id} variants={cardVariants} className="shadow-xl p-4 rounded-sm">
              <Image src={item.image} width={400} height={400} alt="Image" />
              <h1 className="mt-2">
                <span className="font-bold">Paucek and Lage</span> {item?.title}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <Button className="border-2 rounded-none text-lg" variant="none">
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


