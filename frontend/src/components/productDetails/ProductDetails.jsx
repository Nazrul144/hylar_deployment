"use client";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Button } from "../ui/button";
import { LuSend } from "react-icons/lu";
import { DialogDemo } from "../dialog/DialogDemo";

const ProductDetails = () => {
  const [time, setTime] = useState({
    days: 2,
    hours: 6,
    minutes: 5,
    seconds: 30,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <div className="lg:w-7xl mx-auto px-2">
      <div>
        <Image
          src={"/detailsPageBannerImage/banner.png"}
          width={1600}
          height={600}
          alt="banner_image"
          className="mb-10"
        />
        <h1 className="font-bold text-xl lg:text-7xl text-[#00308F] mb-4">
          Voucher Gift – Get 50% OFF Your Meal!
        </h1>
        <p className="text-xl">
          Enjoy a delicious dining experience at half the price! Indulge in our
          signature dishes, fresh ingredients, and warm atmosphere. Whether
          you're here for lunch, dinner, or a quick snack, this voucher gives
          you 50% off your total bill. Don't miss out on this mouthwatering deal
          - treat yourself today! Valid until 16 May 2020. Terms and conditions
          apply.
        </p>
        <h1 className="text-xl">
          Valid until 16 May 2020. Terms and conditions apply
        </h1>
        <div className="mt-16">
          <h1 className="text-center text-2xl text-gray-700">
            Hurry, Before It's Too Late!
          </h1>
          <div>
            <div className="flex items-center justify-center gap-4">
              {[
                { label: "Days", value: time.days },
                { label: "Hr", value: time.hours },
                { label: "Mins", value: time.minutes },
                { label: "Sec", value: time.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center w-20 h-24 bg-white shadow-md rounded-xl"
                >
                  <span className="text-3xl font-mono font-bold text-gray-800">
                    {formatNumber(item.value)}
                  </span>
                  <span className="text-sm text-gray-500 mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-14">
              <h1 className=" text-xl lg:text-3xl font-bold text-[#00308F] text-center">
                Visit Our Shop
              </h1>
              <h3 className="text-center mt-2 mb-4 text-xl">
                We welcome you to our cozy space where taste meets comfort. Stop
                by for a <br /> memorable dining experience.
              </h3>
              <div className="flex justify-center mt-16">
                <div className="text-xl space-y-3 ">
                  <div className="flex items-center">
                    <IoLocationSharp className="text-[#00308F] text-2xl" />
                    <h1 className="font-bold">Address: </h1>
                    <span> Maximum Savings</span>
                  </div>
                  <div className="flex gap-2">
                    <FaPhoneAlt className="text-[#00308F] text-2xl" />
                    <h1 className="font-bold">Phone:</h1>
                    <span>+44 4344 43453</span>
                  </div>
                  <div className="flex gap-2">
                    <MdEmail className="text-[#00308F] text-2xl" />
                    <h1 className="font-bold">Email:</h1>
                    <span>example@gmail.com</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-16">
                <DialogDemo/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
