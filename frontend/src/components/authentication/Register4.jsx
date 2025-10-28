"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register4 = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const handleVerifyClick = async () => {
    setIsVerifying(true);
    setShowAlert(false);

    try {
      const res = await fetch("/api/send-verification", { method: "POST" });
      const data = await res.json();

      if (data.success) {
        setShowAlert(true);
        router.push("/register/register2/register3/register4/register5")
        
      } else {
        alert("Failed to send verification email");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setShowAlert(false);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsResending(false);
    setShowAlert(true);
  };

  return (
    <div>
      <div className="lg:w-[803px] lg:h-auto mx-auto mt-14 lg:shadow-2xl relative pb-10">
        <div className="lg:w-[820px] h-[50px]">
          <Image
            src={"/register2.png"}
            width={802}
            height={50}
            alt="header_Image"
            className="object-cover"
            priority
          />
        </div>

        <h1 className="font-bold text-4xl mt-10 montserrat-text text-center mb-6">
          We need to verify your email
        </h1>
        <h3 className="text-center text-lg mt-2 montserrat-text mb-6">
          Check your inbox at{" "}
          <span className="font-bold">alishuvo143@gmail.com</span> and click the link in
          <br /> the email to verify your account.
        </h3>

        {/* <div className="justify-center flex items-center">
          <Button
            onClick={handleVerifyClick}
            className="common-bg py-2.5 px-5 rounded-lg text-white w-56 h-12 flex items-center justify-center gap-1"
            disabled={isVerifying}
          >
            <span className="text-lg font-semibold">Verify Your Email</span>
            <MdKeyboardDoubleArrowRight className="text-2xl mt-1" />
            {isVerifying && <Loader2 className="ml-2 h-5 w-5 animate-spin" />}
          </Button>
        </div> */}

        {showAlert && (
          <Alert className="w-[90%] lg:w-[600px] mx-auto mt-6 border-green-500">
            <AlertTitle>Verification Sent!</AlertTitle>
            <AlertDescription>
              A verification link has been sent to your email. Please check your inbox.
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-8 text-center">
          <h1 className="text-lg">Didn't receive it?</h1>
          <h3 className="text-lg mt-1 mb-4">
            Use the button to resend or check your junk folder.
          </h3>
          <Button
            variant="outline"
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isResending ? "Resending..." : "Resend Email"}
          </Button>
        </div>
      </div>
      <hr className="border-blue-800 border-[3px] lg:w-[802px] mx-auto" />
    </div>
  );
};

export default Register4;
