"use client";
import Image from "next/image";
import React, { useContext } from "react";
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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employment_status: "employed",
      job_details: "nhs",
      employer: "education",
    },
  });

  const handleFormSubmit = (data) => {
    setUserProfile((prev) => ({
      ...prev,
      ...data,
    }));
    router.push("/register/register2/register3/register4/register5/register6");
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

        <div className="lg:w-2xl mx-auto p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
              {/* EMPLOYMENT STATUS */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="employment_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="common-text font-bold">
                        EMPLOYMENT STATUS
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="border-1 border-gray-200 rounded-sm p-2"
                        >
                          <option value="employed">Employed</option>
                          <option value="retired">Retired</option>
                          <option value="volunteer">Volunteer</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* EMPLOYER */}
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="employer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="common-text font-bold">
                        EMPLOYER
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="border-1 border-gray-200 rounded-sm p-2"
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
                      <FormMessage />
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
                      <FormLabel className="common-text font-bold">
                        JOB DETAILS
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="border-1 border-gray-200 rounded-sm p-2"
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                className="w-full mt-4 bg-blue-900 text-white cursor-pointer"
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
