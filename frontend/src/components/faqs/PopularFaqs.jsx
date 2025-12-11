"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useFilteredData } from "../../providers/SearchContext";

// Popular FAQs data for Maximum Savings
const faqsData = [
  {
    id: 1,
    question: "How do I start saving with Maximum Savings?",
    answer:
      "Simply sign up for a free account, browse our categories of deals, and click through our links before making purchases. You'll automatically earn cashback and access exclusive discounts from thousands of partner retailers.",
    
  },
  {
    id: 2,
    question: "When will I receive my cashback?",
    answer:
      "Cashback is typically credited to your account within 24-48 hours after your purchase is confirmed by the retailer. You can withdraw your earnings once you reach the $25 minimum threshold via PayPal, direct deposit, or gift cards.",
   
  },
  {
    id: 3,
    question: "Can I use Maximum Savings with other coupons?",
    answer:
      "Yes! Maximum Savings works alongside most manufacturer coupons and store promotions. Simply apply your coupons at checkout as usual, and you'll still earn cashback through our platform. Some exclusions may apply for certain retailers.",
  },
  {
    id: 4,
    question: "Is there a mobile app available?",
    answer:
      "Yes, Maximum Savings is available on both iOS and Android. The mobile app includes all desktop features plus location-based deals, barcode scanning for in-store offers, and push notifications for flash sales.",
    
  },
  {
    id: 5,
    question: "How do I cancel my Premium membership?",
    answer:
      "You can cancel your Premium membership anytime from your account settings. Go to Settings > Membership > Cancel Subscription. You'll retain Premium benefits until the end of your current billing period, and there are no cancellation fees.",
   
  },
  {
    id: 6,
    question: "What if a store doesn't track my purchase?",
    answer:
      "If your cashback doesn't appear within 48 hours, submit a missing cashback claim through your account dashboard. Provide your order confirmation email, and our team will investigate. Most claims are resolved within 5-7 business days.",
   
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const PopularFaqs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const filteredFaqs = useFilteredData(faqsData, [
    "question",
    "answer",
  ]);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="lg:w-7xl mx-auto px-4 lg:px-0 py-16">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="font-bold text-center text-2xl lg:text-4xl text-[#00308F] mb-4"
      >
        Popular FAQs
      </motion.h2>

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { delay: 0.2 } } }}
        className="text-gray-600 text-center mb-8 dark:text-white"
      >
        Quick answers to questions you may have
      </motion.p>

      {filteredFaqs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <p className="text-gray-500 text-lg">No FAQs found matching your search.</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-4 lg:p-6 bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-left font-semibold text-gray-800 text-sm lg:text-base">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#00308F] flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#00308F] flex-shrink-0 ml-4" />
                )}
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 lg:px-6 pb-4 lg:pb-6 bg-gray-50"
                >
                  <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                  <span className="inline-block mt-3 text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {faq.category}
                  </span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularFaqs;