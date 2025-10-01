"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is Mobbin?",
    answer: `Mobbin is the world's largest UI & UX reference library. It's always up-to-date, includes mobile and web, and lets you filter by specific app categories, UI elements, flow patterns, and more.
Join hundreds of thousands of designers using Mobbin to accelerate research, get decision-makers on board, and start designing faster.`,
  },
  {
    question: "How often do you update the library?",
    answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in,
recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
consequuntur distinctio corporis earum similique!`,
  },
  {
    question: "Can I get a free trial?",
    answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in,
recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
consequuntur distinctio corporis earum similique!`,
  },
  {
    question: "Do you have a monthly plan?",
    answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in,
recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
consequuntur distinctio corporis earum similique!`,
  },
];

const PopularFaqs = () => {
  return (
    <div className="mt-16 max-w-5xl mx-auto px-4 lg:px-0">
      <h1 className="text-xl lg:text-4xl inter-text font-semibold text-center common-text mb-8">
        Popular FAQS
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group [&_summary::-webkit-details-marker]:hidden border border-gray-100 rounded-md overflow-hidden"
          >
            <summary className="flex items-center justify-between gap-1.5 bg-gray-50 p-4 text-gray-900 cursor-pointer">
              <h2 className="text-lg font-medium">{faq.question}</h2>
              <div className="relative w-6 h-6">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ rotate: 0 }}
                  whileParent={{ rotate: 45 }}
                  animate={{ rotate: "0deg" }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </motion.div>
              </div>
            </summary>

            <AnimatePresence>
              <motion.p
                className="px-4 pt-4 text-gray-900"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                {faq.answer}
              </motion.p>
            </AnimatePresence>
          </details>
        ))}
      </div>
    </div>
  );
};

export default PopularFaqs;
