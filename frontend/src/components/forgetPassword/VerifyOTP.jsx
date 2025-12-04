"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext} from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/config";
import { PasswordContext } from "../../providers/PasswordProvider";

const VerifyOTP = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const [showAlert, setShowAlert] = useState(false);

  const {passInfo} = useContext(PasswordContext) 

  // Countdown for resend OTP
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => setResendCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Verify OTP
  const handleOtpVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    setIsVerifying(true);
    try {
      const res = await fetch(`${BASE_URL}/api/accounts/otp-validation/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: passInfo.email.trim(), code: otp.trim() }),
      });

      const result = await res.json();
      console.log("Verify Response:", result);

      if (result.status === "success" && result.status_code === 200) {
        Swal.fire({
          title: "Email Verified Successfully",
          text: 'Click "OK" to continue.',
          icon: "success",
          confirmButtonColor: "#16a34a",
          confirmButtonText: "OK",
        });

        localStorage.setItem("access_token", result.data?.access_token || "");
        localStorage.setItem("refresh_token", result.data?.refresh_token || "");

        router.push("/forgotpass/verifyopt/createpass");
      } else {
        toast.error(result.detail || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify OTP");
    } finally {
      setIsVerifying(false);
    }
  };

 // Resend OTP
const handleResendOtp = async () => {
  if (!passInfo?.email) {
    toast.error("No email found. Please go back and enter your email.");
    return;
  }

  setIsResending(true);

  try {
    const res = await fetch(`${BASE_URL}/api/accounts/forget-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: passInfo.email.trim(), 
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("OTP Resend successfully!");
      setResendCooldown(30); 
    } else {
      toast.error(data.detail || "Failed to resend OTP");
    }
  } catch (error) {
    console.error("Error calling API:", error);
    toast.error("Network error. Please try again.");
  } finally {
    setIsResending(false);
  }
};


  return (
    <div>
      <div className="lg:flex md:flex mt-12 justify-center mx-auto gap-6 bg-white dark:bg-gray-900 w-[820px] p-2 shadow-2xl rounded-lg">
        {/* Image Section */}
        <div className="relative h-[600px] w-96">
          <Image
            src="/forgetPassword/1.png"
            alt="forgotPassword"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 grid place-items-center ml-14">
            <h1 className="z-10 text-3xl font-bold text-white drop-shadow-lg">
              Welcome Back
              <hr className="border-t-1 border-[#7BB662] w-66 mt-2" />
              <span className="text-sm text-gray-400">
                We sent a 6-digit code to you***@example.com. Enter it below to
                continue.
              </span>
            </h1>
            <h3 className="absolute bottom-10 text-white mr-8">
              Log in to your MaximumSavings account.
            </h3>
          </div>
          <div className="absolute inset-0 rounded-lg bg-black/30" />
        </div>

        {/* OTP Form Section */}
        <div className="h-[600px] w-96">
          <div className="w-full max-w-md p-8 space-y-3 text-gray-900 dark:text-gray-100 h-full">
            <h1 className="montserrat-text common-text text-xl font-bold dark:text-white">
              Account
            </h1>
            <h1 className="text-black font-bold text-3xl dark:text-white">Verify OTP</h1>
            <p className="text-gray-600 text-justify text-sm mb-12 dark:text-gray-400">
              Enter the 6-digit code we sent to your email address to verify it's you.
            </p>

            {/* OTP INPUT */}
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup className="text-black dark:text-white">
                  {[...Array(6)].map((_, i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="dark:bg-gray-800 dark:text-white"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleOtpVerify}
              disabled={isVerifying}
              className="block w-full text-center rounded-sm text-white bg-[#00308F] h-12 cursor-pointer pt-3 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify
            </Button>

            {/* Alert Message */}
            {showAlert && (
              <Alert className="w-full mt-6 border-green-500 transition-opacity duration-500">
                <AlertTitle>Verification Sent!</AlertTitle>
                <AlertDescription>
                  A verification code has been sent to your email. Please check your inbox.
                </AlertDescription>
              </Alert>
            )}

            {/* Info Text */}
            <div className="flex items-center gap-2 mt-4">
              <div>
                <Image
                  src={"/forgetPassword/light.svg"}
                  width={20}
                  height={20}
                  alt="icon"
                />
              </div>
              <h2 className="text-black dark:text-gray-300 text-sm">
                Didn't get it? Check spam/promotions, or wait before resending.
              </h2>
            </div>

            {/* Resend OTP */}
            <Button
              type="button"
              className="w-full text-center mt-3"
              variant="outline"
              onClick={handleResendOtp}
              disabled={isResending || resendCooldown > 0}
            >
              {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
            </Button>

            {/* Footer Links */}
            <div className="flex justify-between mt-24 text-black dark:text-gray-300">
              <div className="common-text font-bold underline text-sm">
                <Link href={"/login"}>Back to Login</Link>
              </div>
              <div className="common-text font-bold text-sm">
                <Link href={"/"}>Need help? Contact support</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
