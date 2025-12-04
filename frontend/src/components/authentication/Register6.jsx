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
import { SignupContext } from "../../providers/SignupProvider";
import toast from "react-hot-toast";

const formSchema = z.object({
  id_card_front: z.any().refine((files) => files && files.length > 0, {
    message: "Front part of ID is required",
  }),
  id_card_back: z.any().refine((files) => files && files.length > 0, {
    message: "Back part of ID is required",
  }),
});

const Register6 = () => {
  const router = useRouter();
  const { userProfile, setUserProfile } = useContext(SignupContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_card_front: undefined,
      id_card_back: undefined,
    },
  });

  const handleFormSubmit = (data) => {
    console.log("Uploaded files:", data);

    // Merge new data into global context
    setUserProfile((prev) => ({ ...prev, ...data }));

    router.push(
      "/register/register2/register3/register4/register5/register6/register7"
    );
  };

  return (
    <div>
      <div className="lg:w-[803px] lg:h-[516px] mx-auto mt-14 lg:shadow-2xl relative">
        {/* Header */}
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

        {/* Example NID Images */}
        <div className="mt-6 flex justify-between lg:px-20 text-lg montserrat-text">
          <Image
            src={"/NID.png"}
            width={200}
            height={200}
            alt="NID Front"
            objectFit="cover"
            priority
          />
          <Image
            src={"/NID.png"}
            width={200}
            height={200}
            alt="NID Back"
            objectFit="cover"
            priority
          />
        </div>

        {/* Upload Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4 px-8"
          >
            <div className="flex justify-between mt-4">
              {/* Front Side Upload */}
              <div>
                <FormField
                  control={form.control}
                  name="id_card_front"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-700 italic">
                        Upload Front Side of Your ID
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            const backFile = form.getValues("id_card_back");

                            if (backFile && file?.name === backFile[0]?.name) {
                              toast.error(
                                "You have already uploaded this file as back side."
                              );
                              e.target.value = "";
                              return;
                            }

                            field.onChange(e.target.files);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Back Side Upload */}
              <div>
                <FormField
                  control={form.control}
                  name="id_card_back"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-700 italic">
                        Upload Back Side of Your ID
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            const frontFile = form.getValues("id_card_front");

                            if (frontFile && file?.name === frontFile[0]?.name) {
                              toast.error(
                                "You have already uploaded this file as front side."
                              );
                              e.target.value = "";
                              return;
                            }

                            field.onChange(e.target.files);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Next Button */}
            <div className="lg:absolute justify-center mt-4 lg:right-20 flex items-center mb-8 lg:mb-0">
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
