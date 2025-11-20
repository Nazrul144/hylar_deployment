"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CiBookmark } from "react-icons/ci";
import { BookmarkContext } from "@/providers/BookmarkProvider";
import { useParams, useRouter } from "next/navigation";
import { CategoriesContext } from "@/providers/CategoriesProvider";
import { BASE_URL } from "@/config/config";
import { UserContext } from "@/providers/UserProvider";

const AllCategories = () => {
  const params = useParams();
  const id = Number(params.id);

  const { categories } = useContext(CategoriesContext);
  const {user} = useContext(UserContext);
  const [categoryData, setCategoryData] = useState(null);

  const router = useRouter()

  useEffect(() => {
    if (!categories.length) return;
    const category = categories.find((cat) => cat.id === id);
    setCategoryData(category);
  }, [categories, id]);

  if (!categoryData) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }


  const containerVariants = {
    show: { transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
  };

  const OfferCard = React.memo(({ item }) => {

    if (!user) {
    router.push("/register"); 
    return;
  }

    const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
    const isBookmarked = bookmarks.some((b) => b.id === item.id);

    return (
      <motion.div
        variants={cardVariants}
        className="shadow-xl p-4 rounded-sm"
      >
        <Image
          src={item.image ? `${BASE_URL}${item.image}` : "/fallback.jpg"}
          width={400}
          height={200}
          alt={item.brand_name}
          className="object-contain w-full h-[200px]"
        />

        <h2 className="mt-2 text-lg font-semibold">{item.brand_name}</h2>

        {item.discount_percent && (
          <p className="text-red-600 font-bold text-xl mt-1">
            {item.discount_percent}% OFF
          </p>
        )}

        <div className="flex items-center gap-3 mt-3">
          <Button className="border-2 rounded-none text-lg" variant="none">
            <Link href={`/redeem_details/${item.id}`}>Redeem {">>"}</Link>
          </Button>

          <Button
            className={`border-2 rounded-none text-lg transition-colors duration-200 ${
              isBookmarked
                ? "bg-[#3366CC] text-white hover:bg-[#3366CC]"
                : "bg-white text-black hover:bg-gray-100"
            }`}
            variant="ghost"
            onClick={() => toggleBookmark(item)}
          >
            <CiBookmark />
          </Button>
        </div>
      </motion.div>
    );
  });
  OfferCard.displayName = "OfferCard";

  const RenderSection = React.memo(({ title, description, items }) => {
    const [showAll, setShowAll] = useState(false);
    const visibleItems = showAll ? items : items.slice(0, 6);

    return (
      <div className="lg:w-7xl mx-auto mt-16 px-2">
        <div className="text-center mb-8">
          <h1 className="font-bold text-4xl lg:text-5xl mb-2">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>

        <motion.div
          className="grid lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
        >
          {visibleItems.map((item) => (
            <OfferCard key={item.id} item={item} />
          ))}
        </motion.div>

        {items.length > 6 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-[#00308F] text-white px-6 py-2 rounded-sm"
            >
              {showAll ? "Show Less" : "View All"}
            </button>
          </div>
        )}
      </div>
    );
  });

  RenderSection.displayName = "RenderSection";

  return (
    <div>
      <div className="relative w-full h-[550px] pt-6 flex flex-col items-center justify-center">
        <Image
          src={`${BASE_URL}${categoryData.banner_image}`}
          alt="Banner"
          fill
          className="object-cover"
        />
        <div className="absolute w-full h-full bg-black/40 z-10" />
        <div className="absolute z-20 text-center">
          <h1 className="text-7xl font-extrabold uppercase bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            {categoryData.category_name}
          </h1>
        </div>
      </div>

      {categoryData.subcategories.map((sub) => (
        <RenderSection
          key={sub.id}
          title={sub.subcategory_name}
          description={sub.description || "Explore our best deals for you."}
          items={sub.offers || []}
        />
      ))}
    </div>
  );
};

export default AllCategories;
