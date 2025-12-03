"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BASE_URL } from "../../config/config";
import { Button } from "../ui/button";

const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const getLatestNews = async () => {
      const res = await fetch(`${BASE_URL}/api/news`);
      const data = await res.json();
      setLatestNews(data.data);
    };
    getLatestNews();
  }, []);

  const visibleAllNews = showAll ? latestNews : latestNews.slice(0, 6);

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20, duration: 0.8 },
    },
  };

  return (
    <div className="mt-20 mb-10 max-w-7xl mx-auto">
      <h1 className="text-center text-xl lg:text-4xl inter-text common-text font-bold">
        Latest News
      </h1>
      <p className="text-sm montserrat-text text-center mt-3">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout.
      </p>

      {/* News Card */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
        {visibleAllNews?.map((news, index) => (
          <motion.div
            key={news.id}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: index * 0.2 }}
          >
            <Link
              href={`newsDetails/${news.slug}`}
              className="block rounded-lg p-4 shadow-xs shadow-indigo-100 bg-white dark:bg-black h-full flex flex-col"
            >
              <div className="relative w-full h-56 overflow-hidden rounded-md">
                <Image
                  width={400}
                  height={300}
                  alt="image"
                  src={news.image}
                  className="object-cover w-full h-full"
                />
            
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              <div className="mt-3">
                <div>
                  <h3 className="text-lg font-bold inter-text">{news.title}</h3>
                  <div
                    className="text-sm text-gray-600 dark:text-gray-200"
                    dangerouslySetInnerHTML={{
                      __html:
                        news.content
                          ?.split(" ")
                          ?.slice(0, 20)
                          ?.join(" ") + " ...",
                    }}
                  ></div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center ">
        <Button
          onClick={() => setShowAll(!showAll)}
          className="common-bg text-lg mt-10 flex items-center gap-2 hover:scale-105 transition-all duration-300 dark:text-white"
        >
          {showAll ? "Load Less" : "Load More"} 
        </Button>
      </div>
    </div>
  );
};

export default LatestNews;
