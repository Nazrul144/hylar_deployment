"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Register4 = () => {
  const [isSending, setIsSending] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const handleVerifyClick = async () => {
    setIsSending(true);
    setShowAlert(false);

    // ✅ Demo API call to send verification code
    try {
      const res = await fetch("/api/send-verification", { method: "POST" });
      const data = await res.json();
      console.log("Verification code sent (demo):", data.code);

      setIsSending(false);
      setShowAlert(true);

      // ✅ Automatically redirect after 2s
      setTimeout(() => {
        router.push("/register/verify-code"); // Next page for code input
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsSending(false);
    }
  };

  const handleResend = async () => {
    setIsSending(true);
    setShowAlert(false);

    // simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSending(false);
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

        <div className="justify-center flex items-center">
          <Button
            onClick={handleVerifyClick}
            className="common-bg py-2.5 px-5 rounded-lg text-white w-56 h-12 flex items-center justify-center gap-1"
            disabled={isSending}
          >
            <span className="text-lg font-semibold">Verify Your Email</span>
            <MdKeyboardDoubleArrowRight className="text-2xl mt-1" />
            {isSending && <Loader2 className="ml-2 h-5 w-5 animate-spin" />}
          </Button>
        </div>

        {/* ✅ Alert Message */}
        {showAlert && (
          <Alert className="w-[90%] lg:w-[600px] mx-auto mt-6 border-green-500">
            <AlertTitle>Verification Sent!</AlertTitle>
            <AlertDescription>
              A new verification email has been sent to your inbox.
            </AlertDescription>
          </Alert>
        )}

        {/* ✅ Resend Button */}
        <div className="mt-8 text-center">
          <h1 className="text-lg">Didn't receive it?</h1>
          <h3 className="text-lg mt-1 mb-4">
            Use the button to resend or check your junk folder.
          </h3>
          <Button
            variant="outline"
            onClick={handleResend}
            disabled={isSending}
          >
            {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSending ? "Resending..." : "Resend Email"}
          </Button>
        </div>

        <div className="mt-8 text-center text-lg">
          By clicking Create Account you agree to Blue Light Card's{" "}
          <Link className="text-blue-600 hover:text-blue-800 underline" href="/term_condition">
            Terms & Conditions
          </Link>
           <br /> For information about how we process your personal <br /> data, click{" "}
          <Link className="text-blue-600 hover:text-blue-800 underline" href="/privacy_notice">
            Privacy Notice.
          </Link>
        </div>
      </div>
      <hr className="border-blue-800 border-[3px] lg:w-[802px] mx-auto" />
    </div>
  );
};

export default Register4;
