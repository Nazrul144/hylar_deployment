"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

const UpdatePassword = () => {
 

  return (
    <div>
      <div className="lg:flex md:flex mt-12 justify-center mx-auto gap-6 bg-white w-[820px] p-2 shadow-2xl">
        {/* Image div */}
        <div className="relative h-[600px] w-96">
          <Image
            src="/forgetPassword/1.png"
            alt="forgotPassword"
            fill
            className=" object-cover"
            priority
          />

          <div className="absolute inset-0 grid place-items-center ml-14">
            <h1 className="z-10 text-3xl font-bold text-white drop-shadow-lg">
              Set a New <br /> Password
              <hr className="border-t-1 border-[#7BB662] w-66 mt-2" />
              <span className="text-sm text-gray-400">
                Create a strong password to secure your <br /> MaximumSavings
                account.
              </span>
            </h1>
            <h3 className="absolute bottom-10 text-white mr-8">
              Log in to your MaximumSavings account.
            </h3>
          </div>
          <div className="absolute inset-0 rounded-lg bg-black/30" />
        </div>

        {/* Login form */}
        <div className="h-[600px] w-96">
          <div className="w-full max-w-md p-8 space-y-3 text-gray-100 h-full">
            <h1 className="montserrat-text  common-text text-xl font-bold ">
              Account
            </h1>
            <h1 className="text-black font-bold text-3xl">
              Password Updated
            </h1>
            <p className="text-gray-600 text-justify text-sm mb-6">
              For your security, we’ll sign you out of other devices. Use <br /> your new password on your next login.
            </p>

           
            <div className="flex justify-between mt-6 text-black">
              <div className="common-text font-bold underline text-sm">
                <Link href={"/login"}>Back to Login</Link>
              </div>
              <div className="common-text font-bold text-sm">
                <Link href={"/"}>Need help? Contact support</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
