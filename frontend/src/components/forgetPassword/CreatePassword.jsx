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
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { BASE_URL } from "../../config/config";
import { useContext } from "react";
import { PasswordContext } from "../../providers/PasswordProvider";



// ✅ Zod schema
const formSchema = z
  .object({
    
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "One uppercase letter required" })
      .regex(/[a-z]/, { message: "One lowercase letter required" })
      .regex(/[0-9]/, { message: "One number required" })
      .regex(/[^A-Za-z0-9]/, { message: "One symbol required" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const CreatePassword = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // email: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {passInfo} =  useContext(PasswordContext)
  const router = useRouter()
  console.log(passInfo)

  const onSubmit = async (values) => {
    try {
      const res = await fetch(`${BASE_URL}/api/accounts/reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: passInfo.email,
          password: values.newPassword,
          confirm_password: values.confirmPassword,
        }),
      });

      const data = await res.json();
      console.log("Reset Password Response:", data);

      if (res.ok) {
        Swal.fire({
          title: "Password Updated Successfully!",
          text: `Password for ${passInfo.email} has been updated.`,
          icon: "success",
        });
        form.reset(); 
        router.push("/login")
      } else {
        toast.error(data.detail || "Failed to update password");
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      toast.error("Network error. Please try again.");
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
              Set a New <br /> Password
              <hr className="border-t-1 border-[#7BB662] w-66 mt-2" />
              <span className="text-sm text-gray-400">
                Create a strong password to secure your <br /> MaximumSavings
                account.
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
            <h1 className="text-black font-bold text-3xl dark:text-white">
              Create New Password
            </h1>
            <p className="text-gray-600 text-sm mb-6 dark:text-gray-400">
              Use at least 8 characters. A mix of upper & lower case letters,
              numbers, and symbols makes it stronger.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* ✅ Email Field */}
                {/* <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="relative w-80">
                      <FormLabel className="absolute -top-2 left-3 px-1 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="w-full h-12 rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-800 dark:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                /> */}

                {/* New Password */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="relative w-80">
                      <FormLabel className="absolute -top-2 left-3 px-1 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="********"
                          className="w-full h-12 rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-800 dark:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="relative w-80">
                      <FormLabel className="absolute -top-2 left-3 px-1 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="********"
                          className="w-full h-12 rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-800 dark:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  className="block w-full text-center rounded-sm text-white bg-[#00308F] h-12 cursor-pointer hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  Update Password
                </Button>
              </form>
            </Form>

            <div className="flex justify-between mt-6 text-black dark:text-gray-300">
              <Link href={"/login"} className="font-bold underline text-sm">
                Back to Login
              </Link>
              <Link href={"/"} className="font-bold text-sm">
                Need help? Contact support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
