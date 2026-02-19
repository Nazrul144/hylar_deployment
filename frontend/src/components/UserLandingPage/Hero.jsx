"use client"
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {

  return (
    <div>
      <div className="relative w-full h-[550px] pt-8 flex flex-col items-center justify-center">
        <video
          src={"/HomePageVideo.mp4"}
          autoPlay
          muted
          loop
          controls={false}
          className="absolute w-full h-full  
                object-cover"
        />
        <div className="absolute w-full h-full z-10 bg-gray-800/40" />{" "}
        {/*Overlay*/}
        <div className="absolute flex flex-col items-center justify-center gap-4 z-30">
          <h1
            className={`text-[#FFFFFF] text-center font-extrabold text-5xl inter-text`}
          >
            Welcome To Exclusive Discounts
          </h1>
          <h1
            className={`text-[#FFFFFF] text-center font-extrabold text-5xl inter-text`}
          >
            & Savings
          </h1>
          <p
            className={`text-[#FFFFFF] text-center font-medium text-xl inter-text`}
          >
            Get access to curated deals across various categories
          </p>
         
        </div>
      </div>

    </div>
  );
};

export default Hero;
