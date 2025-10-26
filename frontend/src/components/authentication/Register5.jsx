"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
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
import { SignupContext } from "@/providers/SignupProvider";

const formSchema = z.object({
  status: z.string().min(1, { message: "Select any one" }),
  job: z.string().min(1, { message: "Select any one" }),
  employer: z.string().min(1, {message: "Selece any one"})
});

const Register5 = () => {

  const router = useRouter()

  const {signupData, setSignupData} = useContext(SignupContext)


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "Employed",
      job: "NHS",
      employer: "Education"
    },
  });

  const handleFormSubmit = (data) => {
    console.log(data);
    setSignupData((prev)=>({
      ...prev, ...data
    }))
    router.push("/register/register2/register3/register4/register5/register6")
  };

  return (
    <div>
      <div className="lg:w-[803px] lg:h-[640px] mx-auto mt-14 lg:shadow-2xl relative">
        <div className="lg:w-[820px] h-[50px]">
          <Image
            src={"/register2.png"}
            width={802}
            height={50}
            objectFit="cover"
            priority
            alt="header_Image"
          />
        </div>

        <h1 className="font-bold text-4xl common-text mt-10 montserrat-text text-center mb-5">
          Tell us where you work
        </h1>
        <h3 className="text-center text-lg montserrat-text mb-6">
          Enter your employment details and job title so we can confirm <br />
          you're eligible.
        </h3>

        {/* Form */}
        <div className="lg:w-2xl mx-auto p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="common-text font-bold">
                        EMPLOYMENT STATUS
                      </FormLabel>
                      <FormControl>
                        <select {...field} className="border-1 border-gray-200 rounded-sm p-2">
                          <option>Employed</option>
                          <option>Retired</option>
                          <option>Volunteer</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-6">
                <FormField
                control={form.control}
                name="job"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="common-text font-bold">
                      EMPLOYER
                    </FormLabel>
                    <FormControl>
                      <select {...field} className="border-1 border-gray-200 rounded-sm p-2">
                        <option>NHS</option>
                        <option>Armed Force</option>
                        <option>Police</option>
                        <option>Fire Service</option>
                        <option>Tech</option>
                        <option>Essential Retail</option>
                        <option>Childcare</option>
                        <option>Education</option>
                        <option>Ambulance Service</option>
                        <option>Apha</option>
                        <option>Blood Bike</option>
                        <option>Dental Practice</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <div>
                <FormField
                control={form.control}
                name="employer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="common-text font-bold">
                      EMPLOYER
                    </FormLabel>
                    <FormControl>
                      <select {...field} className="border-1 border-gray-200 rounded-sm p-2">
                        <option>Ambulance Service</option>
                        <option>Fire Service</option>
                        <option>HM Coastguard</option>
                        <option>Independent Lifeboat</option>
                        <option>NHS</option>
                        <option>Armed Force</option>
                        <option>Police</option>
                        <option>Tech</option>
                        <option>Essential Retail</option>
                        <option>Childcare</option>
                        <option>Education</option>
                        <option>Red Cross</option>
                        <option>RNLI</option>
                        <option>Search and Rescue</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <Button
                className="w-full mt-4 bg-blue-900 text-white"
                type="submit"
              >
                Next
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <hr className="border-blue-800 border-[3px] lg:w-[802px] mx-auto" />
    </div>
  );
};

export default Register5;
