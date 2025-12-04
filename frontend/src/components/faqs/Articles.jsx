"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useFilteredData } from "../../providers/SearchContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Article data for Maximum Savings
const articlesData = [
  {
    id: 1,
    title: "Having trouble logging in?",
    description: "Refer to the following articles to help tackle your logging in query",
    link: "#",
    linkText: "Relatable articles",
    category: "Account Access"
  },
  {
    id: 2,
    title: "Who is eligible?",
    description: "Learn about eligibility requirements for Maximum Savings memberships and how to verify your account status for exclusive deals and offers.",
    category: "Eligibility"
  }
];

const Articles = () => {
  // Filter articles based on search query
  const filteredArticles = useFilteredData(articlesData, ['title', 'description', 'category']);

  return (
    <div className="lg:w-7xl mx-auto">
      <div className="mt-10 px-4 lg:px-0">
        {/* Titles */}
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="font-bold text-center text-xl lg:text-5xl text-[#00308F] montserrat-text mb-3"
        >
          Articles that you might find useful
        </motion.h1>

        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.8, delay: 0.2 } } }}
          className="text-gray-600 text-center common-text mb-8 dark:text-white"
        >
          Please refer to the below articles which may help to resolve your query
        </motion.h1>

        {/* Show message if no results */}
        {filteredArticles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <p className="text-gray-500 text-lg">No articles found matching your search.</p>
          </motion.div>
        ) : (
          /* Cards */
          <div className="lg:flex gap-8">
            {filteredArticles[0] && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                viewport={{ once: true }}
                className="lg:w-[536px] h-[218px] rounded-lg bg-[#00308F] text-white"
              >
                <div className="flex items-center gap-6">
                  <div className="mt-14 ml-4">
                    <Image
                      src={"/light.png"}
                      width={40}
                      height={40}
                      alt="Light"
                    />
                  </div>
                  <div className="mt-6 lg:mt-14">
                    <h1 className="text-xl lg:text-2xl font-bold mb-2">
                      {filteredArticles[0].title}
                    </h1>
                    <h1 className="lg:mb-4">
                      {filteredArticles[0].description}
                    </h1>
                    <a className="underline mt-4 text-gray-300" href={filteredArticles[0].link}>
                      {filteredArticles[0].linkText}
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {filteredArticles[1] && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }}
                viewport={{ once: true }}
                className="mt-8 px-2 lg:mt-0"
              >
                <h1 className="text-xl lg:text-3xl font-bold">{filteredArticles[1].title}</h1>
                <p>{filteredArticles[1].description}</p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;