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
import { BASE_URL } from "@/config/config";


const formSchema = z.object({
  brand_name: z.string().min(2, { message: "Brand Name is required" }).max(150),

  brand_sector: z
    .string()
    .min(2, { message: "Brand Sector is required" })
    .max(150),

  website_link: z
    .string()
    .min(2, { message: "Website link is required" })
    .max(150),

  owner_name: z
    .string()
    .min(2, { message: "Contact Person Name is required" })
    .max(150),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  phone: z
    .string()
    .trim()
    .regex(/^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/, {
      message: "Enter a valid UK phone number (e.g., +447911123456 )",
    }),

     document: z.any().refine((files) => files && files.length > 0, {
    message: "File is required",
  }),

   brand_logo: z.any().refine((files) => files && files.length > 0, {
    message: "Logo is required",
  }),

  address_line1: z
    .string()
    .min(3, { message: "Address Line 1 is required" })
    .max(200),
  address_line2: z
    .string()
    .min(3, { message: "Address Line 2 is required" })
    .max(200),
 
});

const SubmitForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand_name: "",
      brand_sector: "",
      website_link: "",
      owner_name: "",
      email: "",
      phone: "",
      document: undefined,
      brand_logo: undefined,
      address_line1: "",
      address_line2: "",
    },
  });

  // const handleFormSubmit = async(data) => {

  //     try {
  //       const res = await fetch(`${BASE_URL}/api/accounts/brand-account-request/`,{
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify(data)
  //       })
  //       const result = await res.json()
  //       console.log(result)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   form.reset();
  // };

  const handleFormSubmit = async (data) => {
  const formData = new FormData();

  formData.append("brand_name", data.brand_name);
  formData.append("brand_sector", data.brand_sector);
  formData.append("website_link", data.website_link);
  formData.append("owner_name", data.owner_name);
  formData.append("contact_email", data.email);
  formData.append("contact_phone", data.phone);

  formData.append("address_line1", data.address_line1);
  formData.append("address_line2", data.address_line2);

  // Files
  formData.append("document", data.document[0]);
  formData.append("brand_logo", data.brand_logo[0]);

  try {
    const res = await fetch(`${BASE_URL}/api/accounts/brand-account-request/`, {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div>
      <div className="w-full relative ">
        <Image
          src="/addBusiness/header.png"
          alt="header"
          width={1920}
          height={300}
          className="object-cover w-full"
          priority
        />

        <div className="absolute inset-0 top-4 lg:top-28">
          <h1 className="text-white text-xl md:text-4xl lg:text-5xl font-bold text-center drop-shadow-lg inter-text">
            Welcome To Exclusive Discounts & Savings
          </h1>
          <h3 className="text-center text-sm lg:text-xl lg:mt-2 montserrat-text text-white">
            Get access to curated deals across various categories
          </h3>
        </div>
      </div>

      {/* Submit Form */}
      <div className="w-full md:h-96 lg:w-[886px] lg:h-[auto] mx-auto lg:shadow-2xl rounded-sm px-2 lg:px-8">
        <h1 className="text-center font-bold text-inter text-4xl pt-16 pb-12 common-text">
          Submit A Request
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            {/* Brand Name */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="brand_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Brand Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Brand Sector */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="brand_sector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Sector</FormLabel>
                    <FormControl>
                      <Input placeholder="Brand Sector" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Website Link */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="website_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Link</FormLabel>
                    <FormControl>
                      <Input placeholder="Website Link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Owner Name */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="owner_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+44 2012345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

             {/* Document */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sky-500 italic">
                      Upload Document
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const frontFile = form.getValues("document");

                          if (frontFile && file?.name === frontFile[0]?.name) {
                            toast.error(
                              "You have already uploaded this file as front side."
                            );
                            e.target.value = "";
                            return;
                          }

                          field.onChange(e.target.files);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


              {/* Brand Logo */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="brand_logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sky-500 italic">
                      Upload Brand Logo
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const frontFile = form.getValues("brand_logo");

                          if (frontFile && file?.name === frontFile[0]?.name) {
                            toast.error(
                              "You have already uploaded this file as front side."
                            );
                            e.target.value = "";
                            return;
                          }

                          field.onChange(e.target.files);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            {/* Address Line 1 */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="address_line1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Address Line 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Address Line 2 */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="address_line2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Address Line 2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

           

            <Button
              className="w-full mt-6 bg-blue-800 text-white text-lg cursor-pointer mb-12"
              type="submit"
            >
              Submit Your Application
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SubmitForm;
