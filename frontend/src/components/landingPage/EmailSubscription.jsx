import React, { useState } from "react";
import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import myPhoto from "../../../public/emailSubscription/email_sub.png";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const EmailSubscription = () => {
  const id = useId();
  const [email, setEmail] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleClear = () => {
    setEmail(""); // clears the input
  };

  const handleSubmit = () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Email Required",
        text: "Please enter a valid email address before subscribing.",
      });
      return;
    }
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address (e.g., name@example.com).",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Subscription Successful",
      text: "Thank you for subscribing! You’ll start receiving our latest offers and updates in your inbox.",
    });
    setEmail("")
  };

  return (
    <div className="lg:max-w-7xl mx-auto px-2">
      <div className="lg:relative">
        <Image src={myPhoto} alt="Image" />

        <div className="lg:absolute top-1 lg:top-16 left-4 lg:left-32">
          <h3 className="pinyon-text lg:text-3xl text-[#7BB662]">
            ~ Mega Sale ~
          </h3>
          <h2 className="bills-text lg:text-5xl text-xl text-white">
            Join Our Savings Club
          </h2>
          <p className="text-sm mt-3 text-white">
            Be the first to know about exclusive offers, latest discounts, and
            special rewards.
            <br /> Subscribe to our newsletter and never miss a deal again!
          </p>

          <div>
            <div className="lg:flex gap-2 mt-4 relative px-2">
              <Input
                id={id}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white lg:border-none lg:p-8 lg:pr-12 border-1 border-gray-200 "
                placeholder="Type Your Email"
                type="email"
              />

              {/* Clear button inside input */}
              {email && (
                <RxCross2
                  onClick={handleClear}
                  className="lg:absolute lg:right-44 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-600 cursor-pointer"
                />
              )}

              <Button
                onClick={handleSubmit}
                className="bg-[#7BB662] text-white text-lg mt-2 lg:mt-0 lg:0 lg:p-8 hover:bg-[#00308F] transition-colors duration-300 ease-in-out cursor-pointer"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSubscription;
