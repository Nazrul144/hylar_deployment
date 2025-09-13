"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Input } from "../ui/input";
import { countries } from "countries-list";

const Register7 = () => {
  const [selectedOrganization, setSelectedOrganization] = useState("Country");

  const countryNames = Object.values(countries).map((c) => c.name);

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
          Delivery Address
        </h1>
        <h3 className="text-center text-lg montserrat-text mb-6">
          We'll send your membership card here, check to make sure it's <br />
          correct.
        </h3>

        {/* Form */}
        <div className="lg:w-2xl mx-auto p-4">
          <Input
            className="h-14 !text-lg !text-black bg-[#F0F0F0] rounded-none placeholder:text-black"
            type="text"
            placeholder="Address line 1"
          />
          <br />
          <Input
            className="h-14 !text-lg !text-black bg-[#F0F0F0] rounded-none placeholder:text-black"
            type="text"
            placeholder="Address line 2 (Optional)"
          />
          <br />
          <Input
            className="h-14 !text-lg !text-black bg-[#F0F0F0] rounded-none placeholder:text-black"
            type="text"
            placeholder="Town/City"
          />
          <br />

          {/* Country Dropdown */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="w-full lg:w-[640px] flex justify-between h-14 bg-[#F0F0F0] text-black"
                  variant="outline"
                >
                  {selectedOrganization}
                  <ChevronDownIcon className="-me-1 opacity-60" size={16} />
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

          <br />
          <Input
            className="h-14 !text-lg !text-black bg-[#F0F0F0] rounded-none placeholder:text-black"
            type="text"
            placeholder="Postcode"
          />

          {/* Back and Next Button */}
          <div className="flex justify-between items-center mt-12">
            <div>
              <Button
                variant="outline"
                className="py-5 px-6 text-lg common-text border-2 border-blue-800 cursor-pointer"
              >
                <Link href={'/register6'}>Back</Link>
              </Button>
            </div>
            <div>
              <Link
                href={"/register8"}
                className="common-bg py-2.5 px-5 rounded-lg text-white w-28 h-12 flex items-center justify-center gap-1"
              >
                <span className="text-lg font-semibold">Next</span>
                <MdKeyboardDoubleArrowRight className="text-2xl mt-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-blue-800 border-[3px] lg:w-[802px] mx-auto" />
    </div>
  );
};

export default Register7;
