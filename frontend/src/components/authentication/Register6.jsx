"use client";
import Image from "next/image";
import React, { useContext } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
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
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Input } from "../ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SignupContext } from "../../providers/SignupProvider";
import toast from "react-hot-toast";

const formSchema = z.object({
  id_card_front_image: z.any().refine((files) => files && files.length > 0, {
    message: "Front part of ID is required",
  }),
  id_card_back_image: z.any().refine((files) => files && files.length > 0, {
    message: "Back part of ID is required",
  }),
});

const Register6 = () => {
  const router = useRouter();
  const { userProfile, setUserProfile } = useContext(SignupContext);

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
      id_card_front_image: undefined,
      id_card_back_image: undefined,
    },
  });

  const handleFormSubmit = (data) => {
    console.log("Uploaded files:", data);
    console.log("Front image:", data.id_card_front_image);
    console.log("Back image:", data.id_card_back_image);

    // Merge new data into global context
    setUserProfile((prev) => ({ ...prev, ...data }));

    router.push(
      "/register/register2/register3/register4/register5/register6/register7"
    );
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
            ID Verification
          </span>
        </nav>

        {/* Step Indicator */}
        <div className="mt-4 flex items-center justify-center space-x-1 sm:space-x-2 overflow-x-auto pb-2">
          <div className="flex items-center flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-xs sm:text-sm">
              ✓
            </div>
            <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap hidden sm:inline">
              Personal
            </span>
          </div>
          <div className="w-4 sm:w-6 h-0.5 bg-green-600 mx-0.5 sm:mx-1 flex-shrink-0"></div>
          <div className="flex items-center flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-xs sm:text-sm">
              ✓
            </div>
            <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap hidden sm:inline">
              Marketing
            </span>
          </div>
          <div className="w-4 sm:w-6 h-0.5 bg-green-600 mx-0.5 sm:mx-1 flex-shrink-0"></div>
          <div className="flex items-center flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-xs sm:text-sm">
              ✓
            </div>
            <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap hidden sm:inline">
              Account
            </span>
          </div>
          <div className="w-4 sm:w-6 h-0.5 bg-green-600 mx-0.5 sm:mx-1 flex-shrink-0"></div>
          <div className="flex items-center flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-xs sm:text-sm">
              ✓
            </div>
            <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap hidden sm:inline">
              Verify
            </span>
          </div>
          <div className="w-4 sm:w-6 h-0.5 bg-green-600 mx-0.5 sm:mx-1 flex-shrink-0"></div>
          <div className="flex items-center flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-xs sm:text-sm">
              ✓
            </div>
            <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap hidden sm:inline">
              Work
            </span>
          </div>
          <div className="w-4 sm:w-6 h-0.5 bg-blue-600 mx-0.5 sm:mx-1 flex-shrink-0"></div>
          <div className="flex items-center flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xs sm:text-sm">
              6
            </div>
            <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              ID Verify
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Form Card */}
      <motion.div
        className="w-full max-w-[803px] mx-auto mt-6 lg:shadow-2xl bg-white dark:bg-gray-800 relative rounded-xl overflow-hidden pb-8"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        {/* Header */}
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
          <h1 className="font-bold common-text text-2xl sm:text-3xl md:text-4xl mt-6 sm:mt-8 md:mt-12 montserrat-text text-center text-gray-900 dark:text-gray-100">
            Upload ID For Verification
          </h1>
          <h3 className="text-center text-sm sm:text-base md:text-lg mt-2 montserrat-text text-gray-700 dark:text-gray-300">
            Please complete the following to start saving
          </h3>

          {/* Example NID Images */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center sm:justify-between gap-4 sm:gap-6 items-center lg:px-8 xl:px-20">
            <div className="flex flex-col items-center">
              <Image
                src={"/NID.png"}
                width={200}
                height={200}
                alt="NID Front"
                className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-lg shadow-md"
                priority
              />
              <p className="text-xs sm:text-sm mt-2 text-gray-600 dark:text-gray-400 font-medium">
                Front Side
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={"/NID.png"}
                width={200}
                height={200}
                alt="NID Back"
                className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-lg shadow-md"
                priority
              />
              <p className="text-xs sm:text-sm mt-2 text-gray-600 dark:text-gray-400 font-medium">
                Back Side
              </p>
            </div>
          </div>

          {/* Upload Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-6 mt-6"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-6">
                {/* Front Side Upload */}
                <div className="w-full sm:w-1/2">
                  <FormField
                    control={form.control}
                    name="id_card_front_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-red-700 dark:text-red-400 italic font-medium">
                          Upload Front Side of Your ID
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            className="cursor-pointer dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-900 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              const backFile = form.getValues("id_card_back_image");

                              if (backFile && file?.name === backFile[0]?.name) {
                                toast.error(
                                  "You have already uploaded this file as back side."
                                );
                                e.target.value = "";
                                return;
                              }

                              field.onChange(e.target.files);
                              console.log("Front image selected:", file);
                            }}
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Back Side Upload */}
                <div className="w-full sm:w-1/2">
                  <FormField
                    control={form.control}
                    name="id_card_back_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-red-700 dark:text-red-400 italic font-medium">
                          Upload Back Side of Your ID
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            className="cursor-pointer dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-900 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              const frontFile = form.getValues("id_card_front_image");

                              if (frontFile && file?.name === frontFile[0]?.name) {
                                toast.error(
                                  "You have already uploaded this file as front side."
                                );
                                e.target.value = "";
                                return;
                              }

                              field.onChange(e.target.files);
                              console.log("Back image selected:", file);
                            }}
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-center sm:justify-end mt-6">
                <Button
                  type="submit"
                  className="common-bg dark:bg-blue-700 dark:hover:bg-blue-600 py-2.5 px-5 rounded-lg text-white w-28 h-11 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span className="text-lg font-semibold">Next</span>
                  <MdKeyboardDoubleArrowRight className="text-2xl mt-1" />
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

export default Register6;