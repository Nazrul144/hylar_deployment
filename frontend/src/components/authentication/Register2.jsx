"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { SignupContext } from "../../providers/SignupProvider";

// Zod schema: at least one must be true
const formSchema = z
  .object({
    agreed_to_push_marketing: z.boolean(),
    agreed_to_email_marketing: z.boolean(),
    agreed_to_sms_marketing: z.boolean(),
  })
  .refine(
    (data) => data.agreed_to_push_marketing || data.agreed_to_email_marketing || data.agreed_to_sms_marketing,
    {
      message: "At least one option must be selected",
      path: ["generalError"], // attach to a virtual field
    }
  );

const Register2 = () => {
  const router = useRouter();
  const { signupData, setSignupData } = useContext(SignupContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agreed_to_push_marketing: false,
      agreed_to_email_marketing: false,
      agreed_to_sms_marketing: false,
    },
  });

  const handleFormSubmit = (data) => {
    data;
    setSignupData((prev) => ({ ...prev, ...data }));
    router.push("/register/register2/register3");
  };

  // General error message from virtual field
  const generalError = form.formState.errors?.generalError?.message;

  return (
    <div>
      <div className="lg:w-[803px] mx-auto mt-14 lg:shadow-2xl p-8 bg-white relative rounded-xl">
        <div className="lg:w-full h-[150px] mb-6">
          <Image
            src={"/register2.png"}
            width={802}
            height={50}
            objectFit="cover"
            priority
            alt="header_Image"
            className="rounded-t-xl"
          />
        </div>

        <h1 className="font-bold text-4xl text-center mb-2 montserrat-text">
          Marketing Preferences
        </h1>
        <p className="text-center text-lg text-gray-700 mb-4">
          Can we contact you with promotions and updates to help you get the
          most out of your Blue Light Card?
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            {/* Show general error above checkboxes */}
            {generalError && (
              <p className="text-red-600 mb-2 font-medium">{generalError}</p>
            )}

            <div className="flex flex-col gap-4 items-start ml-8">
              {[
                { name: "agreed_to_push_marketing", label: "Push Notification" },
                { name: "agreed_to_email_marketing", label: "Email Update" },
                { name: "agreed_to_sms_marketing", label: "SMS Update" },
              ].map((opt) => (
                <FormField
                  key={opt.name}
                  control={form.control}
                  name={opt.name}
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="w-5 h-5 accent-blue-600"
                        />
                      </FormControl>
                      <FormLabel className="ml-2">{opt.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="flex justify-end mt-8">
              <Button
                className="bg-blue-900 text-white px-6 py-2 rounded-xl hover:bg-blue-800 transition-all cursor-pointer"
                type="submit"
              >
                Next {">>"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <hr className="border-blue-800 border-[3px] lg:w-[802px] mx-auto mt-6" />
    </div>
  );
};

export default Register2;
