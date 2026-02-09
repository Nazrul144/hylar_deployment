"use client";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
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
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Select from "react-select";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { SignupContext } from "../../providers/SignupProvider";
import countryList from "react-select-country-list";
import { BASE_URL } from "../../config/config";
import toast from "react-hot-toast";
import { UserContext } from "../../providers/UserProvider";

const formSchema = z.object({
  address_line1: z
    .string()
    .min(2, { message: "Please enter a valid address line 1" })
    .max(150),
  address_line2: z.string().optional(),
  city: z
    .string()
    .min(2, { message: "Please provide a valid city or city name" })
    .max(150),
  country: z
    .string()
    .min(2, { message: "Please specify a valid country name" })
    .max(150),
  postcode: z
    .string()
    .min(2, { message: "Please enter a valid postal or ZIP code" })
    .max(150),
});

const Register7 = () => {
  const router = useRouter();
  const { userProfile, setUserProfile } = useContext(SignupContext);
  const { setUser } = useContext(UserContext);
  const countries = countryList().getData();

  useEffect(() => {
    if (Object.keys(userProfile).length > 0) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile && Object.keys(userProfile).length === 0) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

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
      address_line1: "",
      address_line2: "",
      city: "",
      country: "United Kingdom",
      postcode: "",
    },
  });

  const handleFormSubmit = async (data) => {
    const finalProfileData = { ...userProfile, ...data };
    setUserProfile(finalProfileData);

    console.log("📤 Submitting profile data:", finalProfileData);

    try {
      const token = localStorage.getItem("access");
      console.log("🔑 Token:", token);

      if (!token || token === "undefined" || token === "null" || token.trim() === "") {
        toast.error("Authentication token not found. Please log in again.");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        router.push("/login");
        return;
      }

      const formData = new FormData();

      Object.entries(finalProfileData).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          return;
        }

        if (key === "id_card_front_image" || key === "id_card_back_image") {
          if (value instanceof File) {
            formData.append(key, value);
            console.log(`✅ Appended ${key} as File:`, value.name);
          } else if (value instanceof FileList && value.length > 0) {
            formData.append(key, value[0]);
            console.log(`✅ Appended ${key} from FileList:`, value[0].name);
          } else if (Array.isArray(value) && value[0] instanceof File) {
            formData.append(key, value[0]);
            console.log(`✅ Appended ${key} from Array:`, value[0].name);
          } else {
            console.warn(`⚠️ ${key} is not a valid file:`, value);
          }
        } else {
          formData.append(key, value.toString());
        }
      });

      console.log("📋 FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value);
      }

      const res = await fetch(`${BASE_URL}/api/accounts/complete-profile/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();
      console.log("📥 Response:", res.status, result);

      if (!res.ok) {
        if (res.status === 401) {
          const msg = result.detail || result.message || "Session expired. Please log in again.";
          toast.error(msg);
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          router.push("/login");
          return;
        }

        let errorMessages = [];

        if (result.detail) {
          errorMessages.push(result.detail);
        }

        if (result.errors) {
          Object.entries(result.errors).forEach(([field, value]) => {
            let message = value;
            if (Array.isArray(value)) {
              message = value.join(", ");
            } else if (typeof value === "string") {
              message = value;
            } else if (value && typeof value === "object") {
              message = JSON.stringify(value);
            }
            errorMessages.push(`${field}: ${message}`);
          });
          console.error("❌ Field errors:", result.errors);
        }

        if (result.non_field_errors) {
          const msg = Array.isArray(result.non_field_errors)
            ? result.non_field_errors.join(", ")
            : result.non_field_errors;
          errorMessages.push(msg);
        }

        if (errorMessages.length === 0) {
          errorMessages.push(
            result.message || "Failed to update profile. Please try again."
          );
        }

        errorMessages.forEach((msg) => toast.error(msg));
        return;
      }

      setUser(result.data);
      localStorage.removeItem("userProfile");
      setUserProfile({});
      toast.success("Profile completed successfully!");

      console.log("✅ Profile completed, redirecting...");
      
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('storage'));
      }

      router.push("/register/register2/register3/register4/register5/register6/register7/register8");
    } catch (error) {
      console.error("❌ Profile submission error:", error);
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
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
            Delivery Address
          </span>
        </nav>

        <div className="mt-4 flex items-center justify-center space-x-1 overflow-x-auto pb-2">
          <div className="flex items-center shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-[10px] sm:text-xs">
              ✓
            </div>
          </div>
          <div className="w-3 sm:w-4 h-0.5 bg-green-600 shrink-0"></div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-[10px] sm:text-xs shrink-0">
            ✓
          </div>
          <div className="w-3 sm:w-4 h-0.5 bg-green-600 shrink-0"></div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-[10px] sm:text-xs shrink-0">
            ✓
          </div>
          <div className="w-3 sm:w-4 h-0.5 bg-green-600 shrink-0"></div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-[10px] sm:text-xs shrink-0">
            ✓
          </div>
          <div className="w-3 sm:w-4 h-0.5 bg-green-600 shrink-0"></div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-[10px] sm:text-xs shrink-0">
            ✓
          </div>
          <div className="w-3 sm:w-4 h-0.5 bg-green-600 shrink-0"></div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-[10px] sm:text-xs shrink-0">
            ✓
          </div>
          <div className="w-3 sm:w-4 h-0.5 bg-blue-600 shrink-0"></div>
          <div className="flex items-center shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-[10px] sm:text-xs">
              7
            </div>
            <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Address
            </span>
          </div>
        </div>
      </motion.div>

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
            priority
            alt="header_Image"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-4 sm:px-6 md:px-8 lg:px-12">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mt-6 sm:mt-8 md:mt-10 montserrat-text text-center mb-4 sm:mb-5 text-gray-900 dark:text-gray-100">
            Delivery Address
          </h1>
          <h3 className="text-center text-sm sm:text-base md:text-lg montserrat-text mb-6 text-gray-700 dark:text-gray-300 px-2">
            We'll send your membership card here, check to make sure it's{" "}
            <br className="hidden sm:block" />
            correct.
          </h3>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="address_line1"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Address line 1"
                        {...field}
                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address_line2"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Address line 2 (Optional)"
                        {...field}
                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => {
                  const selectedOption = countries.find(
                    (c) => c.label === field.value,
                  );
                  return (
                    <FormItem>
                      <FormControl>
                        <Select
                          options={countries}
                          menuPlacement="bottom"
                          placeholder="Select country"
                          value={selectedOption || null}
                          onChange={(option) => field.onChange(option.label)}
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              backgroundColor: "var(--select-bg, white)",
                              borderColor: state.isFocused
                                ? "#3b82f6"
                                : "#d1d5db",
                              color: "var(--select-text, black)",
                            }),
                            menu: (base) => ({
                              ...base,
                              backgroundColor: "var(--select-menu-bg, white)",
                            }),
                            option: (base, state) => ({
                              ...base,
                              backgroundColor: state.isFocused
                                ? "#3b82f6"
                                : "var(--select-option-bg, white)",
                              color: state.isFocused
                                ? "white"
                                : "var(--select-option-text, black)",
                            }),
                            singleValue: (base) => ({
                              ...base,
                              color: "var(--select-text, black)",
                            }),
                          }}
                          className="dark:[--select-bg:#374151] dark:[--select-text:#f3f4f6] dark:[--select-menu-bg:#374151] dark:[--select-option-bg:#374151] dark:[--select-option-text:#f3f4f6]"
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Town/City"
                        {...field}
                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postcode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Postcode"
                        {...field}
                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 sm:mt-12">
                <Button
                  type="button"
                  onClick={() => router.back()}
                  variant="outline"
                  className="w-full sm:w-auto py-4 sm:py-5 px-6 text-base sm:text-lg common-text border-2 border-blue-800 dark:border-blue-600 dark:text-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full sm:w-auto common-bg dark:bg-blue-700 dark:hover:bg-blue-600 py-2.5 px-5 text-base sm:text-lg cursor-pointer rounded-lg text-white h-12 flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Submit"}
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

export default Register7;