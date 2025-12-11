"use client";
import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { BASE_URL } from "../../config/config";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const formSchema = z.object({
  brand_name: z
    .string()
    .min(2, { message: "Brand name must be at least 2 characters" })
    .max(100, { message: "Brand name must not exceed 100 characters" })
    .regex(/^[A-Za-z\s&'-]+$/, {
      message: "Brand name can only contain letters, spaces, &, apostrophes, and hyphens",
    }),

  brand_sector: z
    .string()
    .min(2, { message: "Brand sector must be at least 2 characters" })
    .max(100, { message: "Brand sector must not exceed 100 characters" })
    .regex(/^[A-Za-z\s&,-]+$/, {
      message: "Brand sector can only contain letters, spaces, and basic punctuation",
    }),

  website_link: z
    .string()
    .min(1, { message: "Website link is required" })
    .url({ message: "Please enter a valid URL (e.g., https://example.com)" })
    .regex(/^https?:\/\/.+/, {
      message: "URL must start with http:// or https://",
    }),

  owner_name: z
    .string()
    .min(2, { message: "Owner name must be at least 2 characters" })
    .max(100, { message: "Owner name must not exceed 100 characters" })
    .regex(/^[A-Za-z\s'-]+$/, {
      message: "Owner name can only contain letters, spaces, apostrophes, and hyphens",
    }),

  contact_email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .toLowerCase(),

  contact_phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/, {
      message: "Enter a valid UK phone number (e.g., +447911123456 or 07911123456)",
    }),

  document: z
    .any()
    .refine((files) => files && files.length > 0, {
      message: "Document is required",
    })
    .refine((files) => files?.[0]?.size <= 5000000, {
      message: "Document must be less than 5MB",
    })
    .refine(
      (files) =>
        ["image/jpeg", "image/jpg", "image/png", "application/pdf"].includes(
          files?.[0]?.type
        ),
      {
        message: "Only JPG, PNG, or PDF files are allowed",
      }
    ),

  brand_logo: z
    .any()
    .refine((files) => files && files.length > 0, {
      message: "Brand logo is required",
    })
    .refine((files) => files?.[0]?.size <= 2000000, {
      message: "Logo must be less than 2MB",
    })
    .refine(
      (files) => ["image/jpeg", "image/jpg", "image/png"].includes(files?.[0]?.type),
      {
        message: "Only JPG or PNG images are allowed for logo",
      }
    ),

  address_line1: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" })
    .max(200, { message: "Address must not exceed 200 characters" }),

  address_line2: z
    .string()
    .min(3, { message: "Address Line 2 must be at least 3 characters" })
    .max(200, { message: "Address must not exceed 200 characters" })
    .optional()
    .or(z.literal("")),
});

const SubmitForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand_name: "",
      brand_sector: "",
      website_link: "",
      owner_name: "",
      contact_email: "",
      contact_phone: "",
      document: undefined,
      brand_logo: undefined,
      address_line1: "",
      address_line2: "",
    },
  });

  const handleFormSubmit = async (data) => {
    const formData = new FormData();

    formData.append("brand_name", data.brand_name.trim());
    formData.append("brand_sector", data.brand_sector.trim());
    formData.append("website_link", data.website_link.trim());
    formData.append("owner_name", data.owner_name.trim());
    formData.append("contact_email", data.contact_email.trim().toLowerCase());
    formData.append("contact_phone", data.contact_phone.trim());
    formData.append("address_line1", data.address_line1.trim());
    if (data.address_line2) {
      formData.append("address_line2", data.address_line2.trim());
    }

    // Files
    formData.append("document", data.document[0]);
    formData.append("brand_logo", data.brand_logo[0]);

    try {
      const res = await fetch(
        `${BASE_URL}/api/accounts/brand-account-request/`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      if (result.status_code === 201) {
        Swal.fire({
          title: "Submitted!",
          text: "Your application has been submitted successfully!",
          icon: "success",
          confirmButtonColor: "#1e40af",
        });
        form.reset();
      } else {
        toast.error(result?.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header Image */}
      <div className="w-full relative">
        <Image
          src="/addBusiness/header.png"
          alt="header"
          width={1920}
          height={300}
          className="object-cover w-full h-[200px] md:h-[300px]"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold text-center drop-shadow-lg inter-text">
            Welcome To Exclusive Discounts & Savings
          </h1>
          <h3 className="text-center text-sm md:text-lg lg:text-xl mt-2 montserrat-text text-white drop-shadow-md">
            Get access to curated deals across various categories
          </h3>
        </div>
      </div>

      {/* Submit Form */}
      <div className="w-full max-w-[886px] mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl dark:shadow-gray-900/50 p-6 md:p-8 lg:p-10 transition-colors duration-200">
          <h1 className="text-center font-bold text-3xl md:text-4xl pt-4 pb-8 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            Submit A Request
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
              {/* Brand Name */}
              <FormField
                control={form.control}
                name="brand_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Brand Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Maximum Savings"
                        {...field}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Brand Sector */}
              <FormField
                control={form.control}
                name="brand_sector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Brand Sector <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Finance, Retail, Technology"
                        {...field}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Website Link */}
              <FormField
                control={form.control}
                name="website_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Website Link <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.example.com"
                        {...field}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Owner Name */}
              <FormField
                control={form.control}
                name="owner_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Contact Person Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Smith"
                        {...field}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Contact Email */}
              <FormField
                control={form.control}
                name="contact_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Contact Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="contact@example.com"
                        type="email"
                        {...field}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Contact Phone */}
              <FormField
                control={form.control}
                name="contact_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Phone Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="+447911123456"
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                        onChange={(e) => {
                          let value = e.target.value;
                          if (value && !value.startsWith("+")) {
                            value = "+" + value;
                          }
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Document Upload */}
              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Upload Document <span className="text-red-500">*</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        (PDF, JPG, PNG - Max 5MB)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*,.pdf"
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 transition-colors duration-200"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          const logoFile = form.getValues("brand_logo");

                          if (logoFile && file && file.name === logoFile[0]?.name) {
                            toast.error("This file is already uploaded as brand logo.");
                            e.target.value = "";
                            return;
                          }

                          field.onChange(e.target.files);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Brand Logo Upload */}
              <FormField
                control={form.control}
                name="brand_logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Upload Brand Logo <span className="text-red-500">*</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        (JPG, PNG - Max 2MB)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 transition-colors duration-200"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          const documentFile = form.getValues("document");

                          if (documentFile && file && file.name === documentFile[0]?.name) {
                            toast.error("This file is already uploaded as document.");
                            e.target.value = "";
                            return;
                          }

                          field.onChange(e.target.files);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Address Line 1 */}
              <FormField
                control={form.control}
                name="address_line1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Address Line 1 <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Street address, P.O. box"
                        {...field}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Address Line 2 */}
              <FormField
                control={form.control}
                name="address_line2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Address Line 2 <span className="text-gray-500 text-sm">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Apartment, suite, unit, building, floor"
                        {...field}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              <Button
                className="w-full mt-8 bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-lg py-6 cursor-pointer transition-colors duration-200"
                type="submit"
              >
                Submit Your Application
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SubmitForm;