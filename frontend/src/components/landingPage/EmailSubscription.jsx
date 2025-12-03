"use client";
import React, { useState } from "react";
import { useId } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import myPhoto from "../../../public/emailSubscription/email_sub.png";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { BASE_URL } from "../../config/config";

const EmailSubscription = () => {
  const id = useId();
  const [email, setEmail] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleClear = () => setEmail("");

  const handleFormSubmit = async () => {
   
    if (!email.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address before subscribing!",
        confirmButtonColor: "#7BB662",
      });
      return;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address!",
        confirmButtonColor: "#7BB662",
      });
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/notifications/subscribe-newsletter/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (response.ok && result.status_code === 201) {
        Swal.fire({
          icon: "success",
          title: "Subscription Successful!",
          text: "Thank you for subscribing to our newsletter.",
          confirmButtonColor: "#7BB662",
        });
        setEmail("");
      } else if (result.status_code === 403) {
        Swal.fire({
          icon: "info",
          title: "Already Subscribed",
          text: "You are already subscribed with this email.",
          confirmButtonColor: "#7BB662",
        });
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again later.",
        confirmButtonColor: "#7BB662",
      });
    }
  };

  return (
    <motion.div
      className="lg:max-w-7xl mx-auto px-2"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.2,
        type: "keyframes",
        duration: 1,
        stiffness: 70,
      }}
    >
      <div className="lg:relative">
        <Image src={myPhoto} alt="Email Subscription Banner" />

        <div className="lg:absolute top-1 lg:top-16 left-4 lg:left-32">
          <h3 className="pinyon-text lg:text-3xl text-[#7BB662] dark:text-[#A3D977]">
            ~ Mega Sale ~
          </h3>
          <h2 className="bills-text lg:text-5xl text-xl text-white dark:text-gray-100">
            Join Our Savings Club
          </h2>
          <p className="text-sm mt-3 text-white dark:text-gray-300">
            Be the first to know about exclusive offers, latest discounts, and
            special rewards.
            <br /> Subscribe to our newsletter and never miss a deal again!
          </p>

          <div className="lg:flex gap-2 mt-4 relative px-2">
            <Input
              id={id}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white dark:bg-gray-700 dark:text-gray-100 lg:border-none lg:p-8 lg:pr-12 border border-gray-200 dark:border-gray-600"
              placeholder="Type Your Email"
              type="email"
            />

            {email && (
              <RxCross2
                onClick={handleClear}
                className="lg:absolute lg:right-44 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-600 dark:text-gray-200 cursor-pointer"
              />
            )}

            <Button
              onClick={handleFormSubmit}
              className="bg-[#7BB662] dark:bg-[#A3D977] text-white dark:text-gray-900 text-lg mt-2 lg:mt-0 lg:p-8 hover:bg-[#00308F] dark:hover:bg-[#0051B5] transition-colors duration-300 ease-in-out cursor-pointer"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailSubscription;
