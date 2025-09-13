"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";


const Register8 = () => {


  return (
    <div>
      <div className="lg:w-[803px] lg:h-[761px] mx-auto mt-14 lg:shadow-2xl relative">
        <div className="lg:w-[820px] h-[50px]">
          <Image
            src={"/register2.png"}
            width={802}
            height={50}
            priority
            alt="header_Image"
            className="object-cover"
          />
        </div>

        <h1 className="font-bold text-4xl mt-10 montserrat-text text-center mb-5">
          Welcome to Maximum Savings!
        </h1>
        <h3 className="text-center text-lg montserrat-text mb-6">
          Please complete the following to start saving
        </h3>

        {/* Form */}
        <div className="lg:w-2xl mx-auto p-4">

            <div className="bg-[#F0F0F0] rounded-lg">
                <h1 className="common-text font-bold text-lg p-6">Make a payment</h1>
                <h4 className="ml-6 pb-8">Enter your delivery address and unlock two years of exclusive access <br /> for just $5.99.</h4>
                <hr className="border-blue-800 border-[3px] lg:w-[640px] mx-auto" />
            </div>

          {/* Back and Next Button */}
          <div className="flex justify-between items-center mt-12">
            <div>
              
            </div>
            <div>
              <Link
                href={"/register9"}
                className="common-bg py-2.5 px-5 rounded-lg text-white w-28 h-12 flex items-center justify-center gap-1"
              >
                <span className="text-lg font-semibold">Start</span>
                <MdKeyboardDoubleArrowRight className="text-2xl mt-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register8;
