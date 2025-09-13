"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoCardSharp } from "react-icons/io5";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { countries } from "countries-list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { FaCcDiscover } from "react-icons/fa6";
import { SiMastercard } from "react-icons/si";
import { RiVisaFill } from "react-icons/ri";
import { FaCcAmex } from "react-icons/fa6";
import Swal from "sweetalert2";

const Register9 = () => {
  const [selectedOrganization, setSelectedOrganization] = useState("Country");
  const countryNames = Object.values(countries).map((c) => c.name);

  const handleSubmit = () => {
    Swal.fire({
      title: "Paymet has been completed!",
      icon: "success",
      draggable: true,
    });
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

        <h1 className="font-bold text-4xl common-text mt-10 montserrat-text text-center mb-5">
          Payment
        </h1>
        <h3 className="text-center text-lg montserrat-text mb-6">
          Unlock two years of exclusive access for just $5.99
        </h3>
        {/* Form */}
        <div className="flex justify-center mt-8 gap-6">
          <div className="border-4 border-[#0570DE] w-36 h-28 flex flex-col rounded-2xl justify-center items-center">
            <IoCardSharp className="text-5xl common-text font-bold" />
            <h3 className="common-text font-bold text-2xl">Card</h3>
          </div>

          <div className="border-4 border-[#0570DE] w-36 h-28 flex flex-col rounded-2xl justify-center items-center">
            <Image
              src={"/EPS.png"}
              width={40}
              height={40}
              alt="Icon"
              objectFit="cover"
            />
            <h3 className="common-text font-bold text-2xl">EPS</h3>
          </div>

          <div className="border-4 border-[#0570DE] w-36 h-28 flex flex-col rounded-2xl justify-center items-center">
            <Image
              src={"/Giropay.png"}
              width={40}
              height={40}
              alt="Icon"
              objectFit="cover"
            />
            <h3 className="common-text font-bold text-2xl">Card</h3>
          </div>

          <div className="border-4 border-[#0570DE] w-36 h-28 flex flex-col rounded-2xl justify-center items-center">
            <BsThreeDots className="text-5xl common-text font-bold" />
          </div>
          {/*Card input*/}
        </div>

        <div className="w-[650px] mx-auto mt-8 relative">
          <Label className="text-xl text-[#4F5B76] font-bold" htmlFor="card">
            Card Number
          </Label>{" "}
          <br />
          <Input
            className="mt-2"
            type="email"
            placeholder="1234 1234 1234 1234"
          />
          <div className="flex gap-4 absolute top-12 right-8">
            <FaCcDiscover />
            <SiMastercard />
            <RiVisaFill />
            <FaCcAmex />
          </div>
          <div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <Label
                  className="text-xl text-[#4F5B76] font-bold"
                  htmlFor="card"
                >
                  Expiry
                </Label>
                <Input className="mt-2" type="email" placeholder="MM / YY" />
              </div>
              <div>
                <Label
                  className="text-xl text-[#4F5B76] font-bold"
                  htmlFor="card"
                >
                  CVC
                </Label>
                <Input className="mt-2" type="email" placeholder="CVC" />
              </div>
              <div>
                <Label
                  className="text-xl text-[#4F5B76] font-bold"
                  htmlFor="card"
                >
                  Country
                </Label>
                {/*Dropdown*/}
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="w-full lg:w-[315px] flex justify-between h-9 mt-2 bg-[#F0F0F0] text-black"
                        variant="outline"
                      >
                        {selectedOrganization}
                        <ChevronDownIcon
                          className="-me-1 opacity-60"
                          size={16}
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-full max-h-60 overflow-y-auto"
                      side="bottom"
                      align="start"
                      sideOffset={4} // Ensures it always drops downward
                    >
                      {countryNames?.map((country) => (
                        <DropdownMenuItem
                          key={country}
                          className="w-[630px]"
                          onClick={() => setSelectedOrganization(country)}
                        >
                          {country}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div>
                <Label
                  className="text-xl text-[#4F5B76] font-bold"
                  htmlFor="card"
                >
                  Postal code
                </Label>
                <Input className="mt-2" type="email" placeholder="90210" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-self-center mt-10 ">
          <Button
            onClick={handleSubmit}
            className="common-bg text-2xl py-8 px-10 cursor-pointer"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register9;
