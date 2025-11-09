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
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Select from "react-select";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { SignupContext } from "@/providers/SignupProvider";
import countryList from "react-select-country-list";
import { BASE_URL } from "@/config/config";
import toast from "react-hot-toast";

const formSchema = z.object({
  address_line1: z
    .string()
    .min(2, { message: "Please enter a valid address line 1" })
    .max(150),
  address_line2: z.string().optional(),
  city: z
    .string()
    .min(2, { message: "Please provide a valid city or city name" })
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
  const { userProfile, setUserProfile } = useContext(SignupContext);
  const countries = countryList().getData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address_line1: "",
      address_line2: "",
      city: "",
      country: "United States",
      postcode: "",
    },
  });

  const handleFormSubmit = async (data) => {
    const finalProfileData = { ...userProfile, ...data };

    setUserProfile(finalProfileData);

    try {
      const token = localStorage.getItem("access_token");

      const formData = new FormData();
      Object.entries(finalProfileData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {

          if (key === "id_card_front" || key === "id_card_back") {
            if (value instanceof FileList && value.length > 0) {
              formData.append(key, value[0]);
            }
          } else {
            formData.append(key, value);
          }
        }
      });

      const res = await fetch(`${BASE_URL}/api/profiles/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();


      if (!res.ok) {
        toast.error(result.detail || "Failed to update profile");
        return;
      }

      toast.success("Submited Successfully!");
      router.push("/register/register2/register3/register4/register5/register6/register7/register8");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
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
            className="space-y-4 lg:px-12"
          >
            <FormField
              control={form.control}
              name="address_line1"
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
              name="address_line2"
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
              render={({ field }) => {
                const selectedOption = countries.find(
                  (c) => c.label === field.value
                );
                return (
                  <FormItem>
                    <FormControl>
                      <Select
                        options={countries}
                        menuPlacement="bottom"
                        placeholder="Select country"
                        value={selectedOption || null}
                        onChange={(option) => field.onChange(option.label)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="city"
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
                <Button className="common-bg py-2.5 px-5 text-lg cursor-pointer rounded-lg text-white w-28 h-12 flex items-center justify-center gap-1">
                  Submit
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
