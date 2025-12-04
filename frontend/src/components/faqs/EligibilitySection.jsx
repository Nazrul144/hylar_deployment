"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useFilteredData } from "../../providers/SearchContext";

// Eligibility data for Maximum Savings
const eligibilityData = [
  {
    id: 1,
    number: "01",
    title: "Who is eligible for Maximum Savings?",
    shortDescription:
      "Maximum Savings is available to all US residents who are 18 years or older. Whether you're a student, working professional, or retiree, you can access exclusive deals and discounts from thousands of partner businesses.",
    fullDescription:
      "To join Maximum Savings, you simply need a valid email address and payment method. Once registered, you'll instantly gain access to our full catalog of deals, cashback offers, and exclusive promotions. Corporate memberships are also available for businesses looking to offer savings benefits to their employees.",
  },
  {
    id: 2,
    number: "02",
    title: "How do I verify my eligibility?",
    shortDescription:
      "Verification is quick and automatic. Simply create your account with your email, and you'll receive instant access to all Maximum Savings benefits. No lengthy forms or waiting periods required.",
    fullDescription:
      "For certain premium offers from our partners, you may need to verify additional information like employment status or student enrollment. These verifications are done securely through our platform and typically take less than 24 hours. We partner with trusted verification services to ensure your data remains protected.",
  },
  {
    id: 3,
    number: "03",
    title: "What membership levels are available?",
    shortDescription:
      "Maximum Savings offers flexible membership tiers to fit your lifestyle. Our Free tier gives you access to hundreds of deals, while Premium and Business tiers unlock exclusive cashback rates and priority support.",
    fullDescription:
      "Free members enjoy basic access to deals and offers. Premium members ($9.99/month) receive enhanced cashback rates, early access to sales, and ad-free browsing. Business tier ($49.99/month for up to 50 employees) includes team management tools, custom reporting, and dedicated account support.",
  },
  {
    id: 4,
    number: "04",
    title: "Can I share my membership with family?",
    shortDescription:
      "Yes! Premium memberships include family sharing for up to 4 additional household members. Each family member gets their own login and can track their individual savings.",
    fullDescription:
      "Family members must be in the same household and 18 years or older. Each person maintains their own profile, wishlist, and savings tracker. Primary account holders can view combined household savings and manage family member access through the account dashboard. Business memberships work similarly but for team members within an organization.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const EligibilitySection = () => {
  const filteredCards = useFilteredData(eligibilityData, [
    "title",
    "shortDescription",
    "fullDescription",
  ]);

  const [expanded, setExpanded] = useState(
    Array(eligibilityData.length).fill(false)
  );

  const toggleExpand = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <div className="mt-20 px-4 lg:px-0 text-justify">
      <section className="lg:w-7xl mx-auto">
        {filteredCards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500 text-lg">
              No eligibility information found matching your search.
            </p>
          </motion.div>
        ) : (
          filteredCards.map((card, index) => {
            // Find original index for expanded state
            const originalIndex = eligibilityData.findIndex(
              (item) => item.id === card.id
            );

            return (
              <motion.div
                key={card.id}
                className={`flex items-center gap-6 mt-16 ${
                  index % 2 === 1 ? "lg:ml-96" : ""
                }`}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
              >
                {/* Number Box */}
                <div className="lg:w-36 lg:h-36 bg-blue-900 flex items-center justify-center">
                  <span className="text-green-500 text-6xl p-3 lg:text-8xl font-extrabold">
                    {card.number}
                  </span>
                </div>

                {/* Content */}
                <div className="max-w-xl">
                  <h2 className="text-xl lg:text-3xl font-bold">
                    {card.title}
                  </h2>
                  <motion.p
                    layout
                    className="text-sm text-gray-600 mt-2 dark:text-white"
                  >
                    {card.shortDescription}
                    <AnimatePresence>
                      {expanded[originalIndex] && (
                        <motion.span
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {" "}
                          {card.fullDescription}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.p>

                  <Button
                    onClick={() => toggleExpand(originalIndex)}
                    className="mt-4 px-4 py-2 bg-green-500 text-white font-medium rounded cursor-pointer 
                    transition-all duration-300 ease-in-out transform hover:bg-green-600 hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    {expanded[originalIndex] ? "Read Less" : "Read More"}
                  </Button>
                </div>
              </motion.div>
            );
          })
        )}
      </section>
    </div>
  );
};

export default EligibilitySection;