"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { IoArrowForwardSharp } from "react-icons/io5";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Register5 = () => {
  const [selectedOrganization, setSelectedOrganization] = useState(
    "Select your organization"
  );

  const [selectedEmployer, setSelectedEmployer] = useState(
    "Select Your Employer"
  );

  return (
    <div>
      <div className="lg:w-[803px] lg:h-[961px] mx-auto mt-14 lg:shadow-2xl relative">
        <div className="lg:w-[820px] h-[50px]">
          <Image
            src={"/register2.png"}
            width={802}
            height={50}
            objectFit="cover"
            priority
            alt="header_Image"
          />
        </div>

        <h1 className="font-bold text-4xl common-text mt-10 montserrat-text text-center mb-5">
          Tell us where you work
        </h1>
        <h3 className="text-center text-lg montserrat-text mb-6">
          Enter your employment details and job title so we can confirm <br />
          you're eligible.
        </h3>

        {/* Form */}
        <div className="lg:w-2xl mx-auto p-4">
          <Label className="text-sm font-bold common-text" htmlFor="employment">
            EMPLOYMENT STATUS
          </Label>
          <br />
          <Button
            className="w-full h-15 flex justify-between items-center bg-[#F0F0F0] text-sm mt-3 mb-3 cursor-pointer"
            variant="outline"
          >
            Emergency Service
            <IoArrowForwardSharp size={30} />
          </Button>

          <Label className="text-sm font-bold common-text mb-3" htmlFor="job">
            JOB DETAILS
          </Label>
          <br />

          {/* Organization Dropdown */}
          <div className="mt-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className=" w-full lg:w-[640px] flex justify-between h-15 bg-[#F0F0F0] text-black"
                  variant="outline"
                >
                  {selectedOrganization}
                  <ChevronDownIcon className="-me-1 opacity-60" size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-full "
                side="bottom"
                align="start"
              >
                <DropdownMenuItem
                  className="w-[630px] "
                  onClick={() => setSelectedOrganization("Ambulance Service")}
                >
                  Ambulance Service
                </DropdownMenuItem>
                <DropdownMenuItem
                  className=" w-[630px]"
                  onClick={() => setSelectedOrganization("APHA")}
                >
                  APHA
                </DropdownMenuItem>
                <DropdownMenuItem
                  className=" w-[600px]"
                  onClick={() => setSelectedOrganization("Blood Bikes")}
                >
                  Blood Bikes
                </DropdownMenuItem>
                <DropdownMenuItem
                  className=" w-[630px]"
                  onClick={() => setSelectedOrganization("Dental Practice")}
                >
                  Dental Practice
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Employer Dropdown */}
          <div className="mt-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="w-full flex justify-between h-15 bg-[#F0F0F0]"
                  variant="outline"
                >
                  {selectedEmployer}
                  <ChevronDownIcon className="-me-1 opacity-60" size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-full py-2"
                side="bottom"
                align="start"
              >
                <DropdownMenuItem
                  className="lg:w-[630px]"
                  onClick={() => setSelectedEmployer("Ambulance Service")}
                >
                  Ambulance Service
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="lg:w-[630px]"
                  onClick={() => setSelectedEmployer("Fire Service")}
                >
                  Fire Service
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="lg:w-[630px]"
                  onClick={() => setSelectedEmployer("HM Coastguard")}
                >
                  HM Coastguard
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="lg:w-[630px]"
                  onClick={() => setSelectedEmployer("Independent Lifeboats")}
                >
                  Independent Lifeboats
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="lg:w-[630px]"
                  onClick={() => setSelectedEmployer("NHS")}
                >
                  NHS
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="w-[630px]"
                  onClick={() => setSelectedEmployer("Police")}
                >
                  Police
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="lg:w-[630px]"
                  onClick={() => setSelectedEmployer("Red Cross")}
                >
                  Red Cross
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="lg:w-[630px]"
                  onClick={() => setSelectedEmployer("RNLI")}
                >
                  RNLI
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="lg:w-[630px]"
                  onClick={() => setSelectedEmployer("Search and Rescue")}
                >
                  Search and Rescue
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/*Button*/}
          <Button
            className="w-full h-15 flex justify-between items-center bg-[#F0F0F0] text-sm mt-3 mb-3 cursor-pointer"
            variant="outline"
          >
            Employed
            <IoArrowForwardSharp size={30} />
          </Button>
          <Button
            className="w-full h-15 flex justify-between items-center bg-[#F0F0F0] text-sm mt-3 mb-3 cursor-pointer"
            variant="outline"
          >
            Retired
            <IoArrowForwardSharp size={30} />
          </Button>
          <div className="lg:absolute justify-center lg:mt-0 mt-5 lg:mb-0 mb-6 lg:right-20 bottom-16 flex items-center">
            <Link
              href={"/register6"}
              className="common-bg py-2.5 px-5 rounded-lg text-white w-28 h-12 flex items-center justify-center gap-1"
            >
              {/* Icon first, then text */}
              <span className="text-lg font-semibold">Next</span>
              <MdKeyboardDoubleArrowRight className="text-2xl mt-1" />
            </Link>
          </div>
        </div>
      </div>

      <hr className="border-blue-800 border-[3px] lg:w-[802px] mx-auto" />
    </div>
  );
};

export default Register5;
