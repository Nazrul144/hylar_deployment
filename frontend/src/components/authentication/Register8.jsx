"use client";
import Image from "next/image";
import React, { useContext } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupContext } from "../../providers/SignupProvider";

const formSchema = z.object({
  checkbox: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms & Conditions",
  }),
});

const Register8 = () => {
  const { userProfile } = useContext(SignupContext);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: custom * 0.1 },
    }),
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkbox: false,
    },
  });

  console.log(userProfile);

  const handlePayment = async () => {
    try {
      // ✅ FIXED: Use "access" instead of "access_token"
      const token = localStorage.getItem("access");

      if (!token) {
        alert("Authentication token not found. Please log in again.");
        return;
      }

      const response = await fetch(
        "https://cestoid-uncoarsely-kayla.ngrok-free.dev/api/subscriptions/create-mandate/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userProfile }),
        }
      );

      if (!response.ok) {
        throw new Error("Payment creation failed");
      }

      const data = await response.json();

      console.log("Billing response:", data);

      if (data.authorisation_url) {
        window.location.href = data.authorisation_url;
      } else {
        alert("authorisation_url missing from server response");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while creating the payment.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      {/* Breadcrumb Navigation */}
      <motion.div
        className="max-w-[803px] mx-auto mb-6"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <nav className="flex items-center space-x-2 text-sm">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <Link
            href="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Register
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Payment
          </span>
        </nav>

        {/* Step Indicator */}
        <div className="mt-4 flex items-center justify-center space-x-1 overflow-x-auto pb-2">
          <div className="flex items-center flex-shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-[10px] sm:text-xs">
              ✓
            </div>
          </div>
          <div className="w-3 sm:w-4 h-0.5 bg-green-600 flex-shrink-0"></div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-[10px] sm:text-xs flex-shrink-0">
            ✓
          </div>
          <div className="w-3 sm:w-4 h-0.5 bg-green-600 flex-shrink-0"></div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-[10px] sm:text-xs flex-shrink-0">
            ✓
          </div>
          <div className="w-3 sm:w-4 h-0.5 bg-green-600 flex-shrink-0"></div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-[10px] sm:text-xs flex-shrink-0">
            ✓
          </div>
          <div className="w-3 sm:w-4 h-0.5 bg-green-600 flex-shrink-0"></div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-[10px] sm:text-xs flex-shrink-0">
            ✓
          </div>
          <div className="w-3 sm:w-4 h-0.5 bg-green-600 flex-shrink-0"></div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-[10px] sm:text-xs flex-shrink-0">
            ✓
          </div>
          <div className="w-3 sm:w-4 h-0.5 bg-green-600 flex-shrink-0"></div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-[10px] sm:text-xs flex-shrink-0">
            ✓
          </div>
          <div className="w-3 sm:w-4 h-0.5 bg-blue-600 flex-shrink-0"></div>
          <div className="flex items-center flex-shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-[10px] sm:text-xs">
              8
            </div>
            <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Payment
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Card */}
      <motion.div
        className="w-full max-w-[803px] mx-auto mt-6 lg:shadow-2xl bg-white dark:bg-gray-800 relative rounded-xl overflow-hidden pb-8"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <div className="w-full h-[50px]">
          <Image
            src={"/register2.png"}
            width={802}
            height={50}
            priority
            alt="header_Image"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-4 sm:px-6 md:px-8">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mt-6 sm:mt-8 md:mt-10 montserrat-text text-center mb-4 sm:mb-5 text-gray-900 dark:text-gray-100">
            Welcome to Maximum Savings!
          </h1>
          <h3 className="text-center text-sm sm:text-base md:text-lg montserrat-text mb-6 text-gray-700 dark:text-gray-300 px-2">
            Please complete the following to start saving
          </h3>

          <div className="max-w-2xl mx-auto">
            <div className="bg-[#F0F0F0] dark:bg-gray-700 rounded-lg p-4 sm:p-6">
              <h1 className="common-text font-bold text-base sm:text-lg mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">
                Make a payment
              </h1>
              <h4 className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
                Enter your delivery address and unlock two years of exclusive
                access <br className="hidden sm:block" /> for just $4.99.
              </h4>
              <hr className="border-blue-800 dark:border-blue-600 border-2 w-full" />
            </div>

            <div className="flex justify-center sm:justify-end mt-8 sm:mt-12">
              <Button
                onClick={handlePayment}
                className="w-full sm:w-auto common-bg dark:bg-blue-700 dark:hover:bg-blue-600 py-2.5 px-5 rounded-lg text-white h-12 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span className="text-base sm:text-lg font-semibold">
                  Pay Now
                </span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <hr className="border-blue-800 dark:border-blue-600 border-[3px] w-full max-w-[802px] mx-auto mt-6" />
    </div>
  );
};

export default Register8;
