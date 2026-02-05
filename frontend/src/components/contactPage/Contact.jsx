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
import { Textarea } from "../ui/textarea";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { BASE_URL } from "../../config/config";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces.",
    }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(5, { message: "Email must be at least 5 characters long." }),

  subject: z
    .string()
    .min(3, { message: "Subject should be at least 3 characters." })
    .max(100, { message: "Subject cannot exceed 100 characters." }),

  phone_number: z
    .string()
    .regex(/^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/, {
      message: "Please enter a valid UK phone number (e.g., +447911123456)",
    }),

  message: z
    .string()
    .min(10, { message: "Message should be at least 10 characters." })
    .max(500, { message: "Message cannot exceed 500 characters." }),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      phone_number: "",
      message: "",
    },
  });

  const handleSubmit = async (data) => {
    //Write the code to submit the form data to the backend API
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch(`${BASE_URL}/api/connect/contact-us/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.statusCode === 200 || 201) {
        Swal.fire({
          title: "Thank you for contacting us! We will get back to you soon.",
          icon: "success",
        });
        form.reset();
      } else {
       toast.error("Fail to sumbmit the form. Please try again.");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred while sending your message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 px-4 md:px-12 border rounded-sm">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-cyan-500 via-blue-400 to-green-500 bg-clip-text text-transparent">
          Contact Us
        </h2>

        <p className="text-gray-600 mt-2 dark:text-white">
          Have a question or want to work with us? Fill out <br /> the form and
          we'll get back to you.
        </p>
      </div>

      {/* Contact page */}
      <div className="lg:flex justify-between gap-12">
        {/* Left Side */}
        <div className="lg:w-1/2 space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-cyan-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">
            Get in Touch
          </h3>

          <div className="space-y-4 mt-6">
            <p className="flex items-center gap-3 text-gray-700 dark:text-white">
              <FaPhoneAlt /> +44 7123 456 ...
            </p>
            <p className="flex items-center gap-3 text-gray-700 dark:text-white">
              <FaEnvelope /> contact@yourcompany.com
            </p>
            <p className="flex items-center gap-3 text-gray-700 dark:text-white">
              <FaMapMarkerAlt /> 1200 Abc Avenue, London, UK
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 mt-8 text-2xl text-gray-700 dark:text-white">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="lg:w-1/2 mt-12 lg:mt-0 dark:text-white">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Status Message */}
              {submitStatus && (
                <div
                  className={`p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <div className="lg:grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          {...field}
                          className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your Email"
                          {...field}
                          className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Subject"
                          {...field}
                          className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="+44 7911 123 456"
                          {...field}
                          className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Message Field - Full Width */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Your Message"
                        {...field}
                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 min-h-[120px] resize-none"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600 
             hover:from-indigo-500 hover:via-blue-500 hover:to-sky-500 
             transition-all duration-500 ease-in-out transform hover:scale-105 
             text-white font-semibold shadow-md hover:shadow-lg px-6 py-2 rounded-lg
             disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
