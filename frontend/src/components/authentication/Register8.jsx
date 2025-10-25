"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import { SignupContext } from "@/providers/SignupProvider";
import { Button } from "../ui/button";

const Register8 = () => {
  const router = useRouter();
  const { signupData } = useContext(SignupContext);

  const handleNext = () => {
    console.log(signupData); // existing signup data console
    router.push("/register/register2/register3/register4/register5/register6/register7/register8/register9"); // next page
  };

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

        <div className="lg:w-2xl mx-auto p-4">
          <div className="bg-[#F0F0F0] rounded-lg">
            <h1 className="common-text font-bold text-lg p-6">
              Make a payment
            </h1>
            <h4 className="ml-6 pb-8">
              Enter your delivery address and unlock two years of exclusive
              access <br /> for just $5.99.
            </h4>
            <hr className="border-blue-800 border-[3px] lg:w-[640px] mx-auto" />
          </div>

          <div className="flex justify-end mt-12">
            <Button
              onClick={handleNext}
              className="common-bg py-2.5 px-5 rounded-lg text-white w-28 h-12 flex items-center justify-center gap-1"
            >
              <span className="text-lg font-semibold">Start</span>
              <MdKeyboardDoubleArrowRight className="text-2xl mt-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register8;
