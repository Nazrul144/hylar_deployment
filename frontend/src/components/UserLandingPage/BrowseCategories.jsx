import { BASE_URL } from "@/config/config";
import { CategoriesContext } from "@/providers/CategoriesProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const BrowseCategories = () => {
  const { categories, loading } = useContext(CategoriesContext);

  if (loading) {
    return <p className="text-center mt-10 text-xl">Loading categories...</p>;
  }

  if (!categories || categories.length === 0) {
    return <p className="text-center mt-10 text-xl">No categories available</p>;
  }

  return (
    <div className="pt-22 flex flex-col items-center justify-center gap-8">
      <h1 className="text-[#00308F] font-medium md:font-bold text-5xl text-center inter-text">
        Browse Categories
      </h1>

      <div className="flex flex-col items-center justify-center">
        <p className="text-[#000000] text-center montserrat-text">
          Must see offers from some of Blue Light Card
        </p>
        <p className="text-[#000000] text-center montserrat-text">
          members' best-loved partners.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-20">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="w-60 h-60 relative overflow-hidden group block"
          >
            <Image
              src={
                category.banner_image
                  ? `${BASE_URL}${category.banner_image}`
                  : "/placeholder.png"
              }
              alt={category.category_name || "Category"}
              fill
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-x-0 bottom-0 h-1/4 backdrop-blur-sm bg-black/30" />
            <p className="absolute bottom-4 inset-x-0 text-center text-white text-2xl inter-text">
              {category.category_name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrowseCategories;
