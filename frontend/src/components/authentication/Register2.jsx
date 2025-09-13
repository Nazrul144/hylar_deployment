import Image from "next/image";
import React from "react";
import { useId } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Register2 = () => {
  const id = useId();
  return (
    <div>
      <div className="lg:w-[803px] lg:h-[516px] mx-auto mt-14 lg:shadow-2xl relative">
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
        <h1 className="font-bold common-text text-4xl mt-12 montserrat-text text-center">
          Marketing preferences
        </h1>
        <h3 className="text-center text-lg mt-2 montserrat-text">
          Can we contact you with promotions and updates to help you get <br />{" "}
          the most out of your Blue Light Card?
        </h3>
        <div className="mt-10 flex justify-center text-lg montserrat-text ">
          <RadioGroup
            defaultValue="1"
            className="[--primary:var(--color-green-500)] [--ring:var(--color-indigo-300)] in-[.dark]:[--primary:var(--color-indigo-500)] in-[.dark]:[--ring:var(--color-indigo-900)]"
          >
            <div className="flex items-center gap-2 ">
              <RadioGroupItem value="1" id={`${id}-1`} />
              <Label htmlFor={`${id}-1`}>Push notifications</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="2" id={`${id}-2`} />
              <Label htmlFor={`${id}-2`}>Email updates</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="3" id={`${id}-3`} />
              <Label htmlFor={`${id}-3`}>SMS updates</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="lg:absolute justify-center lg:mt-0 mt-5 lg:mb-0 mb-6 lg:right-20 bottom-16 flex items-center">
          <Link
            href={"/register3"}
            className="common-bg py-2.5 px-5 rounded-lg text-white w-28 h-12 flex items-center justify-center gap-1"
          >
            {/* Icon first, then text */}
            <span className="text-lg font-semibold">Next</span>
            <MdKeyboardDoubleArrowRight className="text-2xl mt-1" />
          </Link>
        </div>
      </div>
      <hr className="border-blue-800 border-[3px] lg:w-[802px] mx-auto " />
    </div>
  );
};

export default Register2;
