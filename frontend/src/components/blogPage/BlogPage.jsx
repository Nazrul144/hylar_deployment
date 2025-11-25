"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

// Animation variant for fade + slide up
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const BlogPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="relative w-full flex flex-col items-center text-center px-4 py-10 sm:py-16 lg:py-20 max-w-6xl mx-auto"
      >
        {/* Text Section */}
        <motion.h1
          variants={fadeUp}
          className="font-extrabold text-[#00308F] leading-tight text-3xl sm:text-4xl lg:text-5xl mb-4 max-w-4xl"
        >
          Connect with a dedicated audience of NHS staff, emergency and key
          frontline personnel.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed"
        >
          Connect with NHS staff, emergency service workers, and key frontline
          personnel. Offer exclusive discounts to boost visibility, build
          loyalty, and join thousands of businesses benefiting from our trusted
          network.
        </motion.p>

        {/* Image Section */}
        <motion.div
          variants={fadeUp}
          className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200"
        >
          <div className="relative">
            <Image
              src="/public_banner.jpg"
              width={1400}
              height={600}
              alt="hero_image"
              className="w-full h-auto object-cover"
            />

           
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeUp}
              className="mb-4"
            >
              <Image
                src={"/blogPage/gate.png"}
                width={600}
                height={400}
                alt={`Image ${i}`}
                className="w-full h-auto rounded-md"
              />
              <h2 className="text-xl sm:text-3xl font-semibold mt-2">
                Behind the Scenes: Our Design Process
              </h2>
              <p className="text-[20px] mt-1">
                Get an exclusive look at how our design team brings ideas to
                life, creating each piece with precision and passion.
              </p>
            </motion.div>
          ))}
        </div>

        {/* Right Column */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeUp}
          >
            <h3 className="text-3xl font-bold text-[#00308F] mb-2">
              Introduction
            </h3>
            <p className="text-[20px] mb-2">
              Connect with a dedicated audience of NHS staff, emergency service
              workers, and key frontline personnel. By offering exclusive
              discounts, you'll not only boost brand visibility but also build
              meaningful loyalty with real customers who appreciate your
              support. Join thousands of businesses already benefiting from our
              trusted network.
            </p>
            <p className="text-[20px] mb-4">
              Connect with a dedicated audience of NHS staff, emergency service
              workers, and key frontline personnel. By offering exclusive
              discounts, you'll not only boost brand visibility.
            </p>
            <Image
              src={"/blogPage/baby.png"}
              width={600}
              height={400}
              alt="baby"
              className="w-full h-auto rounded-md mb-4"
            />
            <h3 className="text-3xl font-bold text-[#00308F] mb-2">
              Choosing the best business structure
            </h3>
            <p className="text-[20px] mb-4">
              Connect with a dedicated audience of NHS staff, emergency service
              workers, and key frontline personnel. By offering exclusive
              discounts, you'll not only boost brand visibility but also build
              meaningful loyalty with real customers who appreciate your
              support.
            </p>
            <div className="flex gap-4 mt-16 mb-16">
              <div className="w-1  rounded-full"></div>
              <p className="text-[20px] relative before:absolute before:left-0 before:top-0 before:w-1 before:bg-[#00308F] before:h-full pl-16 text-justify font-[cursive]">
                "Connect with a dedicated audience of NHS staff, emergency
                service workers, and key frontline personnel. By offering
                exclusive discounts, you'll not only boost brand visibility but
                also build meaningful loyalty with real customers who appreciate
                your support. Join thousands of businesses already benefiting
                from our trusted network".
              </p>
            </div>
            <h3 className="text-3xl font-bold text-[#00308F] mb-2">
              How to work well together
            </h3>
            <p className="text-[20px] mb-2">
              Connect with a dedicated audience of NHS staff, emergency service
              workers, and key frontline personnel. By offering exclusive
              discounts, you'll not only boost brand visibility.
            </p>
            <Image
              src={"/blogPage/women.png"}
              width={600}
              height={400}
              alt="women"
              className="w-full h-auto rounded-md mb-2"
            />
            <p className="text-[20px] mb-4">
              Connect with a dedicated audience of NHS staff, emergency service
              workers, and key frontline personnel. By offering exclusive
              discounts, you'll not only boost brand visibility.
            </p>
            <p className="text-[20px]">
              Connect with a dedicated audience of NHS staff, emergency service
              workers.
            </p>
            <h3 className="text-3xl font-bold text-[#00308F] mb-2">
              Conclusion
            </h3>
            <p className="text-[20px] mb-2">
              Connect with a dedicated audience of NHS staff, emergency service
              workers, and key frontline personnel. By offering exclusive
              discounts, you'll not only boost brand visibility but also build
              meaningful loyalty with real customers who appreciate your
              support. Join thousands of businesses already benefiting from our
              trusted network.
            </p>
            <p className="text-[20px] mt-2">
              Connect with a dedicated audience of NHS staff, emergency service
              workers, and key frontline personnel. By offering exclusive
              discounts, you'll not only boost brand visibility.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Submit Button */}
      <motion.div
        className="flex justify-center mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <Link
          href={"/submit_form"}
          className="common-bg text-white text-lg py-2 px-4 rounded-sm montserrat-text font-semibold hover:scale-105 transition-all duration-300"
        >
          Click Here To Submit Your Offer
        </Link>
      </motion.div>
    </div>
  );
};

export default BlogPage;
