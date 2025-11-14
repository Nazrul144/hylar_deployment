"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupContext } from "@/providers/SignupProvider";



const formSchema = z.object({
  checkbox: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms & Conditions",
  }),
});

const Register8 = () => {


  const {userProfile} = useContext(SignupContext)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkbox: false,
    },
  });

  console.log(userProfile)

  
  //   data;
  //   setSignupData((prev) => ({
  //     ...prev,
  //     ...data,
  //   }));
  // };

const handlePayment = async () => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
      "https://cestoid-uncoarsely-kayla.ngrok-free.dev/api/subscriptions/create-mandate/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,   
        },
        body: JSON.stringify( {userProfile} ), 
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
    <div>
      <div className="lg:w-[803px] lg:h-[600px] mx-auto mt-14 lg:shadow-2xl relative">
        <div className="lg:w-[820px] h-[50px]">
          <Image
            src={"/register2.png"}
            width={802}
            height={50}
            priority
            alt="header_Image"
            className="object-cover"
          />
        </div>

        <h1 className="font-bold text-4xl mt-10 montserrat-text text-center mb-5">
          Welcome to Maximum Savings!
        </h1>
        <h3 className="text-center text-lg montserrat-text mb-6">
          Please complete the following to start saving
        </h3>
        <div className="lg:w-2xl mx-auto p-4">
          <div>
            <div className="flex">
              <div className="bg-[#F0F0F0] rounded-lg">
                <h1 className="common-text font-bold text-lg p-6">
                  Make a payment
                </h1>
                <h4 className="ml-6 pb-8">
                  Enter your delivery address and unlock two years of exclusive
                  access <br /> for just $5.99.
                </h4>
                <hr className="border-blue-800 border-[3px] lg:w-[640px] mx-auto" />
              </div>
            </div>

            <div className="flex justify-end mt-12">
              <Button onClick={handlePayment}
                className="common-bg py-2.5 px-5 rounded-lg text-white w-28 h-12 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span className="text-lg font-semibold">Pay Now</span>
       
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register8;
