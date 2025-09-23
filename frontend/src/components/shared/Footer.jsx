"use client";
import React, { useState } from "react";
import { useId } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { BiSend } from "react-icons/bi";
import Link from "next/link";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const id = useId();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    if (!email) {
      toast.error("Please Enter email!", {
        position: "bottom-center"
      })
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid Email", {
        position: "bottom-center"
      })
      return;
    }
    toast.success("Subscription Successful", {
      position: "bottom-center"
    });
    setEmail("");
  };

  return (
    <div className="mt-24 common-bg">
      <div className="grid lg:grid-cols-5 ml-12 lg:ml-0 lg:px-44 text-[#FAFAFA]">
        {/*Column-1*/}
        <div className="mt-10 ">
          <h2 className="text-xl  font-bold mb-4">Exclusive</h2>
          <h3 className="text-lg  font-bold mb-2">Subscribe</h3>
          <p className="text-sm mb-4">Get 10% off your first order</p>
          <div>
            <div className="relative w-44 h-6">
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id={id}
                className="pe-9"
                placeholder="Enter your email"
                type="email"
              />
              <button
                onClick={handleSubmit}
                className=" cursor-pointer text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-sm transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Subscribe"
              >
                <BiSend
                  className="mt-3 text-white"
                  size={24}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>

        {/*Column-2*/}
        <div className="mt-10">
          <h2 className="text-xl  font-bold mb-4">Support</h2>
          <h3 className="text-sm  font-bold mb-2 text-[#FAFAFA]">
            111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.
          </h3>
          <p className="text-sm mb-2 text-[#FAFAFA]">exclusive@gmail.com</p>
          <p className="text-sm mb-2">+88015-88888-9999</p>
        </div>

        {/*Column-3*/}
        <div className="mt-10">
          <h2 className="text-xl  font-bold mb-4">Account</h2>
          <h3 className="text-sm  font-bold mb-2">My Account</h3>
          <Link href={'/login'} className="text-sm mb-2">Login /</Link>
          <Link href={'/register'} className="text-sm mb-2"> Register</Link>
          <p className="text-sm mb-2">Cart</p>
          <p className="text-sm mb-2">Wishlist</p>
          <p className="text-sm ">Shop</p>
        </div>

        {/*Column-4*/}
        <div className="mt-10">
          <h2 className="text-xl  font-bold mb-4">Quick Link</h2>
          <h3 className="text-sm  font-bold mb-2">Privacy Policy</h3>
          <p className="text-sm mb-2">Terms Of Use</p>
          <Link href={'/faqs'} className="text-sm mb-2">FAQ </Link> <br />
          <Link href={"/contact"} className="text-sm ">
            Contact
          </Link>
        </div>

        {/*Column-5*/}
        <div className="mt-10">
          <h2 className="text-xl  font-bold mb-4">Download App</h2>
          <h3 className="text-sm  font-bold mb-2">
            Save $3 with App New User Only
          </h3>
          <div className=" w-32 lg:w-96">
            <Image
              src={"/footer/qr_code.png"}
              width={200}
              height={200}
              alt="QRCode"
            />
          </div>
        </div>
      </div>
      <hr className="border-white border-[0.1px] mt-16" />
      <h3 className="text-[#B5B5B5] text-center text-sm py-8">
        copyright @ maximumSavings
      </h3>
    </div>
  );
};

export default Footer;
