"use client";
import React, { useState, useEffect } from "react";
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
  const [couponCode, setCouponCode] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(null);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // ⏳ Countdown effect
  useEffect(() => {
    if (!cooldownTime) return;

    const interval = setInterval(() => {
      setCooldownTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsOnCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownTime]);

  const fetchCoupon = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setErrorMessage("Please log in to claim your voucher.");
        setIsLoading(false);
        return;
      }

      const res = await fetch(`${BASE_URL}/api/offers/voucher/${offerId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      console.log("Voucher:", json);

      // ⚠️ Subscription or Auth Errors → real errors
      if (json?.error === "SUBSCRIPTION_REQUIRED") {
        setErrorMessage("You need an active subscription to claim this voucher.");
        return;
      }
      if (res.status === 401) {
        setErrorMessage("Your session expired. Please log in again.");
        return;
      }

      // 🎯 IMPORTANT FIX:
      // If backend sends 425 → it is NOT an error
      const voucher = json?.data;
      const offer = voucher?.offer;

      setCouponCode(voucher?.coupon || "Unavailable");
      setDiscountPercent(offer?.discount_percent || 0);

      // Handle cooldown manually
      if (res.status === 425 || (voucher.claimed && voucher.claimed_at)) {
        const lastClaim = new Date(voucher.claimed_at).getTime();
        const now = Date.now();
        const hours = offer.voucher_cooldown_hours || 24;
        const cooldownMs = hours * 60 * 60 * 1000;

        const remaining = cooldownMs - (now - lastClaim);

        if (remaining > 0) {
          setIsOnCooldown(true);
          setCooldownTime(Math.floor(remaining / 1000));
        }
      }
    } catch (err) {
      console.error("Network error:", err);
      setErrorMessage("Network error. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ⏳ Format Countdown
  const formatTime = (seconds) => {
    if (!seconds) return "00:00:00";
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-[#00308F] text-white font-bold text-lg lg:w-[600px] py-6"
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

          {/* LOADING */}
          {isLoading && (
            <div className="flex justify-center mt-8">
              <Spinner className="size-8" />
            </div>
          )}

          {/* REAL ERRORS ONLY */}
          {!isLoading && errorMessage && !couponCode && (
            <div className="mt-6 text-center">
              <p className="text-red-600 font-semibold">{errorMessage}</p>
            </div>
          )}

          {/* SUCCESS (always show coupon + timer if cooldown) */}
          {!isLoading && couponCode && (
            <>
              {/* Discount */}
              <h1 className="text-center text-4xl font-bold text-[#00308F] mt-6">
                {discountPercent}% OFF
              </h1>

              {/* Coupon Display */}
              <div className="flex justify-center mt-6">
                <div className="border-2 border-dashed px-6 py-3 rounded-md">
                  <h1 className="text-center text-lg text-gray-500">Your coupon code</h1>
                  <h1 className="text-center font-bold text-2xl mt-2">{couponCode}</h1>
                </div>
              </div>

              {/* COOLDOWN TIMER */}
              {isOnCooldown && (
                <div className="mt-8 text-center">
                  <p className="text-red-600 font-semibold">
                    You can claim another voucher in:
                  </p>
                  <p className="text-3xl font-bold text-[#00308F] mt-2">
                    {formatTime(cooldownTime)}
                  </p>
                </div>
              )}
            </>
          )}
        </DialogHeader>

        <DialogFooter className="mt-14">
          <DialogClose asChild>
            <ConfettiButton
              className="bg-[#00308F] py-6 text-white text-xl w-full"
              disabled={isOnCooldown || isLoading}
            >
              Redeem Coupon 🎁
            </ConfettiButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
