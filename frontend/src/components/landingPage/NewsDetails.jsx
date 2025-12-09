"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import { BASE_URL } from "../../config/config";

const NewsDetails = ({ slug }) => {
  const router = useRouter();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/news/${slug}`);
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    };
    fetchNews();
  }, [slug]);

  if (!news) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
        Loading...
      </div>
    );
  }

  news;

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      {/* Back Button */}
      <Button
        onClick={() => router.back()}
        variant="outline"
        className="flex items-center gap-2 mb-8 hover:bg-gray-100 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </Button>

      {/* News Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-md p-6 md:p-10"
      >
        {/* Image */}
        <div className="w-full h-[380px] rounded-lg overflow-hidden">
          <Image
            src={news?.data?.image}
            alt={news.title}
            width={900}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold mt-6 mb-3 inter-text text-gray-900">
          {news?.data.title}
        </h1>

        {/* Meta info */}
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
          <p className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {new Date(news?.data?.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div
          className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: news?.data?.content }}
        ></div>
      </motion.div>
    </div>
  );
};

export default NewsDetails;
