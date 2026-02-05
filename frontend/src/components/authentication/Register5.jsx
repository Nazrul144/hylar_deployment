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
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SignupContext } from "../../providers/SignupProvider";

const formSchema = z.object({
  employment_status: z.string().min(1, { message: "Select any one" }),
  job_details: z.string().min(1, { message: "Select any one" }),
  employer: z.string().min(1, { message: "Select any one" }),
});

const Register5 = () => {
  const router = useRouter();
  const { setUserProfile } = useContext(SignupContext);

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
      employment_status: "employed",
      job_details: "nhs",
      employer: "education",
    },
  });

  const handleFormSubmit = (data) => {
    // ✅ FIXED: Map frontend field names to backend API field names
    const mappedData = {
      employer_status: data.employment_status,  // Backend expects "employer_status"
      employer_type: data.employer,              // Backend expects "employer_type"
      job_details: data.job_details,             // This stays the same
    };

    console.log("📤 Saving to userProfile:", mappedData);

    setUserProfile((prev) => ({
      ...prev,
      ...mappedData,
    }));
    
    router.push("/register/register2/register3/register4/register5/register6");
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
            Employment Details
          </span>
        </nav>

        {/* Step Indicator */}
        <div className="mt-4 flex items-center justify-center space-x-2 overflow-x-auto pb-2">
          <div className="flex items-center flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm">
              ✓
            </div>
            <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Personal
            </span>
          </div>
          <div className="w-6 sm:w-8 h-0.5 bg-green-600 mx-1 flex-shrink-0"></div>
          <div className="flex items-center flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm">
              ✓
            </div>
            <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Marketing
            </span>
          </div>
          <div className="w-6 sm:w-8 h-0.5 bg-green-600 mx-1 flex-shrink-0"></div>
          <div className="flex items-center flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm">
              ✓
            </div>
            <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Account
            </span>
          </div>
          <div className="w-6 sm:w-8 h-0.5 bg-green-600 mx-1 flex-shrink-0"></div>
          <div className="flex items-center flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm">
              ✓
            </div>
            <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Verify
            </span>
          </div>
          <div className="w-6 sm:w-8 h-0.5 bg-blue-600 mx-1 flex-shrink-0"></div>
          <div className="flex items-center flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
              5
            </div>
            <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Employment
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
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl common-text mt-6 sm:mt-8 md:mt-10 montserrat-text text-center mb-4 sm:mb-5 text-gray-900 dark:text-gray-100">
            Tell us where you work
          </h1>
          <h3 className="text-center text-sm sm:text-base md:text-lg montserrat-text mb-6 text-gray-700 dark:text-gray-300 px-2">
            Enter your employment details and job title so we can confirm <br className="hidden sm:block" />
            you're eligible.
          </h3>

          <div className="max-w-2xl mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                {/* EMPLOYMENT STATUS */}
                <div>
                  <FormField
                    control={form.control}
                    name="employment_status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="common-text font-bold text-gray-900 dark:text-gray-100">
                          EMPLOYMENT STATUS
                        </FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2.5 sm:p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                          >
                            <option value="employed">Employed</option>
                            <option value="retired">Retired</option>
                            <option value="volunteer">Volunteer</option>
                          </select>
                        </FormControl>
                        <FormMessage className="dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* EMPLOYER */}
                <div>
                  <FormField
                    control={form.control}
                    name="employer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="common-text font-bold text-gray-900 dark:text-gray-100">
                          EMPLOYER
                        </FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2.5 sm:p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                          >
                            <option value="ambulance_service">
                              Ambulance Service
                            </option>
                            <option value="fire_service">Fire Service</option>
                            <option value="hm_coastguard">HM Coastguard</option>
                            <option value="independent_lifeboat">
                              Independent Lifeboat
                            </option>
                            <option value="nhs">NHS</option>
                            <option value="armed_force">Armed Force</option>
                            <option value="police">Police</option>
                            <option value="tech">Tech</option>
                            <option value="essential_retail">
                              Essential Retail
                            </option>
                            <option value="childcare">Childcare</option>
                            <option value="education">Education</option>
                            <option value="red_cross">Red Cross</option>
                            <option value="rnli">RNLI</option>
                            <option value="search_and_rescue">
                              Search and Rescue
                            </option>
                          </select>
                        </FormControl>
                        <FormMessage className="dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* JOB DETAILS */}
                <div>
                  <FormField
                    control={form.control}
                    name="job_details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="common-text font-bold text-gray-900 dark:text-gray-100">
                          JOB DETAILS
                        </FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2.5 sm:p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                          >
                            <option value="nhs">NHS</option>
                            <option value="armed_force">Armed Force</option>
                            <option value="police">Police</option>
                            <option value="fire_service">Fire Service</option>
                            <option value="tech">Tech</option>
                            <option value="essential_retail">
                              Essential Retail
                            </option>
                            <option value="childcare">Childcare</option>
                            <option value="education">Education</option>
                            <option value="ambulance_service">
                              Ambulance Service
                            </option>
                            <option value="apha">Apha</option>
                            <option value="blood_bike">Blood Bike</option>
                            <option value="dental_practice">
                              Dental Practice
                            </option>
                          </select>
                        </FormControl>
                        <FormMessage className="dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  className="w-full mt-6 bg-blue-900 dark:bg-blue-700 text-white hover:bg-blue-800 dark:hover:bg-blue-600 cursor-pointer"
                  type="submit"
                >
                  Next
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </motion.div>

      <hr className="border-blue-800 dark:border-blue-600 border-[3px] w-full max-w-[802px] mx-auto mt-6" />
    </div>
  );
};

export default Register5;
