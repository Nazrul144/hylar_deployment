import Image from "next/image";
import React from "react";


const FashionHero = () => {
  return (
    <div>
      <div className="relative w-full h-[550px] pt-6 flex flex-col items-center justify-center">
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
    </div>
  );
};

export default FashionHero;
