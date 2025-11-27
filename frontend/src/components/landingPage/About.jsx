'use client'
import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { IoMdStar } from "react-icons/io";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.section
      className="py-16 bg-white dark:bg-gray-900 max-w-7xl mx-auto"
       initial={{y:200, opacity:0}}
       whileInView={{y:0, opacity:1}}
        transition={{
          delay: 0.3,
          type: "keyframes",
          stiffness: 60,
          duration: 2,
        }}
    >
      {/* Section Title */}
      <div className="text-center mb-12">
        <h3 className="lg:text-4xl text-xl font-bold common-text inline-block pb-1 dark:text-gray-100">
          About Us
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2 px-2 lg:text-xl montserrat-text">
          Follow three easy steps to get your card and unlock exclusive
          discounts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-6">
        {/* Left Image with overlay stats */}
        <div className="relative ">
          <Image
            src="/header/about.jpg"
            alt="About Us"
            width={560}
            height={400}
            className="rounded-lg object-cover h-[560px] w-full"
          />

          {/* Stats Overlay */}
          <div className="lg:absolute bottom-6 lg:mt-0 mt-12 lg:left-150 lg:-translate-x-1/2 bg-white dark:bg-gray-800 shadow-md rounded-lg flex gap-8 px-8 py-8 lg:w-[90%] lg:md:w-[80%] justify-around border-2 border-blue-900">
            <div className="text-center">
              <h4 className="common-text font-bold lg:text-4xl inter-text dark:text-gray-100">
                250+
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Verified Discounts</p>
              <div className="w-[2px] h-24 common-bg top-3 left-42 absolute"></div>
            </div>
            <div className="text-center">
              <h4 className="common-text font-bold lg:text-4xl inter-text dark:text-gray-100">
                100K+
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Happy Members</p>
              <div className="w-[2px] h-24 common-bg top-3 left-80 absolute"></div>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center">
                <h4 className="common-text font-bold lg:text-4xl inter-text dark:text-gray-100">
                  4.8{" "}
                </h4>
                <IoMdStar className="mt-4 common-text font-bold dark:text-yellow-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Average Rating</p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div>
          <h2 className="lg:text-3xl md:text-4xl font-bold text-xl text-center common-text inter-text mb-4 mt-6 dark:text-gray-100">
            Helping Frontline Workers <br /> Save More
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 montserrat-text lg:text-xl text-justify mt-8 ">
            We empower essential workers by providing access to exclusive
            discounts across thousands of top UK brands. Whether you&apos;re part of
            the NHS, emergency services, or armed forces, we make life more
            affordable for those who serve.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600 w-5 h-5" />
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                Maximum Savings Verified Access
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600 w-5 h-5" />
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                Partnered with 15,000+ Brands
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600 w-5 h-5" />
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                Instant Discount Codes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600 w-5 h-5" />
              <span className="text-gray-700 dark:text-gray-300 text-sm">Free App & Easy Use</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
