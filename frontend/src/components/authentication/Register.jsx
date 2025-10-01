"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { motion } from "framer-motion";

const Register = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: custom * 0.1 },
    }),
  };

  return (
    <div>
      <div className="lg:flex md:flex mt-12 justify-center mx-auto gap-6 bg-white w-[820px] p-2 shadow-2xl">
        {/*Image div*/}
        <motion.div
          className="relative h-[600px] w-96"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          <Image
            src="/login.JPG"
            alt="Register_Image"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute mt-48 grid place-items-center">
            <h1 className="z-10 text-3xl font-bold text-white drop-shadow-lg">
              Create your account
            </h1>
            <h3 className="text-white mt-4 text-center">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </h3>
          </div>
          <h4 className="text-white absolute bottom-4 text-sm left-12">
            Log in to your <span className="font-bold">MaximumSavings</span>{" "}
            account.
          </h4>

          <div className="absolute inset-0 rounded-lg bg-black/30" />
        </motion.div>

        {/*Register form div*/}
        <motion.div
          className="h-[600px] w-96"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
        >
          <div className="w-full max-w-md p-8 space-y-3 text-gray-100 h-full">
            <h1 className="montserrat-text text-center common-text text-5xl font-bold mb-10">
              Register
            </h1>

            <form noValidate="" action="" className="space-y-6">
              {/* First & Last Name */}
              <div className="flex gap-2 w-80">
                {["First Name", "Last Name"].map((label, i) => (
                  <motion.div
                    key={label}
                    className="relative w-39"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i + 2}
                  >
                    <label
                      className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
                    >
                      {label}
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Personal Email */}
              <motion.div
                className="relative w-80"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4}
              >
                <label className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600">
                  Personal Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </motion.div>

              {/* DOB */}
              <motion.div
                className="relative w-80 mt-6"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={5}
              >
                <label className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600">
                  DATE OF BIRTH
                </label>
                <input
                  type="date"
                  className="w-full rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </motion.div>

              {/* Mobile Number */}
              <motion.div
                className="relative w-80 mt-6"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={6}
              >
                <label className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600">
                  MOBILE NUMBER
                </label>
                <input
                  type="text"
                  placeholder="+44"
                  className="w-full rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </motion.div>

              {/* Continue Button */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={"/register2"}
                  className="block w-full text-center rounded-sm text-white bg-[#00308F] text-xl py-3 cursor-pointer"
                >
                  Continue
                </Link>
              </motion.div>
            </form>

            <motion.p
              className="text-xs text-center sm:px-6 text-gray-800"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={7}
            >
              Already have an account?
              <Link
                href={"/login"}
                className="underline font-bold common-text montserrat-text"
              >
                {" "}
                Log in
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
