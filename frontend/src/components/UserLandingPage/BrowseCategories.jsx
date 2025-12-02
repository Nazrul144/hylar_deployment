"use client";
import { BASE_URL } from "@/config/config";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BrowseCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/api/offers/categories`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Browse Categories API Response:", result);

        if (result.status === "success" && result.data) {
          setCategories(result.data);
        } else if (Array.isArray(result.data)) {
          setCategories(result.data);
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="pt-22 flex justify-center items-center h-[40vh]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-22 flex flex-col justify-center items-center h-[40vh]">
        <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return <p className="text-center mt-10 text-xl">No categories available</p>;
  }

  return (
    <div className="pt-22 flex flex-col items-center justify-center gap-8 py-16">
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

<<<<<<< HEAD
      <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-20 max-w-7xl mx-auto px-4">
        {categories.map((category) => {
          const imageUrl = category.banner_image 
            ? `${BASE_URL}${category.banner_image}` 
            : "/fallback.jpg";
=======
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
>>>>>>> ef789bdf02f912e3e547c210f8013129d8727b1c

          return (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="w-60 h-60 relative overflow-hidden group block rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <Image
                src={imageUrl}
                alt={category.category_name || "Category"}
                fill
                sizes="240px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority={false}
                unoptimized={true}
              />

              <div className="absolute inset-x-0 bottom-0 h-1/4 backdrop-blur-sm bg-black/40" />
              <p className="absolute bottom-4 inset-x-0 text-center text-white text-2xl font-semibold inter-text px-2">
                {category.category_name} 
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BrowseCategories;