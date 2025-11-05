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
import { BASE_URL } from "@/config/config";
import toast from "react-hot-toast";

const formSchema = z
  .object({
    agreed_to_terms_and_conditions: z.boolean().refine((val) => val === true, {
      message:
        "You must agree to the agreed_to_terms_and_conditions & Conditions",
    }),

    agreed_to_policy: z.boolean().refine((val) => val === true, {
      message: "You must agree to the policy",
    }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password must not exceed 32 characters" })
      .regex(/[A-Z]/, { message: "At least one uppercase letter" })
      .regex(/[a-z]/, { message: "At least one lowercase letter" })
      .regex(/[0-9]/, { message: "At least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "At least one special character" }),

    confirm_password: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        path: ["confirm_password"],
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
      confirm_password: "",
      agreed_to_terms_and_conditions: false,
      agreed_to_policy: false,
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      const formattedDate =
        signupData.date_of_birth instanceof Date
          ? signupData.date_of_birth.toISOString().slice(0, 10)
          : typeof signupData.date_of_birth === "string"
            ? signupData.date_of_birth.slice(0, 10)
            : "";

      const allData = {
        ...signupData,
        ...data,
        date_of_birth: formattedDate,
      };

      console.log("Final payload:", allData);

      const res = await fetch(`${BASE_URL}/api/accounts/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allData),
      });

      const result = await res.json();
      if (result.status_code === 400) {
        toast.error("User already exists!");
        return;
      }
      if (result.status_code === 201 || result.status_code === 200) {
        router.push("/register/register2/register3/register4");
      }
    } catch (error) {
      console.log(error);
    }
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
                name="confirm_password"
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
                name="agreed_to_terms_and_conditions"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-3 mt-4">
                        <Checkbox
                          id="agreed_to_terms_and_conditions"
                          onCheckedChange={field.onChange}
                          checked={field.value}
                        />
                        <Label htmlFor="agreed_to_terms_and_conditions">
                          {" "}
                          I agree to the{" "}
                          <Link
                            className="text-blue-600 hover:text-blue-800 underline"
                            href="/term_condition"
                          >
                            agreed_to_terms_and_conditions & Conditions
                          </Link>
                        </Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agreed_to_policy"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-3 mt-4">
                        <Checkbox
                          id="agreed_to_policy"
                          onCheckedChange={field.onChange}
                          checked={field.value}
                        />
                        <Label htmlFor="agreed_to_policy">
                          {" "}
                          I agree to the{" "}
                          <Link
                            className="text-blue-600 hover:text-blue-800 underline"
                            href="/privacy"
                          >
                            agreed_to_policy
                          </Link>
                        </Label>
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
