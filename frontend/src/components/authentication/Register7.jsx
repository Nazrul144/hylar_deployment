"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
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
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { SignupContext } from "@/providers/SignupProvider";
import countryList from "react-select-country-list";

const formSchema = z.object({
  address1: z
    .string()
    .min(2, { message: "Please enter a valid address line 1" })
    .max(150),
  address2: z.string().optional(),
  town: z
    .string()
    .min(2, { message: "Please provide a valid town or city name" })
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

  const { signupData, setSignupData } = useContext(SignupContext);
  const countries = countryList().getData(); // [{label: "Afghanistan", value: "AF"}, ...]

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address1: "",
      address2: "",
      town: "",
      country: "",
      postcode: "",
    },
  });

  const handleFormSubmit = (data) => {
    data;
    setSignupData((prev) => ({ ...prev, ...data }));
    router.push(
      "/register/register2/register3/register4/register5/register6/register7/register8"
    );
  };

  return (
    <div>
      <div className="lg:w-[803px] lg:h-[761px] mx-auto mt-14 lg:shadow-2xl relative">
        <div className="lg:w-[820px] h-[50px]">
          <Image
            src={"/register2.png"}
            width={802}
            height={50}
            priority
            alt="header_Image"
            className="object-cover"
          />
        </div>

        <h1 className="font-bold text-4xl mt-10 montserrat-text text-center mb-5">
          Delivery Address
        </h1>
        <h3 className="text-center text-lg montserrat-text mb-6">
          We'll send your membership card here, check to make sure it's <br />
          correct.
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4 lg:px-12 "
          >
            <FormField
              control={form.control}
              name="address1"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Address line 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Address line 2 (Optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      options={countries} // your country array
                      menuPlacement="bottom" // always open downward
                      placeholder="Select country"
                      onChange={(option) => field.onChange(option.label)} // save selected country
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="town"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Town/City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Postcode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center mt-12">
              <div>
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  className="py-5 px-6 text-lg common-text border-2 border-blue-800 cursor-pointer"
                >
                  Back
                </Button>
              </div>
              <div>
                <Button className="common-bg py-2.5 px-5 rounded-lg text-white w-28 h-12 flex items-center justify-center gap-1">
                  <span className="text-lg font-semibold">Next</span>
                  <MdKeyboardDoubleArrowRight className="text-2xl mt-1" />
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>

      <hr className="border-blue-800 border-[3px] lg:w-[802px] mx-auto" />
    </div>
  );
};

export default Register7;
