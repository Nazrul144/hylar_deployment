"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaGift } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { ConfettiButton } from "../ui/confetti";
import { Spinner } from "../ui/spinner";
import Image from "next/image";
import { BASE_URL } from "@/config/config";

export function DialogDemo({ offerId }) {
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCoupon = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("access_token"); // Get token

      const res = await fetch(`${BASE_URL}/api/offers/voucher/${offerId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Unauthorized or Token expired");
      }

      const data = await res.json();
      setCouponCode(data?.coupon_code || "N/A");
      setDiscountPercent(data?.discount || 0);
    } catch (err) {
      console.error("Failed to fetch coupon code:", err);
      setCouponCode("Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-[#00308F] text-white font-bold text-lg lg:w-[600px] py-6 cursor-pointer"
          onClick={fetchCoupon}
        >
          View Coupon
          <LuSend className="mt-1 ml-2" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-center text-3xl text-[#00308F] mt-10 mb-6 relative">
            <FaGift />
            <Image
              src="/cong.png"
              width={500}
              height={400}
              alt="congrats"
              className="absolute bottom-[-120px] w-full"
            />
          </div>

          <DialogTitle className="text-center text-gray-700 font-bold">
            Your Reward Awaits 🎉
          </DialogTitle>

          {isLoading ? (
            <div className="flex justify-center mt-8">
              <Spinner className="size-8" />
            </div>
          ) : (
            <>
              <h1 className="text-center text-4xl font-bold text-[#00308F] mt-6">
                {discountPercent || 0}% OFF
              </h1>
              <h3 className="text-xl mb-10 text-center">On your next purchase</h3>

              <div className="flex justify-center">
                <div className="border-2 border-dashed px-6 py-3 rounded-md">
                  <h1 className="text-center text-lg text-[#7D7878]">
                    Your coupon code
                  </h1>
                  <h1 className="text-center font-bold text-2xl mt-2">
                    {couponCode}
                  </h1>
                </div>
              </div>
            </>
          )}
        </DialogHeader>

        <DialogFooter className="mt-14">
          <DialogClose asChild>
            <ConfettiButton
              className="bg-[#00308F] py-6 text-white text-xl w-full"
              disabled={isLoading}
            >
              Redeem Coupon 🎁
            </ConfettiButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
