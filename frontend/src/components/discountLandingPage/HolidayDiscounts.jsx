import { Oleo_Script } from "next/font/google";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import FAQ from "../addYourBusiness/FAQ";
import SunAndBeach from "../UserLandingPage/UserLandingPageCard/TravelComponentes/SunAndBeach";
import UkStays from "../UserLandingPage/UserLandingPageCard/TravelComponentes/UkStays";
import HotelAndTravel from "../UserLandingPage/UserLandingPageCard/TravelComponentes/HotelsAndTravel";
import SkiBreaks from "../UserLandingPage/UserLandingPageCard/TravelComponentes/SkiBreaks";

const oleo = Oleo_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const HolidayDiscounts = () => {
  return (
    <div className="lg:w-7xl mx-auto mt-10 lg:mt-20 px-2">
      <h1
        className={`${oleo.className} font-bold text-xl lg:text-5xl text-[#00308F] text-center mb-4`}
      >
        Holiday Discounts
      </h1>
      <p className="text-center lg:text-lg mb-12">
        A trusted platform built for high-impact results. <br /> With over a
        million verified members and thousands of trusted partners, we help your
        business stand out. Whether you're a local shop or a national brand,
        your offers gain powerful exposure across our app, website, and
        marketing channels — without the stress of setup fees or long
        commitments. You bring the offer, we bring the audience
      </p>
      <div className="lg:flex justify-center ml-28 lg:ml-0">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="bg-[#00308F] px-6 py-5 font-semibold text-lg rounded
               hover:bg-[#002766] hover:text-gray-300 transition-colors"
        >
          <Link href="/register" className="text-white">
            Sign Up
          </Link>
        </Button>
      </div>

      <div className="relative w-full h-[550px] pt-6 flex flex-col items-center justify-center mt-6 mb-10 rounded-sm">
        <video
          src={"/video/finance_cover_video.mp4"}
          autoPlay
          muted
          loop
          controls={false}
          className="absolute w-full h-full  
                object-cover "
        />
        <div className="absolute w-full h-full z-10 bg-gray-800/40" />{" "}
        {/*Overlay*/}
        <div className="absolute flex flex-col items-center justify-center gap-4 z-30">
          <h1
            className={`text-[#FFFFFF] text-center font-extrabold text-8xl montserrat-text`}
          ></h1>
        </div>
      </div>
      <div>
        <h1
          className={`${oleo.className} font-bold text-xl lg:text-5xl text-center mb-4`}
        >
          Over <span className="text-[#00308F] mb-8">$300,000,000</span> saved
          by our <br /> members in the past year.
        </h1>
        <h1 className="text-center lg:text-lg">
          Don't miss out — join the Blue Light Card community today and start
          saving on the <br /> brands you love!
        </h1>
        <SunAndBeach />
        <UkStays />
        <HotelAndTravel />
        <SkiBreaks />
        <FAQ />
        <div className="flex justify-center mt-10">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="bg-[#00308F] px-6 py-5 font-semibold text-lg rounded
               hover:bg-[#002766] hover:text-gray-300 transition-colors"
          >
            <Link href="/register" className="text-white">
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HolidayDiscounts;
