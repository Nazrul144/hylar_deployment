"use client";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config/config";
import { SignupContext } from "../../providers/SignupProvider";
import Swal from "sweetalert2";

const Register4 = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const { signupData } = useContext(SignupContext);

  const userEmail = signupData?.email || "";

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: custom * 0.1 },
    }),
  };

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
      // ✅ FIXED: Correct endpoint and payload
      const res = await fetch(`${BASE_URL}/api/accounts/verify-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail.trim(),
          otp_code: otp.trim(),
          purpose: "register",
        }),
      });

      const data = await res.json();
      console.log("Verify Response:", data);

      // ✅ FIXED: Check for 'success' field and statusCode
      if (data.success === true && data.statusCode === 200) {
        Swal.fire({
          title: "Email Verified Successfully",
          text: data.message || "Your account is now active!",
          icon: "success",
          confirmButtonColor: "#16a34a",
          confirmButtonText: "OK",
        });

        // ✅ Store tokens for profile completion (following API naming convention: access/refresh)
        if (data.data?.tokens?.access) {
          localStorage.setItem("access", data.data.tokens.access);
          console.log("✅ Access token stored");
        }
        if (data.data?.tokens?.refresh) {
          localStorage.setItem("refresh", data.data.tokens.refresh);
          console.log("✅ Refresh token stored");
        }

        router.push("/register/register2/register3/register4/register5");
      } else {
        toast.error(data.message || data.errors || "Invalid OTP");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    setIsResending(true);

    try {
      const res = await fetch(`${BASE_URL}/api/accounts/resend-verification/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail.trim() }),
      });
      const data = await res.json();

      console.log("Resend Response:", data);

      // Check for success
      if (data.success === true || data.statusCode === 200) {
        setShowAlert(true);
        setResendCooldown(30);
        toast.success("OTP resent successfully!");

        // Auto-hide alert after 5 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend Error:", error);
      toast.error("Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      {/* Breadcrumb Navigation */}
      <motion.div
        className="max-w-[803px] mx-auto mb-6"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <nav className="flex items-center space-x-2 text-sm">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <Link
            href="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Register
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Email Verification
          </span>
        </nav>

        {/* Step Indicator */}
        <div className="mt-4 flex items-center justify-center space-x-2 overflow-x-auto pb-2">
          <div className="flex items-center flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm">
              ✓
            </div>
            <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Personal Info
            </span>
          </div>
          <div className="w-8 sm:w-12 h-0.5 bg-green-600 mx-1 sm:mx-2 flex-shrink-0"></div>
          <div className="flex items-center flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm">
              ✓
            </div>
            <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Marketing
            </span>
          </div>
          <div className="w-8 sm:w-12 h-0.5 bg-green-600 mx-1 sm:mx-2 flex-shrink-0"></div>
          <div className="flex items-center flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm">
              ✓
            </div>
            <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Account
            </span>
          </div>
          <div className="w-8 sm:w-12 h-0.5 bg-blue-600 mx-1 sm:mx-2 flex-shrink-0"></div>
          <div className="flex items-center flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
              4
            </div>
            <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Verify Email
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Form Card */}
      <motion.div
        className="w-full max-w-[803px] mx-auto mt-6 lg:shadow-2xl bg-white dark:bg-gray-800 relative pb-10 rounded-xl overflow-hidden"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <div className="w-full h-[50px]">
          <Image
            src={"/register2.png"}
            width={802}
            height={50}
            alt="header_Image"
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <div className="px-4 sm:px-6 md:px-8">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mt-6 sm:mt-8 md:mt-10 montserrat-text text-center mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">
            We need to verify your email
          </h1>
          <h3 className="text-center text-sm sm:text-base md:text-lg mt-2 montserrat-text mb-6 text-gray-700 dark:text-gray-300 px-2">
            Check your inbox at <span className="font-bold text-blue-600 dark:text-blue-400">{userEmail}</span> and
            enter the OTP code
            <br className="hidden sm:block" /> to verify your account.
          </h3>

          <div className="flex flex-col justify-center items-center gap-4">
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              value={otp}
              onChange={(value) => setOtp(value)}
              className="dark:text-gray-100"
            >
              <InputOTPGroup className="gap-2">
                <InputOTPSlot
                  index={0}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
                <InputOTPSlot
                  index={1}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
                <InputOTPSlot
                  index={2}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
                <InputOTPSlot
                  index={3}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
                <InputOTPSlot
                  index={4}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
                <InputOTPSlot
                  index={5}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
              </InputOTPGroup>
            </InputOTP>

            <Button
              onClick={handleOtpVerify}
              disabled={isVerifying || otp.length !== 6}
              className="bg-blue-900 dark:bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-600 text-white px-6 sm:px-8 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isVerifying && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </div>

          {showAlert && (
            <Alert
              className={`w-[90%] lg:w-[600px] mx-auto mt-6 border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-900/20 transition-opacity duration-500 ${
                showAlert ? "opacity-100" : "opacity-0"
              }`}
            >
              <AlertTitle className="text-green-800 dark:text-green-400">
                OTP Resent Successfully!
              </AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-300">
                A new OTP has been sent to your email. Please check your inbox.
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-8 text-center">
            <h1 className="text-base sm:text-lg text-gray-900 dark:text-gray-100">
              Didn't receive the code?
            </h1>
            <h3 className="text-sm sm:text-base md:text-lg mt-1 mb-4 text-gray-700 dark:text-gray-300 px-2">
              Use the button to resend or check your junk folder.
            </h3>
            <Button
              className="cursor-pointer dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
              variant="outline"
              onClick={handleResend}
              disabled={isResending || resendCooldown > 0}
            >
              {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
            </Button>
          </div>
        </div>
      </motion.div>

      <hr className="border-blue-800 dark:border-blue-600 border-[3px] w-full max-w-[802px] mx-auto mt-6" />
    </div>
  );
};

export default Register4;
