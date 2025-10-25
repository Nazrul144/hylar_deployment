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
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Input } from "../ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SignupContext } from "@/providers/SignupProvider";

const formSchema = z.object({
  file: z
    .any()
    .refine((files) => files && files.length > 0, {
      message: "File is required",
    }),
});

const Register6 = () => {

  const router = useRouter()

  const {signupData, setSignupData} = useContext(SignupContext)

   const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const handleFormSubmit = (data) => {
     console.log("Uploaded file:",data);
     setSignupData((prev)=>({...prev, ...data}))
     router.push("/register/register2/register3/register4/register5/register6/register7")
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
          Upload ID For Verification
        </h1>
        <h3 className="text-center text-lg mt-2 montserrat-text">
          Please complete the following to start saving
        </h3>
        {/*NID Card*/}
        <div className="mt-6 flex justify-center text-lg montserrat-text ">
          <Image
            src={"/NID.png"}
            width={200}
            height={200}
            alt="NID"
            objectFit="cover"
            priority
          />
        </div>

        {/*Upload Button*/}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8 px-8">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-red-700 italic'>Click on choose file to upload your id</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="lg:absolute justify-center mt-4 lg:right-20  flex items-center mb-8 lg:mb-0">
              <Button
                type="submit"
                className="common-bg py-2.5 px-5 rounded-lg text-white w-28 h-11 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span className="text-lg font-semibold">Next</span>
                <MdKeyboardDoubleArrowRight className="text-2xl mt-1" />
              </Button>
            </div>
            
          </form>
        </Form>
      </div>
      <hr className="border-blue-800 border-[3px] lg:w-[802px] mx-auto " />
    </div>
  );
};

export default Register6;

{/* <div className="lg:absolute justify-center mt-4 lg:right-20  flex items-center mb-8 lg:mb-0">
  <Button
    type="submit"
    className="common-bg py-2.5 px-5 rounded-lg text-white w-28 h-11 flex items-center justify-center gap-1"
  >
    <span className="text-lg font-semibold">Next</span>
    <MdKeyboardDoubleArrowRight className="text-2xl mt-1" />
  </Button>
</div>; */}
