"use client";
import Image from "next/image";
import React, { useContext } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { SignupContext } from "../../providers/SignupProvider";

// Zod schema: at least one must be true
const formSchema = z
  .object({
    agreed_to_push_marketing: z.boolean(),
    agreed_to_email_marketing: z.boolean(),
    agreed_to_sms_marketing: z.boolean(),
  })
  .refine(
    (data) => data.agreed_to_push_marketing || data.agreed_to_email_marketing || data.agreed_to_sms_marketing,
    {
      message: "At least one option must be selected",
      path: ["generalError"], // attach to a virtual field
    }
  );

const Register2 = () => {
  const router = useRouter();
  const { signupData, setSignupData } = useContext(SignupContext);

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
      agreed_to_push_marketing: false,
      agreed_to_email_marketing: false,
      agreed_to_sms_marketing: false,
    },
  });

  const handleFormSubmit = (data) => {
    data;
    setSignupData((prev) => ({ ...prev, ...data }));
    router.push("/register/register2/register3");
  };

  // General error message from virtual field
  const generalError = form.formState.errors?.generalError?.message;

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
            Marketing Preferences
          </span>
        </nav>

        {/* Step Indicator */}
        <div className="mt-4 flex items-center justify-center space-x-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm">
              ✓
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Personal Info
            </span>
          </div>
          <div className="w-12 h-0.5 bg-blue-600 mx-2"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
              2
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Marketing Preferences
            </span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300 dark:bg-gray-600 mx-2"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 flex items-center justify-center font-semibold text-sm">
              3
            </div>
            <span className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">
              Additional Details
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Form Card */}
      <motion.div
        className="w-full max-w-[803px] mx-auto mt-6 lg:shadow-2xl p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-800 relative rounded-xl"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <div className="w-full h-[100px] sm:h-[120px] md:h-[150px] mb-6">
          <Image
            src={"/register2.png"}
            width={802}
            height={150}
            alt="header_Image"
            className="rounded-t-xl w-full h-full object-cover"
            priority
          />
        </div>

        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-2 montserrat-text text-gray-900 dark:text-gray-100">
          Marketing Preferences
        </h1>
        <p className="text-center text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6 px-2">
          Can we contact you with promotions and updates to help you get the
          most out of your Blue Light Card?
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            {/* Show general error above checkboxes */}
            {generalError && (
              <p className="text-red-600 dark:text-red-400 mb-4 font-medium text-center sm:text-left sm:ml-8">
                {generalError}
              </p>
            )}

            <div className="flex flex-col gap-4 items-start ml-4 sm:ml-8">
              {[
                { name: "agreed_to_push_marketing", label: "Push Notification" },
                { name: "agreed_to_email_marketing", label: "Email Update" },
                { name: "agreed_to_sms_marketing", label: "SMS Update" },
              ].map((opt) => (
                <FormField
                  key={opt.name}
                  control={form.control}
                  name={opt.name}
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="w-5 h-5 accent-blue-600 cursor-pointer"
                        />
                      </FormControl>
                      <FormLabel className="ml-2 text-gray-900 dark:text-gray-100 cursor-pointer">
                        {opt.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="flex justify-center sm:justify-end mt-8">
              <Button
                className="bg-blue-900 dark:bg-blue-700 text-white px-6 py-2 rounded-xl hover:bg-blue-800 dark:hover:bg-blue-600 transition-all cursor-pointer"
                type="submit"
              >
                Next {">>"}
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
      
      <hr className="border-blue-800 dark:border-blue-600 border-[3px] w-full max-w-[802px] mx-auto mt-6" />
    </div>
  );
};

export default Register2;