"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Header = () => {
  return (
    <div className="relative">
      {/* Image container */}
      <motion.div
        className="w-full lg:w-[1500px] mx-auto relative h-[500px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
      >
        <Image
          src="/cover.png"
          alt="cover"
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </motion.div>

      {/* Overlapping div */}
      <motion.div
        className="lg:w-[880px] h-[326px] bg-blue-900/80 mx-auto relative -mt-[163px] rounded-t-lg flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.h1
          className="text-white font-bold text-4xl text-center pt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Reach Verified Frontline Workers
        </motion.h1>
        <motion.p
          className="text-lg text-center text-[#D9D9D9] mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.6 } }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Promote your business to thousands of NHS, emergency services, and key
          workers <br />
          with exclusive offers. Boost visibility and gain loyal customers today.
        </motion.p>
        <motion.div
          className="flex justify-center items-center mt-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1, transition: { delay: 0.6, duration: 0.6 } }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Button className="bg-[#7BB662] cursor-pointer text-lg text-white px-6 py-3 rounded transition-all duration-300 ease-in-out hover:bg-[#5FA145] hover:scale-105 hover:shadow-lg">
            Add Your Business
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Header;
