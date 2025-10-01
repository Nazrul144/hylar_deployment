import React from "react";
import { Button } from "../ui/button";
import { BsRocketTakeoffFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="max-w-7xl w-full mx-auto mt-16">
      <motion.h1
        className="text-xl px-2 lg:text-5xl text-center font-extrabold mt-4 inter-text"
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.2,
          type: "spring",
          stiffness: 60,
          duration: 1,
        }}
      >
        Unlock Over <span className="common-text">15,000 Discounts</span> for
        Public Sector <br />
        Workers.
      </motion.h1>
      <motion.p
        className="text-center mt-4 text-sm poppins-text px-2"
        initial={{ opacity: 0 }} // initially hidden
        whileInView={{ opacity: 1 }} // fade in
        transition={{ delay: 0.4, duration: 1, ease: "easeInOut" }}
      >
        Access exclusive deals from top brands in retail, travel, and
        entertainment
      </motion.p>

      <div className="flex justify-center items-center mt-4">
        <Link href="/register">
          <motion.div
            initial={{ scale: 0 }} // start smaller
            whileInView={{ scale: [0, 1.2, 1] }} // zoom in to 1.2, then back to 1
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Button className="cursor-pointer hover:bg-common-bg hover:scale-105 transition-all duration-300 common-bg px-4 text-lg font-semibold">
              Get Started <BsRocketTakeoffFill />
            </Button>
          </motion.div>
        </Link>
      </div>
      <div className="flex justify-center items-center mt-6 bg-white">
        <div className="grid grid-cols-5 gap-3 px-2">
          {/* Left tall ship */}
          <motion.div
            className="row-span-1"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 60,
              duration: 1,
            }}
          >
            <Image
              src="/header/7.jpg"
              alt="ship-left"
              width={1000}
              height={300}
              className="w-60 h-80 object-cover"
            />
          </motion.div>

          {/* Protest */}
          <motion.div
            className="row-span-1 mt-12"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src="/header/3.jpg"
              alt="protest"
              width={1000}
              height={500}
              className="w-96 h-66 object-cover"
            />
          </motion.div>

          {/* Flag (center large) */}
          <motion.div
            className="row-span-2 col-span-1 mt-24"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.5, ease: "easeInOut" }}
          >
            <Image
              src="/header/5.jpg"
              alt="flag"
              width={500}
              height={400}
              className="w-60 h-80 object-cover"
            />
          </motion.div>

          {/* Right tall ship */}
          <motion.div
            className="row-span-2"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.8,
              type: "spring",
              stiffness: 50,
              duration: 1,
            }}
          >
            <Image
              src="/header/7.jpg"
              alt="ship-right"
              width={400}
              height={300}
              className="w-60 h-70 object-cover"
            />
          </motion.div>

          {/* Blue building */}
          <motion.div
            className="row-span-1"
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <Image
              src="/header/4.jpg"
              alt="blue-building"
              width={400}
              height={600}
              className="w-60 h-86 object-cover"
            />
          </motion.div>

          {/* Building with flags */}
          <motion.div
            className="row-span-1 ml-18 hidden md:block"
            initial={{ rotate: -10, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <Image
              src="/header/2.jpg"
              alt="building-flags"
              width={200}
              height={150}
              className="w-40 h-66 object-cover"
            />
          </motion.div>

          {/* Blue interior */}
          <motion.div
            className="row-span-1 hidden md:block"
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.2, ease: "easeInOut" }}
          >
            <Image
              src="/header/6.jpg"
              alt="blue-interior"
              width={200}
              height={150}
              className="w-66 h-50 object-cover"
            />
          </motion.div>

          <div className="flex gap-3 w-96 absolute right-108 top-172">
            {/* Buckingham Palace */}
            <motion.div
              className="w-36 hidden md:block"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
            >
              <Image
                src="/header/1.jpg"
                alt="palace"
                width={200}
                height={150}
                className="w-full h-50 object-cover"
              />
            </motion.div>

            {/* Woman in car */}
            <motion.div
              className="w-56 hidden md:block"
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
            >
              <Image
                src="/header/9.jpg"
                alt="woman-car"
                width={200}
                height={150}
                className="w-full h-46 object-cover mt-14"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
