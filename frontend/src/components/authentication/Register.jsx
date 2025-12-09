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
import { ChevronDownIcon } from "lucide-react";
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
  date_of_birth: z.date().refine((val) => val !== null, {
    message: "Please select a date_of_birth",
  }),

  phone_no: z
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
      phone_no: "",
    },
  });

  const handleFormSubmit = (data) => {
    data;
    setSignupData(data);
    router.push("/register/register2");
  };

  return (
    <div>
      <div className="lg:flex md:flex mt-12 justify-center mx-auto gap-6 bg-white w-[820px] p-2 shadow-2xl">
        {/*Image div*/}
        <motion.div
          className="relative h-[600px] w-96"
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

          <div className="absolute mt-48 grid place-items-center">
            <h1 className="z-10 text-3xl font-bold text-white drop-shadow-lg">
              Create your account
            </h1>
            <h3 className="text-white mt-4 text-center">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </h3>
          </div>
          <h4 className="text-white absolute bottom-4 text-sm left-12">
            Log in to your <span className="font-bold">MaximumSavings</span>{" "}
            account.
          </h4>

          <div className="absolute inset-0 rounded-lg bg-black/30" />
        </motion.div>

        {/*Register form div*/}
        <motion.div
          className="h-[600px] w-96"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
        >
          <div className="w-full max-w-md p-8 space-y-3 text-gray-100 h-full">
            <h1 className="montserrat-text text-center common-text text-5xl font-bold mb-10">
              Register
            </h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="space-y-8 text-black"
              >
                <div className="flex gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <div className="relative">
                            <Label className="absolute -top-2 left-3 bg-white px-1 text-sm text-blue-600">
                              First Name
                            </Label>
                            <Input
                              {...field}
                              className="rounded-md border border-blue-400 focus:border-blue-500 focus:ring-0 text-black"
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <div className="relative">
                            <Label className="absolute -top-2 left-3 bg-white px-1 text-sm text-blue-600 ">
                              Last Name
                            </Label>
                            <Input
                              {...field}
                              className="rounded-md border border-blue-400 focus:border-blue-500 focus:ring-0 text-black"
                            />
                          </div>
                          <FormMessage />
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
                        <Label className="absolute -top-2 left-3 bg-white px-1 text-sm text-blue-600">
                          Email
                        </Label>
                        <Input
                          {...field}
                          className="rounded-md border border-blue-400 focus:border-blue-500 focus:ring-0 text-black"
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-3">
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                id="date_of_birth"
                                className="w-full justify-between font-normal "
                              >
                                {field.value
                                  ? new Date(field.value).toLocaleDateString()
                                  : "Select date of birth"}

                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
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
                                toYear={2025}
                                setOpen
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone_no"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="relative">
                        <Label className="absolute -top-2 left-3 bg-white px-1 text-sm text-blue-600">
                          Mobile Number
                        </Label>
                        <Input
                          {...field}
                          placeholder="+44 XXX XXX XXX"
                          className="rounded-md border border-blue-400 focus:border-blue-500 focus:ring-0"
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full bg-blue-900 text-white cursor-pointer"
                  type="submit"
                >
                  Continue
                </Button>
              </form>
            </Form>

            <motion.p
              className="text-xs text-center sm:px-6 text-gray-800"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={7}
            >
              Already have an account?
              <Link
                href={"/login"}
                className="underline font-bold common-text montserrat-text"
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
