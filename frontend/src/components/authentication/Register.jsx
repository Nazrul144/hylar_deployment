"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDownIcon, ChevronRight } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useRouter } from "next/navigation";
import { SignupContext } from "../../providers/SignupProvider";

const formSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First Name Should be at least 2 character" })
    .max(50),
  last_name: z
    .string()
    .min(2, { message: "Last Name Should be at least 2 character" })
    .max(50),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  date_of_birth: z.date().refine(
    (val) => {
      if (!val) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return val < today;
    },
    {
      message: "Date of birth cannot be in the future",
    }
  ),
  mobile_number: z
    .string()
    .trim()
    .regex(/^(07|\+447|00447)\d{9}$/, {
      message: "Invalid UK phone number format",
    }),
});

const Register = () => {
  const router = useRouter();

  const { setSignupData } = useContext(SignupContext);

  const [open, setOpen] = useState(false);
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
      first_name: "",
      last_name: "",
      email: "",
      date_of_birth: null,
      mobile_number: "",
    },
  });

  const handleFormSubmit = (data) => {
    data;
    setSignupData(data);
    router.push("/register/register2");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      {/* Breadcrumb Navigation */}
      <motion.div
        className="max-w-[820px] mx-auto mb-6"
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
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Register
          </span>
        </nav>

        {/* Step Indicator */}
        <div className="mt-4 flex items-center justify-center space-x-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
              1
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Personal Info
            </span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300 dark:bg-gray-600 mx-2"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 flex items-center justify-center font-semibold text-sm">
              2
            </div>
            <span className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">
              Additional Details
            </span>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row mt-6 justify-center mx-auto gap-6 bg-white dark:bg-gray-800 w-full max-w-[820px] p-2 shadow-2xl rounded-lg">
        {/*Image div*/}
        <motion.div
          className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full lg:w-96 rounded-lg overflow-hidden"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          <Image
            src="/login.JPG"
            alt="Register_Image"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <h1 className="z-10 text-2xl sm:text-3xl font-bold text-white drop-shadow-lg text-center">
              Create your account
            </h1>
            <h3 className="text-white mt-4 text-center text-sm sm:text-base px-2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </h3>
          </div>
          <h4 className="text-white absolute bottom-4 text-xs sm:text-sm left-4 sm:left-12">
            Log in to your <span className="font-bold">MaximumSavings</span>{" "}
            account.
          </h4>

          <div className="absolute inset-0 rounded-lg bg-black/30" />
        </motion.div>

        {/*Register form div*/}
        <motion.div
          className="w-full lg:w-96"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
        >
          <div className="w-full max-w-md p-4 sm:p-8 space-y-3 h-full">
            <h1 className="montserrat-text text-center common-text text-3xl sm:text-5xl font-bold mb-6 sm:mb-10 text-gray-900 dark:text-white">
              Register
            </h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="space-y-4 sm:space-y-6"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <div className="relative">
                            <Label className="absolute -top-2 left-3 bg-white dark:bg-gray-800 px-1 text-sm text-blue-600 dark:text-blue-400">
                              First Name
                            </Label>
                            <Input
                              {...field}
                              className="rounded-md border border-blue-400 dark:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0 text-black dark:text-white dark:bg-gray-700"
                            />
                          </div>
                          <FormMessage className="dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <div className="relative">
                            <Label className="absolute -top-2 left-3 bg-white dark:bg-gray-800 px-1 text-sm text-blue-600 dark:text-blue-400">
                              Last Name
                            </Label>
                            <Input
                              {...field}
                              className="rounded-md border border-blue-400 dark:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0 text-black dark:text-white dark:bg-gray-700"
                            />
                          </div>
                          <FormMessage className="dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="relative">
                        <Label className="absolute -top-2 left-3 bg-white dark:bg-gray-800 px-1 text-sm text-blue-600 dark:text-blue-400">
                          Email
                        </Label>
                        <Input
                          {...field}
                          className="rounded-md border border-blue-400 dark:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0 text-black dark:text-white dark:bg-gray-700"
                        />
                      </div>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Date of Birth
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-3">
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                id="date_of_birth"
                                className="w-full justify-between font-normal border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                              >
                                {field.value
                                  ? new Date(field.value).toLocaleDateString()
                                  : "Select date of birth"}

                                <ChevronDownIcon className="text-gray-500 dark:text-gray-400" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0 bg-white dark:bg-gray-800"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date_of_birth) => {
                                  field.onChange(date_of_birth);
                                  setOpen(false);
                                }}
                                captionLayout="dropdown"
                                fromYear={1950}
                                toYear={new Date().getFullYear()}
                                disabled={(date) => date > new Date()}
                                className="dark:text-white"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobile_number"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="relative">
                        <Label className="absolute -top-2 left-3 bg-white dark:bg-gray-800 px-1 text-sm text-blue-600 dark:text-blue-400">
                          Mobile Number
                        </Label>
                        <Input
                          {...field}
                          placeholder="+44 XXX XXX XXX"
                          className="rounded-md border border-blue-400 dark:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0 text-black dark:text-white dark:bg-gray-700"
                          onChange={(e) => {
                            let value = e.target.value;
                            // If user types without +, add it automatically
                            if (value && !value.startsWith("+")) {
                              value = "+" + value;
                            }
                            field.onChange(value);
                          }}
                        />
                      </div>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full bg-blue-900 dark:bg-blue-700 text-white hover:bg-blue-800 dark:hover:bg-blue-600 cursor-pointer"
                  type="submit"
                >
                  Continue
                </Button>
              </form>
            </Form>

            <motion.p
              className="text-xs text-center sm:px-6 text-gray-800 dark:text-gray-300"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={7}
            >
              Already have an account?
              <Link
                href={"/login"}
                className="underline font-bold common-text montserrat-text text-blue-600 dark:text-blue-400"
              >
                {" "}
                Log in
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;