import React from "react";
import { ClipboardList, Smartphone, Wallet } from "lucide-react"; // icons
import { motion } from "framer-motion";

const Works = () => {
  return (
    <section className="mb-10 mt-10 bg-white dark:bg-gray-900 text-center w-full lg:max-w-7xl mx-auto transition-colors duration-500 lg:pt-16 lg:pb-20">
      {/* Title */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <h2 className="lg:text-4xl text-xl font-bold text-blue-600 mb-2 inter-text dark:text-white">
          How It Works
        </h2>
        <p className="px-2 lg:text-xl mb-12 montserrat-text text-gray-700 dark:text-gray-300">
          Follow three easy steps to get your card and unlock exclusive discounts.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Step 01 */}
        <motion.div
          className="relative bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 text-center hover:shadow-lg transition border border-blue-900 dark:border-blue-700 border-b-4 border-b-[#00308F]"
          initial={{ x: -150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            x: { type: "spring", stiffness: 60 },
            opacity: { duration: 1 },
            ease: "easeIn",
            duration: 1,
          }}
        >
          <div className="absolute -top-6 left-20 -translate-x-1/2 w-12 h-12 rounded-full common-bg text-white flex items-center justify-center font-bold">
            01
          </div>
          <ClipboardList className="w-10 h-10 mx-auto text-blue-600 mb-4 dark:text-white" />
          <h3 className="font-bold text-xl text-blue-600 mb-2 inter-text dark:text-white">
            Step 01: Sign Up
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm montserrat-text">
            Register online in minutes. Just provide basic information and proof of eligibility like a work ID or employment letter.
          </p>
        </motion.div>

        {/* Step 02 */}
        <motion.div
          className="relative bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 text-center hover:shadow-lg transition border border-blue-900 dark:border-blue-700 border-b-4 border-b-[#00308F]"
          initial={{ scale: 0 }}
          whileInView={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="absolute -top-6 left-20 -translate-x-1/2 w-12 h-12 rounded-full common-bg text-white flex items-center justify-center font-bold">
            02
          </div>
          <Smartphone className="w-10 h-10 mx-auto text-blue-600 mb-4 dark:text-white" />
          <h3 className="font-bold text-xl text-blue-600 mb-2 inter-text dark:text-white">
            Step 02: Get Verified
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm montserrat-text">
            Once you upload your documents, our team will verify your eligibility. This usually takes 1–3 working days.
          </p>
        </motion.div>

        {/* Step 03 */}
        <motion.div
          className="relative bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 text-center hover:shadow-lg transition border border-blue-900 dark:border-blue-700 border-b-4 border-b-[#00308F]"
          initial={{ x: 150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            x: { type: "spring", stiffness: 60 },
            opacity: { duration: 1 },
            ease: "easeIn",
            duration: 1,
          }}
        >
          <div className="absolute -top-6 left-20 -translate-x-1/2 w-12 h-12 rounded-full common-bg text-white flex items-center justify-center font-bold">
            03
          </div>
          <Wallet className="w-10 h-10 mx-auto text-blue-600 mb-4 dark:text-white" />
          <h3 className="font-bold text-xl text-blue-600 mb-2 inter-text dark:text-white">
            Step 03: Start Saving
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm montserrat-text">
            After verification, activate your card and instantly access thousands of exclusive discounts both online and in-store.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Works;
