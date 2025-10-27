"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { SignupContext } from "@/providers/SignupProvider";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";

const formSchema = z
  .object({
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Terms & Conditions",
    }),

    policy: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Policy",
    }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password must not exceed 32 characters" })
      .regex(/[A-Z]/, { message: "At least one uppercase letter" })
      .regex(/[a-z]/, { message: "At least one lowercase letter" })
      .regex(/[0-9]/, { message: "At least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "At least one special character" }),

    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

const Register3 = () => {
  const router = useRouter();
  const { signupData, setSignupData } = useContext(SignupContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      terms: false,
      policy: false
    },
  });

  const handleFormSubmit = (data) => {
    console.log(data);
    const allData = { ...signupData, ...data };
    setSignupData(allData);
    router.push("/register/register2/register3/register4");
  };

  return (
    <div>
      <div className="lg:w-[803px] lg:h-[516px] mx-auto mt-14 lg:shadow-2xl relative">
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
        <h1 className="font-bold text-4xl mt-12 montserrat-text text-center">
          Create your account
        </h1>
        <h3 className="text-center text-lg mt-2 montserrat-text">
          Now enter a secure password for <br /> your account
        </h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="relative w-96 h-10 mb-8 mx-auto mt-12">
              {/* Label on border */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="relative">
                      <Label className="absolute -top-2 left-3 bg-white px-1 text-sm text-blue-600">
                        Password
                      </Label>
                      <Input
                        type="password"
                        {...field}
                        className="rounded-md border border-blue-400 focus:border-blue-500 focus:ring-0"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full mt-8">
                    <div className="relative">
                      <Label className="absolute -top-2 left-3 bg-white px-1 text-sm text-blue-600">
                        Confirm Password
                      </Label>
                      <Input
                        type="password"
                        {...field}
                        className="rounded-md border border-blue-400 focus:border-blue-500 focus:ring-0"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-3 mt-4">
                        <Checkbox
                          id="terms"
                          onCheckedChange={field.onChange}
                          checked={field.value}
                        />
                        <Label htmlFor="terms"> I agree to the <Link className="text-blue-600 hover:text-blue-800 underline" href="/term_condition">Terms & Conditions</Link></Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="policy"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-3 mt-4">
                        <Checkbox
                          id="policy"
                          onCheckedChange={field.onChange}
                          checked={field.value}
                        />
                        <Label htmlFor="policy"> I agree to the <Link className="text-blue-600 hover:text-blue-800 underline" href="/privacy">Policy</Link></Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-8 w-full bg-blue-900 text-white cursor-pointer"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <hr className="border-blue-800 border-[3px] lg:w-[802px] mx-auto " />
    </div>
  );
};

export default Register3;
