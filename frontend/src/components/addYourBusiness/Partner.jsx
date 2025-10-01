"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Partner = () => {
  return (
    <div>
      <div className="lg:w-7xl mx-auto mt-16 px-2">
        <motion.h1
          className="text-center font-bold text-xl lg:text-5xl common-text montserrat-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeUp}
        >
          Why Partner With Us
        </motion.h1>

        <motion.h3
          className="text-center mt-6 px-2 lg:text-lg poppins-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } }}
          viewport={{ once: false, amount: 0.3 }}
        >
          A trusted platform built for high-impact results. <br /> With over a million
          verified members and thousands of trusted partners, we help your business <br /> 
          stand out. Whether you're a local shop or a national brand, your offers gain
          powerful exposure <br /> across our app, website, and marketing channels —
          without the stress of setup fees or long <br /> commitments. You bring the
          offer, we bring the audience.
        </motion.h3>

        <motion.div
          className="flex justify-center items-center mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.6 } }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Link
            href={"/submit_form"}
            className="common-bg text-white text-lg py-2 px-4 rounded-sm montserrat-text font-semibold hover:scale-105 transition-all duration-300"
          >
            Click Here To Submit Your Offer
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          {cardData?.map((card, index) => (
            <motion.div
              key={card.title}
              className="lg:w-[633px] h-[233px] rounded-lg border border-b-4 border-b-[#00308F] shadow-xl flex flex-col justify-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2 * index, duration: 0.6 } }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <h3 className="text-center common-text font-bold text-4xl inter-text">
                {card.title}
              </h3>
              <h3 className="text-center lg:px-25 mt-2">{card.description}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partner;

const cardData = [
  {
    title: "1M+ Members",
    description: "Access a large verified audience ready to support your offers and promotions.",
  },
  {
    title: "No Setup Costs",
    description: "Start your partnership with zero upfront investment and dedicated support.",
  },
  {
    title: "High Engagement",
    description: "Your offers will appear across our web platform, app, and email campaigns.",
  },
  {
    title: "15K+ Brands",
    description: "Join a network of trusted brands offering exclusive benefits to key workers.",
  },
];
