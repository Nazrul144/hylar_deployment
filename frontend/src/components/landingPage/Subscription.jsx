"use client";
import React, { useContext } from "react";
import { IoCheckmark } from "react-icons/io5";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { SignupContext } from "@/providers/SignupProvider";
import { BASE_URL } from "@/config/config";
import { UserContext } from "@/providers/UserProvider";

const Subscription = () => {
  const { userProfile } = useContext(SignupContext);
  const {user} = useContext(UserContext);
  console.log(user)
  
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(
        `${BASE_URL}/api/subscriptions/create-mandate/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userProfile }),
        }
      );

      if (!response.ok) {
        throw new Error("Payment creation failed");
      }

      const data = await response.json();

      console.log("Billing response:", data);

      if (data.authorisation_url) {
        window.location.href = data.authorisation_url;
      } else {
        alert("authorisation_url missing from server response");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while creating the payment.");
    }
  };

  return (
    <div className="mt-10 mb-10 max-w-7xl mx-auto">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.2,
          type: "keyframes",
          stiffness: 60,
          duration: 1,
        }}
      >
        <h1 className="text-center text-xl lg:text-4xl inter-text common-text mb-4 font-bold">
          Choose Your Membership
        </h1>
        <p className="text-center lg:text-xl montserrat-text">
          Join thousands of members enjoying exclusive deals and perks. Pick{" "}
          <br /> the plan that's right for you.
        </p>
      </motion.div>

      {/*Subscription Card*/}
      <div className="lg:flex justify-center items-center lg:gap-8 mt-10 px-4">
        <motion.div
          className="lg:mt-0 mt-8 lg:ml-0"
          initial={{ x: -150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 60,
            duration: 1,
          }}
        >
          <article className="rounded-sm border border-blue-900 border-b-4 p-4 lg:w-[442px] h-[450px]">
            <h2 className=" text-xl lg:text-4xl font-bold inter-text common-text text-center mt-10 mb-2">
              Basic
            </h2>
            <h1 className="lg:text-3xl inter-text text-center mb-2">$5.99</h1>
            <h5 className="text-center text-sm montserrat-text ">
              One-time free
            </h5>

            <div className="flex justify-center items-center mt-8">
              <div>
                <div className="flex items-center gap-2">
                  <IoCheckmark className="text-green-500 font-bold text-2xl" />
                  <p className="montserrat-text text-sm">
                    Access to selected discounts
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <IoCheckmark className="text-green-500 font-bold text-2xl" />
                  <p className="montserrat-text text-sm">Email support</p>
                </div>
                <div className="flex items-center gap-2">
                  <IoCheckmark className="text-green-500 font-bold text-2xl" />
                  <p className="montserrat-text text-sm">Basic verification</p>
                </div>
              </div>
            </div>

            <Button onClick={handlePayment} className="lg:w-88 h-12 text-lg text-white inter-text common-bg mt-16 mx-auto block cursor-pointer hover:bg-common-bg hover:scale-105 transition-all duration-300">
              Get Basic
            </Button>
          </article>
        </motion.div>

        <motion.div
          className="lg:mt-0 mt-8 lg:ml-0"
          initial={{ x: 150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 60,
            duration: 1,
          }}
        >
          <article className="rounded-sm border border-blue-900 border-b-4 p-4 lg:w-[442px] h-[450px]">
            <h2 className="text-xl lg:text-4xl font-bold inter-text common-text text-center mt-10 mb-2">
              Premium
            </h2>
            <h1 className="lg:text-3xl inter-text text-center mb-2">$5.99</h1>
            <h5 className="text-center text-sm montserrat-text ">
              One-time free
            </h5>

            <div className="flex justify-center items-center mt-8">
              <div>
                <div className="flex items-center gap-2">
                  <IoCheckmark className="text-green-500 font-bold text-2xl" />
                  <p className="montserrat-text text-sm">
                    Unlimited discount access
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <IoCheckmark className="text-green-500 font-bold text-2xl" />
                  <p className="montserrat-text text-sm">
                    Priority customer support
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <IoCheckmark className="text-green-500 font-bold text-2xl" />
                  <p className="montserrat-text text-sm">
                    Bonus partner rewards
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <IoCheckmark className="text-green-500 font-bold text-2xl" />
                  <p className="montserrat-text text-sm">
                    Early access to new deals
                  </p>
                </div>
              </div>
            </div>

            <Button className="lg:w-88 h-12 text-lg text-white inter-text common-bg mt-10 mx-auto block cursor-pointer hover:bg-common-bg hover:scale-105 transition-all duration-300">
              Get Premium
            </Button>
          </article>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscription;
