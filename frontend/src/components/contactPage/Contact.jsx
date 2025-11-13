"use client";
import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import emailjs from '@emailjs/browser';
import Swal from "sweetalert2";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(5, { message: "Email must be at least 5 characters long." }),

  subject: z
    .string()
    .min(3, { message: "Subject should be at least 3 characters." })
    .max(100, { message: "Subject cannot exceed 100 characters." }),

  phone: z.string().regex(/^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/, {
    message: "Please enter a valid UK phone number (e.g., +447911123456)",
  }),

  agreed_to_terms_and_conditions: z.boolean().refine((val) => val === true, {
    message:
      "You must agree to the agreed_to_terms_and_conditions & Conditions",
  }),
});

const Contact = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      subject: "",
      phone: "",
      agreed_to_terms_and_conditions: false,
    },
  });



const sendEmail = async (data) => {
  emailjs.init(`${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}`); // public key

  try {
    await emailjs.send(
      `${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`,
      `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}`,
      {
        first_name: data.username,
        from_email: data.email,
        subject: data.subject,
        phone: data.phone,
      }
    );

    Swal.fire({
      title: "Message Sent Successfully!",
      icon: "success",
    });

    form.reset(); // Reset RHF form

  } catch (error) {
    console.log("ERROR:", error);
  }
};


  // const handleFormSubmit = (data) => {
  //   console.log(data);
  //   form.reset()
  // };

  return (
    <div className="py-16 px-4 md:px-12 border-1 rounded-sm">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-500 via-blue-400 to-green-500 bg-clip-text text-transparent">
          Contact Us
        </h2>

        <p className="text-gray-600 mt-2 dark:text-white">
          Have a question or want to work with us? Fill out the form and we’ll
          get back to you.
        </p>
      </div>

      {/* Contact page */}
      <div className="lg:flex justify-between gap-12">
        {/* Left Side */}
        <div className="lg:w-1/2 space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">
            Get in Touch
          </h3>

          <div className="space-y-4 mt-6">
            <p className="flex items-center gap-3 text-gray-700 dark:text-white">
              <FaPhoneAlt /> +880 1234 567 890
            </p>
            <p className="flex items-center gap-3 text-gray-700 dark:text-white">
              <FaEnvelope /> contact@yourcompany.com
            </p>
            <p className="flex items-center gap-3 text-gray-700 dark:text-white">
              <FaMapMarkerAlt /> 1200 Gulshan Avenue, Dhaka, Bangladesh
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 mt-8 text-2xl text-gray-700 dark:text-white">
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="lg:w-1/2 mt-12 lg:mt-0 dark:text-white">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(sendEmail)} className="space-y-8">
              <div className="lg:grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Your Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="+44 XXXXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                        <Label
                          htmlFor="agreed_to_terms_and_conditions"
                          className="text-gray-600 font-medium"
                        >
                          I agree to the terms and conditions and allow this
                          website to store my submitted information
                        </Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="cursor-pointer bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 
             hover:from-indigo-500 hover:via-blue-500 hover:to-sky-500 
             transition-all duration-500 ease-in-out transform hover:scale-105 
             text-white font-semibold shadow-md hover:shadow-lg px-6 py-2 rounded-lg"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
