import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGift } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { ConfettiButton } from "../ui/confetti";
import Image from "next/image";

export function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-[#00308F] text-white font-bold text-lg lg:w-[600px] py-6 cursor-pointer">
            View Coupon
            <LuSend className="mt-1" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex justify-center text-3xl text-[#00308F] mt-10 mb-3 relative">
              <FaGift />
              <div className="absolute bottom-[-160px] w-[430px]">
                <Image
                src={'/cong.png'}
                width={500}
                height={400}
                alt="cong_image"
                className="w-full"
                objectFit="cover"
                />
              </div>
            </div>
            <DialogTitle className="text-center text-gray-700 font-bold">
              Surprise gift for you
            </DialogTitle>
            <h1 className="text-center text-4xl font-bold text-[#00308F] mt-6">
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
              <div className="relative w-full">
                <ConfettiButton
                  className="bg-[#00308F] py-6 text-white text-xl w-full cursor-pointer"
                  variant="outline"
                >
                  Redeem Coupon 🎁
                </ConfettiButton>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
