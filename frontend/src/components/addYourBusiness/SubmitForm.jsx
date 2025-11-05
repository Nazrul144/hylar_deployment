"use client";
import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
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

const formSchema = z.object({
  businessName: z.string().min(2, { message: "It's too short" }).max(150),
  businessSecto: z.string().min(2, { message: "It's too short" }).max(150),
  websiteLink: z.string().min(2, { message: "Link is too short" }).max(150),
  contactPersonName: z
    .string()
    .min(2, { message: "Name Should be at least 2 character" })
    .max(150),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  phone: z
    .string()
    .trim()
    .min(11, { message: "Phone number must be at least 11 digits" })
    .max(14, { message: "Phone number must not exceed 14 digits" })
    .regex(/^\+?[1-9]\d{6,14}$/, {
      message: "Enter a valid phone number",
    }),

  textArea: z.string().min(2, { message: "It's too short" }),
  fileUpload: z.string(),
});

const SubmitForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessSecto: "",
      websiteLink: "",
      contactPersonName: "",
      email: "",
      phone: "",
      textArea: "",
      fileUpload: "",
    },
  });

  const handleFormSubmit = (data) => {
    data;
    form.reset();
  };

  return (
    <div>
      <div className="w-full relative ">
        <Image
          src="/addBusiness/header.png"
          alt="header"
          width={1920} // original image width
          height={300} // desired header height
          className="object-cover w-full"
          priority
        />

        {/* Optional overlay text */}
        <div className="absolute inset-0 top-4 lg:top-28">
          <h1 className="text-white text-xl md:text-4xl lg:text-5xl font-bold text-center drop-shadow-lg inter-text">
            Welcome To Exclusive Discounts & Savings
          </h1>
          <h3 className="text-center text-sm lg:text-xl lg:mt-2 montserrat-text text-white">
            Get access to curated deals across various categories
          </h3>
        </div>
      </div>
      {/*Submit Form*/}
      <div className="w-full  md:h-96 lg:w-[886px] lg:h-[1116px]  mx-auto lg:shadow-2xl rounded-sm px-2 lg:px-8">
        <h1 className="text-center font-bold text-inter text-4xl pt-16 pb-12 common-text">
          Submit A Request
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Business or Brand Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="businessSecto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Secto</FormLabel>
                    <FormControl>
                      <Input placeholder="Business Secto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="websiteLink"
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
            <div className="mb-4">
              <FormField
                control={form.control}
                name="contactPersonName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <div className="mb-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+44 2012345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="textArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Swite Something</FormLabel>
                    <FormControl {...field}>
                      <Textarea
                        className="[resize:none] h-44"
                        placeholder="Tell us about your products, audience and why you want to join.."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="common-text text-sm">
              *Please enter any further details relating to your request and
              provide relevant attachments below. A member of the team will
              follow up with you soon.
            </p>

            <div className="mb-4 mt-10">
              <FormField
                control={form.control}
                name="fileUpload"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl">
                      Attachments(Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Add file or Drop file here"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              className="w-full mt-6 bg-blue-800 text-white text-lg cursor-pointer "
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
