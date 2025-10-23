"use client";
import Image from "next/image";
import React, { useContext } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { SignupContext } from "@/providers/SignupProvider";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";


const formSchema = z.object({
  comment: z.array(z.string()),
});

const Register2 = () => {
  const router = useRouter();

  const { signupData, setSignupData } = useContext(SignupContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: [],
    },
  });

  const handleFormSubmit = (data) => {
    console.log(data);
    setSignupData((prev) => ({ ...prev, ...data })); //<--previous + current merage
    router.push("/register/register2/register3");
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
        <h1 className="font-bold common-text text-4xl mt-12 montserrat-text text-center">
          Marketing preferences
        </h1>
        <h3 className="text-center text-lg mt-2 montserrat-text">
          Can we contact you with promotions and updates to help you get <br />{" "}
          the most out of your Blue Light Card?
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="text-center mb-4">
                    Choose your marketing preferences
                  </FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      value={field.value || []}
                      onValueChange={field.onChange}
                      className="flex space-x-6"
                    >
                      {/* Push Notification */}
                      <ToggleGroupItem
                        value="push-notification"
                        aria-label="Push Notification"
                        className="
             flex items-center justify-center w-32 h-16 rounded-xl border-2 border-gray-300 cursor-pointer
              data-[state=on]:bg-green-100
              data-[state=on]:border-green-500
              transition-all duration-200
              hover:scale-105
              text-center font-medium
            "
                      >
                        Push Notification
                      </ToggleGroupItem>

                      {/* Email Update */}
                      <ToggleGroupItem
                        value="email-update"
                        aria-label="Email Update"
                        className="
              flex items-center justify-center w-32 h-16 rounded-xl border-2 border-gray-300 cursor-pointer
              data-[state=on]:bg-green-100
              data-[state=on]:border-green-500
              transition-all duration-200
              hover:scale-105
              text-center font-medium
            "
                      >
                        Email Update
                      </ToggleGroupItem>

                      {/* SMS Update */}
                      <ToggleGroupItem
                        value="sms-update"
                        aria-label="SMS Update"
                        className="
              flex items-center justify-center w-32 h-16 rounded-xl border-2 border-gray-300 cursor-pointer
              data-[state=on]:bg-green-100
              data-[state=on]:border-green-500
              transition-all duration-200
              hover:scale-105
              text-center font-medium
            "
                      >
                        SMS Update
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage className="text-center mt-2" />
                </FormItem>
              )}
            />

            <Button
              className="bg-blue-900 text-white mb-4 mt-4 ml-50 lg:mt-28 lg:ml-[670px] cursor-pointer"
              type="submit"
            >
              Next {">>"}
            </Button>
          </form>
        </Form>
      </div>
      <hr className="border-blue-800 border-[3px] lg:w-[802px] mx-auto " />
    </div>
  );
};

export default Register2;
