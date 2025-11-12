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
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

// Zod schema
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Enter a valid email address" }),
});

const ForgotPassword = () => {

  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values) => {
    console.log("Form submitted:", values);
    // You can navigate or call API here
    router.push("/forgotpass/verifyopt")
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
                Reset your password securely and get back to unlocking
                MaximumSavings.
              </span>
            </h1>
            <h3 className="absolute bottom-10 text-white mr-8">
              Log in to your MaximumSavings account.
            </h3>
          </div>
          <div className="absolute inset-0 rounded-lg bg-black/30" />
        </div>

        {/* Form Section */}
        <div className="h-[600px] w-96">
          <div className="w-full max-w-md p-8 space-y-3 text-gray-900 dark:text-gray-100 h-full">
            <h1 className="montserrat-text common-text text-xl font-bold dark:text-white">
              Account
            </h1>
            <h1 className="text-black font-bold text-3xl dark:text-white">
              Forgot Password
            </h1>
            <p className="text-gray-600 text-justify text-sm mb-12 dark:text-gray-400">
              Enter the email you used to create your account. We'll send you a
              secure link to reset your password.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="relative w-80">
                      <FormLabel className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-300">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="w-full h-12 rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-800"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="block pt-3 w-full text-center rounded-sm text-white bg-[#00308F] h-12 cursor-pointer hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  Send OTP Code
                </Button>

                {/* Info / Hint */}
                <div className="flex items-center gap-2">
                  <Image
                    src={"/forgetPassword/light.svg"}
                    width={20}
                    height={20}
                    alt="Image"
                  />
                  <h3 className="text-gray-500 text-sm dark:text-gray-300">
                    Didn't get it? Check spam/promotions, or wait a moment
                    before resending.
                  </h3>
                </div>
              </form>
            </Form>

            {/* Footer Links */}
            <div className="flex justify-between mt-38 text-black dark:text-gray-300">
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

export default ForgotPassword;
