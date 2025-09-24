"use client";

import { useState } from "react";
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
import Confetti from "react-confetti";

export function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-[#00308F] text-white font-bold text-lg lg:w-[600px] py-4 cursor-pointer">
            View Coupon
            <LuSend className="mt-1" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] relative overflow-hidden">
          {/* 🎉 Confetti animation only when modal is open */}
          {open && (
            <div className="absolute top-0 left-0 w-full h-32 pointer-events-none">
              <Confetti
                width={400} // Adjust width
                height={150} // Confetti height only at top
                numberOfPieces={80}
                recycle={false} // Runs only once when opened
                gravity={0.3}
              />
            </div>
          )}

          <DialogHeader>
            <div className="flex justify-center text-3xl text-[#00308F] mt-10 mb-3">
              <FaGift />
            </div>
            <DialogTitle className="text-center text-[#7D7878]">
              Surprise gift for you
            </DialogTitle>
            <h1 className="text-center text-4xl font-bold text-[#00308F] mt-8">
              50% OFF
            </h1>
            <h3 className="text-xl mb-10 text-center">Entire Purchase</h3>
            <div className="flex justify-center">
              <div className="border-1 border-dashed p-10">
                <h1 className="text-center text-lg text-[#7D7878]">
                  Your coupon code
                </h1>
                <h1 className="text-center font-bold text-2xl">DH3YHZXB</h1>
              </div>
            </div>
          </DialogHeader>

          <DialogFooter className="mt-16 mb-4">
            <DialogClose asChild>
              <Button
                className="bg-[#00308F] py-6 text-white text-xl w-full cursor-pointer"
                variant="outline"
              >
                Redeem Coupon
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
