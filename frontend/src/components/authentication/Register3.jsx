"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SignupContext } from "../../providers/SignupProvider";
import { Checkbox } from "../ui/checkbox";
import { BASE_URL } from "../../config/config";

const formSchema = z
  .object({
    agreed_to_terms_and_conditions: z.boolean().refine((val) => val === true, {
      message:
        "You must agree to the agreed_to_terms_and_conditions & Conditions",
    }),

    agreed_to_policy: z.boolean().refine((val) => val === true, {
      message: "You must agree to the policy",
    }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password must not exceed 32 characters" })
      .regex(/[A-Z]/, { message: "At least one uppercase letter" })
      .regex(/[a-z]/, { message: "At least one lowercase letter" })
      .regex(/[0-9]/, { message: "At least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "At least one special character" }),

    confirm_password: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        path: ["confirm_password"],
        message: "Passwords do not match",
      });
    }
  });

const Register3 = () => {
  const router = useRouter();
  const { signupData } = useContext(SignupContext);

  console.log("signupData", signupData)

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: custom * 0.1 },
    }),
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
      agreed_to_terms_and_conditions: false,
      agreed_to_policy: false,
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      const formattedDate =
        signupData.date_of_birth instanceof Date
          ? signupData.date_of_birth.toISOString().slice(0, 10)
          : typeof signupData.date_of_birth === "string"
            ? signupData.date_of_birth.slice(0, 10)
            : "";

      const allData = {
        ...signupData,
        ...data,
        date_of_birth: formattedDate,
      };

      const res = await fetch(`${BASE_URL}/api/accounts/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allData),
      });

      const result = await res.json();
      if (result.status_code === 400) {
        toast.error("User already exists!");
        return;
      }
      if (result.status_code === 201 || result.status_code === 200) {
        router.push("/register/register2/register3/register4");
      }
    } catch (error) {
      console.log(error);
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
            Create Account
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
          <div className="w-8 sm:w-12 h-0.5 bg-blue-600 mx-1 sm:mx-2 flex-shrink-0"></div>
          <div className="flex items-center flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
              3
            </div>
            <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Create Account
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Form Card */}
      <motion.div
        className="w-full max-w-[803px] mx-auto mt-6 lg:shadow-2xl bg-white dark:bg-gray-800 relative rounded-xl overflow-hidden"
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
        
        <div className="p-4 sm:p-6 md:p-8">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mt-6 sm:mt-8 md:mt-12 montserrat-text text-center text-gray-900 dark:text-gray-100">
            Create your account
          </h1>
          <h3 className="text-center text-sm sm:text-base md:text-lg mt-2 montserrat-text text-gray-700 dark:text-gray-300">
            Now enter a secure password for <br className="hidden sm:block" /> your account
          </h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
              <div className="w-full max-w-96 mx-auto mt-8 sm:mt-10 md:mt-12 space-y-6 sm:space-y-8">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="relative">
                        <Label className="absolute -top-2 left-3 bg-white dark:bg-gray-800 px-1 text-sm text-blue-600 dark:text-blue-400">
                          Password
                        </Label>

                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="rounded-md border border-blue-400 dark:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0 pr-10 text-gray-900 dark:text-gray-100 dark:bg-gray-700"
                        />

                        <span
                          className="absolute right-3 top-3 cursor-pointer text-gray-600 dark:text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="relative">
                        <Label className="absolute -top-2 left-3 bg-white dark:bg-gray-800 px-1 text-sm text-blue-600 dark:text-blue-400">
                          Confirm Password
                        </Label>

                        <Input
                          type={showConfirm ? "text" : "password"}
                          {...field}
                          className="rounded-md border border-blue-400 dark:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0 pr-10 text-gray-900 dark:text-gray-100 dark:bg-gray-700"
                        />

                        <span
                          className="absolute right-3 top-3 cursor-pointer text-gray-600 dark:text-gray-400"
                          onClick={() => setShowConfirm(!showConfirm)}
                        >
                          {showConfirm ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agreed_to_terms_and_conditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-start gap-3 mt-4">
                          <Checkbox
                            id="agreed_to_terms_and_conditions"
                            onCheckedChange={field.onChange}
                            checked={field.value}
                            className="mt-1"
                          />
                          <Label 
                            htmlFor="agreed_to_terms_and_conditions"
                            className="text-gray-900 dark:text-gray-100 cursor-pointer text-sm sm:text-base"
                          >
                            I agree to the{" "}
                            <Link
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                              href="/term_condition"
                            >
                              Terms & Conditions
                            </Link>
                          </Label>
                        </div>
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agreed_to_policy"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id="agreed_to_policy"
                            onCheckedChange={field.onChange}
                            checked={field.value}
                            className="mt-1"
                          />
                          <Label 
                            htmlFor="agreed_to_policy"
                            className="text-gray-900 dark:text-gray-100 cursor-pointer text-sm sm:text-base"
                          >
                            I agree to the{" "}
                            <Link
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                              href="/privacy"
                            >
                              Privacy Policy
                            </Link>
                          </Label>
                        </div>
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="mt-8 w-full bg-blue-900 dark:bg-blue-700 text-white hover:bg-blue-800 dark:hover:bg-blue-600 cursor-pointer"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
      
      <hr className="border-blue-800 dark:border-blue-600 border-[3px] w-full max-w-[802px] mx-auto mt-6" />
    </div>
  );
};

export default Register3;