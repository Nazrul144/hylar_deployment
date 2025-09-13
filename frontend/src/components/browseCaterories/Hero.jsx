import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div>
      <div className="relative w-full h-[550px] pt-8 flex flex-col items-center justify-center">
        <video
          src={"/video/fasion_cover_video.mp4"}
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
            className={`text-[#FFFFFF] text-center font-extrabold text-8xl montserrat-text`}
          >
            FASHION
          </h1>
        </div>
      </div>

      {/*Heading Text*/}
      <div className="mt-20">
        <h1 className="common-text font-bold text-5xl text-center mb-2 inter-text">
          Manswear
        </h1>
        <h3 className="text-center mb-6">
          Must see offers from some of Blue Light Card members' best-loved <br />
          Fashion & Clothing partners.
        </h3>
        {/*Card*/}
      </div>
    </div>
  );
};

export default Hero;
