"use client";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import toast from "react-hot-toast";
import { BASE_URL } from "@/config/config";
import { SignupContext } from "@/providers/SignupProvider";
import { email } from "zod";

const Register4 = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30); // Start with 30s cooldown
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const { signupData } = useContext(SignupContext);

  const userEmail = signupData.email;

  // Countdown effect for resend button
  useEffect(() => {
    if (resendCooldown <= 0) return;

    const interval = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendCooldown]);



  const handleOtpVerify = async () => {
  if (otp.length !== 6) {
    toast.error("Please enter a 6-digit OTP");
    return;
  }

  setIsVerifying(true);
  try {
    console.log("Email and OTP", { email: userEmail, token: otp });

    const res = await fetch(`${BASE_URL}/api/accounts/verify`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail.trim(), 
        token: otp.trim(),  
      }),
    });

    const data = await res.json();
    console.log("Verify Response:", data);

    if (data.status === "success" && data.status_code === 200) {
      toast.success(data.detail || "Email verified successfully!");

      // optional: store tokens if returned
      localStorage.setItem("access_token", data.data?.access_token || "");
      localStorage.setItem("refresh_token", data.data?.refresh_token || "");

      router.push("/register/register2/register3/register4/register5");
    } else {
      toast.error(data.detail || "Invalid OTP");
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to verify OTP");
  } finally {
    setIsVerifying(false);
  }
};

//Resend OTP

 const handleResend = async () => {
  setIsResending(true);
  setShowAlert(false);

  try {
    const res = await fetch(`${BASE_URL}/api/accounts/resend-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail.trim() }), 
    });
    const data = await res.json();

    if (data.status === "success" || data.status_code === 200) {
      setShowAlert(true);
      setResendCooldown(30); // reset cooldown
      toast.success("OTP resent successfully!");
    } else {
      toast.error(data.detail || "Failed to resend OTP");
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to resend OTP");
  } finally {
    setIsResending(false);
  }
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
          Check your inbox at <span className="font-bold">{userEmail}</span> and
          click the link in
          <br /> the email to verify your account.
        </h3>

        <div className="flex flex-col justify-center items-center gap-4">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button onClick={handleOtpVerify} disabled={isVerifying}>
            {isVerifying && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin cursor-pointer" />
            )}
            Verify
          </Button>
        </div>

        {showAlert && (
          <Alert className="w-[90%] lg:w-[600px] mx-auto mt-6 border-green-500">
            <AlertTitle>Verification Sent!</AlertTitle>
            <AlertDescription>
              A verification link or OTP has been sent to your email. Please
              check your inbox.
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-8 text-center">
          <h1 className="text-lg">Not receive a code?</h1>
          <h3 className="text-lg mt-1 mb-4">
            Use the button to resend or check your junk folder.
          </h3>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={handleResend}
            disabled={isResending || resendCooldown > 0} // disable during cooldown
          >
            {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
          </Button>
        </div>
      </div>

      <hr className="border-blue-800 border-[3px] lg:w-[802px] mx-auto" />
    </div>
  );
};

export default Register4;
