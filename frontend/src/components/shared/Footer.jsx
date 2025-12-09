"use client";
import React, { useState, useId } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { BiSend } from "react-icons/bi";
import Link from "next/link";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { BASE_URL } from "../../config/config";

const Footer = () => {
  const [email, setEmail] = useState("");
  const id = useId();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async () => {
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

  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="mt-24 common-bg">
      <div className="grid lg:grid-cols-5 ml-12 lg:ml-0 lg:px-44 text-[#FAFAFA]">
        {/* Column-1: Subscription */}
        <motion.div
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10"
        >
          <h2 className="text-xl font-bold mb-4">Exclusive</h2>
          <h3 className="text-lg font-bold mb-2">Subscribe</h3>
          <p className="text-sm mb-4">Get 10% off your first order</p>
          <div className="relative w-44 h-6">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id={id}
              className="pe-9"
              placeholder="Enter your email"
              type="email"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="cursor-pointer text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-sm transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Subscribe"
            >
              <BiSend className="mt-3 text-white" size={24} aria-hidden="true" />
            </motion.button>
          </div>
        </motion.div>

        {/* Column-2 */}
        <motion.div
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10"
        >
          <h2 className="text-xl font-bold mb-4">Support</h2>
          <h3 className="text-sm font-bold mb-2 text-[#FAFAFA]">
            111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.
          </h3>
          <p className="text-sm mb-2 text-[#FAFAFA]">exclusive@gmail.com</p>
          <p className="text-sm mb-2">+88015-88888-9999</p>
        </motion.div>

        {/* Column-3 */}
        <motion.div
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10"
        >
          <h2 className="text-xl font-bold mb-4">Account</h2>
          <h3 className="text-sm font-bold mb-2">My Account</h3>
          <Link href={"/login"} className="text-sm mb-2 block">
            Login 
          </Link>
          <Link href={"/register"} className="text-sm mb-2 block">
            Register
          </Link>
        </motion.div>

        {/* Column-4 */}
        <motion.div
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10"
        >
          <h2 className="text-xl font-bold mb-4">Quick Link</h2>
          <Link href={"/privacy"} className="text-sm font-bold mb-2">Privacy Policy</Link>
          <Link href={"/term_condition"} className="text-sm mb-2">Terms Of Use</Link>
          <Link href={"/faqs"} className="text-sm mb-2 block">
            FAQ
          </Link>
          <Link href={"/contact"} className="text-sm block">
            Contact
          </Link>
        </motion.div>

        {/* Column-5 */}
        <motion.div
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10"
        >
          <h2 className="text-xl font-bold mb-4">Download App</h2>
          <h3 className="text-sm font-bold mb-2">Save $3 with App New User Only</h3>
          <div className="w-32 lg:w-96">
            <Image src={"/footer/qr_code.png"} width={200} height={200} alt="QRCode" />
          </div>
        </motion.div>
      </div>

      <hr className="border-gray-300 mt-16" />
      <h3 className="text-[#B5B5B5] text-center text-sm py-8">
        copyright @ maximumSavings
      </h3>
    </div>
  );
};

export default Footer;
