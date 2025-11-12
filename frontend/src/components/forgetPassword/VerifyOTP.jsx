"use client";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "Enter 6-digit OTP" })
    .max(6, { message: "Enter 6-digit OTP" }),
});

const VerifyOTP = () => {

  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: "" },
  });

  const onSubmit = (values) => {
    console.log("OTP submitted:", values);
    // ✅ Now this will log correctly
    // 👉 You can navigate manually after validation
    router.push('/forgotpass/verifyotp/createpass')
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
              Enter the 6-digit code we sent to your email address to verify
              it's you.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* OTP Field */}
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="flex justify-center">
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                          value={field.value}
                          onChange={(val) => field.onChange(val)}
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
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="block w-full text-center rounded-sm text-white bg-[#00308F] h-12 cursor-pointer pt-3 
                             hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  Send OTP Code
                </Button>

                {/* Hint / Info */}
                <div className="flex items-center gap-2">
                  <div>
                    <Image
                      src={"/forgetPassword/light.svg"}
                      width={20}
                      height={20}
                      alt="Image"
                    />
                  </div>
                  <div>
                    <h2 className="text-black dark:text-gray-300">
                      <span className="text-sm">
                        Didn't get it? Check spam/promotions, or wait a moment
                        before resending.
                      </span>
                    </h2>
                  </div>
                </div>
              </form>
            </Form>

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
