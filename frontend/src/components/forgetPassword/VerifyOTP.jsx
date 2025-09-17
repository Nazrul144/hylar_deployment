"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyOTP = () => {
  return (
    <div>
      <div className="lg:flex md:flex mt-12 justify-center mx-auto gap-6 bg-white w-[820px] p-2 shadow-2xl">
        {/* Image div */}
        <div className="relative h-[600px] w-96">
          <Image
            src="/forgetPassword/1.png"
            alt="forgotPassword"
            fill
            className=" object-cover"
            priority
          />

          <div className="absolute inset-0 grid place-items-center ml-14">
            <h1 className="z-10 text-3xl font-bold text-white drop-shadow-lg">
              Welcome Back
              <hr className="border-t-1 border-[#7BB662] w-66 mt-2" />
              <span className="text-sm text-gray-400">
                We sent a 6-digit code to you***@example.com. Enter it below to
                continue.
              </span>
            </h1>
            <h3 className="absolute bottom-10 text-white mr-8">
              Log in to your MaximumSavings account.
            </h3>
          </div>
          <div className="absolute inset-0 rounded-lg bg-black/30" />
        </div>

        {/* Login form */}
        <div className="h-[600px] w-96">
          <div className="w-full max-w-md p-8 space-y-3 text-gray-100 h-full">
            <h1 className="montserrat-text  common-text text-xl font-bold ">
              Account
            </h1>
            <h1 className="text-black font-bold text-3xl">Verify OTP</h1>
            <p className="text-gray-600 text-justify text-sm mb-12">
              Enter the 6-digit code we sent to your email address to verify
              it's you.
            </p>

            <form className="space-y-6">
              {/* Email input */}
              <div className="flex justify-center">
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                  <InputOTPGroup className="text-black">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* Submit button */}
              <Link href={'createpass'}
                type="submit"
                className="block w-full text-center rounded-sm text-white bg-[#00308F] h-12 cursor-pointer pt-3"
              >
                Send OTP Code
              </Link>
              <div className="flex items-center gap-2">
                <div>
                  <Image
                    src={"/forgetPassword/light.svg"}
                    width={20}
                    height={20}
                    alt="Image"
                  />
                </div>
                <div>
                  <h2 className="text-black">
                    <span className="text-sm">
                      Did't get it? Check spam/promotions, or wait a moment
                      before resending.
                    </span>
                  </h2>
                </div>
              </div>
            </form>
            <div className="flex justify-between mt-24 text-black">
              <div className="common-text font-bold underline text-sm">
                <Link href={"/login"}>Back to Login</Link>
              </div>
              <div className="common-text font-bold text-sm">
                <Link href={"/"}>Need help? Contact support</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
