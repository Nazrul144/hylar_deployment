"use client";
import React, { useState, useId } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { BiSend } from "react-icons/bi";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const id = useId();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="mt-24 common-bg">
      <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 px-6 md:px-12 lg:px-44 py-16 text-[#FAFAFA] max-w-7xl mx-auto">
        {/* Column-1: Subscription */}
       
        {/* Column-2 - Support */}
        <motion.div
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold mb-6">Support</h2>
          <h3 className="text-sm leading-relaxed text-[#FAFAFA]">
            111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.
          </h3>
          <p className="text-sm text-[#FAFAFA]">exclusive@gmail.com</p>
          <p className="text-sm">+88015-88888-9999</p>
        </motion.div>

        {/* Column-3 - Account */}
        <motion.div
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold mb-6">Account</h2>
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-bold">My Account</h3>
            <Link href={"/login"} className="text-sm hover:text-gray-300 transition-colors">
              Login 
            </Link>
            <Link href={"/register"} className="text-sm hover:text-gray-300 transition-colors">
              Register
            </Link>
          </div>
        </motion.div>

        {/* Column-4 - Quick Link */}
        <motion.div
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold mb-6">Quick Link</h2>
          <div className="flex flex-col space-y-3">
            <Link href={"/privacy"} className="text-sm hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href={"/term_condition"} className="text-sm hover:text-gray-300 transition-colors">
              Terms Of Use
            </Link>
            <Link href={"/faqs"} className="text-sm hover:text-gray-300 transition-colors">
              FAQ
            </Link>
            <Link href={"/contact"} className="text-sm hover:text-gray-300 transition-colors">
              Contact
            </Link>
          </div>
        </motion.div>
      </div>

      <hr className="border-gray-600 opacity-30" />
      <h3 className="text-[#B5B5B5] text-center text-sm py-8">
        copyright @ maximumSavings
      </h3>
    </div>
  );
};

export default Footer;