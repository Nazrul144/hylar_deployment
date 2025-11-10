"use client";
import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,

      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.message) newErrors.message = "Message is required";
    if (!formData.agree) newErrors.agree = "You must agree to submit the form";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    formData;
    toast.success("Form submitted successfully!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      phone: "",
      message: "",
      agree: false,
    });
    setErrors({});
  };

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
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="md:col-span-1">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-blue-500 p-3 rounded w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="md:col-span-1">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-blue-500 p-3 rounded w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="md:col-span-1">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="border border-blue-500 p-3 rounded w-full"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
              )}
            </div>

            <div className="md:col-span-1">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="border border-blue-500 p-3 rounded w-full"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="border border-blue-500 p-3 rounded w-full md:col-span-2 h-32"
            />
            {errors.message && (
              <p className="text-red-500 text-sm md:col-span-2">
                {errors.message}
              </p>
            )}

            <div className="flex items-start gap-2 md:col-span-2">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-1"
              />
              <p className="text-sm text-gray-600 dark:text-white">
                I agree to the terms and conditions and allow this website to
                store my submitted information.
              </p>
            </div>
            {errors.agree && (
              <p className="text-red-500 text-sm md:col-span-2">
                {errors.agree}
              </p>
            )}

            <Button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 via-blue-600 to-emerald-500 text-white font-semibold px-6 py-5 rounded-lg shadow-md 
  hover:from-blue-600 hover:via-emerald-500 hover:to-cyan-500 hover:scale-105 transform transition-all duration-300 
  md:col-span-2 cursor-pointer w-28"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
