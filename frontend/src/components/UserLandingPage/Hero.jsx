import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

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
          <Button
            className={`
    ring-2 ring-white 
    rounded-lg px-4 py-2 mt-4 inter-text cursor-pointer
    bg-transparent text-white
    hover:bg-blue-500 hover:text-white
    transition-colors duration-300 ease-in-out
  `}
          >
            Discover savings
          </Button>
        </div>
      </div>

      <div className="pt-12 flex flex-col lg:flex-row items-center justify-center gap-8">
        <Image src="/1.jpg" alt="1" width={300} height={100} />
        <Image src="/2.jpg" alt="2" width={300} height={100} />
        <Image src="/3.jpg" alt="3" width={300} height={100} />
      </div>
    </div>
  );
};

export default Hero;
