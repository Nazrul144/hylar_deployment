"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const WhatYouGet = () => {
  return (
    <div className="lg:w-7xl mx-auto mt-16 px-2">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeInUp}
      >
        <h1 className=" text-xl lg:text-4xl text-center common-text font-bold mb-6">
          What You Get
        </h1>
        <h3 className="text-center lg:text-lg">
          Get featured in our mobile app, track performance with real-time insights, and enjoy dedicated <br /> 
          support. We connect your offers directly to verified frontline workers — helping you boost <br /> 
          visibility, build loyalty, and drive more customers through your doors.
        </h3>
      </motion.div>

      {/*Stylish Card Timeline*/}
      <div className="flex justify-center items-center mt-24 bg-white dark:bg-black ">
        <div className="relative flex flex-col items-center w-full max-w-5xl">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-0 w-6 bg-blue-900 rounded-full"></div>

          {/* Timeline Cards */}
          {[
            {
              title: "Targeted Exposure",
              description: "Your brand is shown only to verified, high-intent audiences.",
              side: "left",
              mt: "mt-14 mb-12",
            },
            {
              title: "Mobile App Access",
              description: "Get listed in our iOS and Android apps with thousands of daily users.",
              side: "right",
              mt: "mb-24",
            },
            {
              title: "Analytics Dashboard",
              description: "View clicks, redemptions, and user interaction metrics in real time.",
              side: "left",
              mt: "mb-24",
            },
            {
              title: "Partner Support",
              description: "Our team helps you optimize your offer and maximize impact",
              side: "right",
              mt: "mb-24",
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              className={`relative flex w-full ${card.mt}`}
              initial={{ opacity: 0, x: card.side === "left" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: index * 0.2 } }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {card.side === "left" ? (
                <>
                  <div className="lg:w-1/2 flex justify-end pr-6">
                    <div className="bg-white border border-blue-900 rounded-lg shadow-md w-80 h-32">
                      <h3 className="text-blue-900 font-bold lg:text-2xl inter-text text-center mt-6">{card.title}</h3>
                      <p className="text-gray-600 text-sm mt-2 text-center px-2">{card.description}</p>
                    </div>
                  </div>

                  {/* Connector (Desktop only) */}
                  <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-16 md:flex md:items-center md:mt-12">
                    <div className="bg-blue-900 w-6 h-6 rounded-full z-10"></div>
                    <div className="h-3 w-8 rounded-b bg-blue-900"></div>
                  </div>

                  <div className="lg:w-1/2 ml-20"></div>
                </>
              ) : (
                <>
                  <div className="lg:w-1/2"></div>

                  {/* Connector (Desktop only) */}
                  <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:mt-12">
                    <div className="h-3 ml-20 w-8 bg-blue-900"></div>
                    <div className="bg-blue-900 w-6 h-6 rounded-full z-10"></div>
                  </div>

                  <div className="lg:w-1/2 flex justify-center lg:pr-14">
                    <div className="bg-white border border-blue-900 rounded-lg shadow-md w-80 h-32">
                      <h3 className="text-blue-900 font-bold lg:text-2xl inter-text text-center mt-6">{card.title}</h3>
                      <p className="text-gray-600 text-sm mt-2 text-center px-2">{card.description}</p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatYouGet;
