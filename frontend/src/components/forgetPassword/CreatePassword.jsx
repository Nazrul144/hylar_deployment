"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CreatePassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    Swal.fire({
      title: "Password Updated Successfully!",
      icon: "success",
    });

    console.log("Form submitted:", formData);
    // 👉 send formData.newPassword to your backend
  };

  return (
    <div>
      <div className="lg:flex md:flex mt-12 justify-center mx-auto gap-6 bg-white w-[820px] p-2 shadow-2xl">
        {/* Image div */}
        <div className="relative h-[600px] w-96">
          <Image
            src="/forgetPassword/1.png"
            alt="forgotPassword"
            fill
            className=" object-cover"
            priority
          />
          <div className="absolute inset-0 grid place-items-center ml-14">
            <h1 className="z-10 text-3xl font-bold text-white drop-shadow-lg">
              Set a New <br /> Password
              <hr className="border-t-1 border-[#7BB662] w-66 mt-2" />
              <span className="text-sm text-gray-400">
                Create a strong password to secure your <br /> MaximumSavings
                account.
              </span>
            </h1>
            <h3 className="absolute bottom-10 text-white mr-8">
              Log in to your MaximumSavings account.
            </h3>
          </div>
          <div className="absolute inset-0 rounded-lg bg-black/30" />
        </div>

        {/* Form */}
        <div className="h-[600px] w-96">
          <div className="w-full max-w-md p-8 space-y-3 text-gray-100 h-full">
            <h1 className="text-black font-bold text-3xl">
              Create New Password
            </h1>
            <p className="text-gray-600 text-sm mb-6">
              Use at least 8 characters. A mix of upper & lower case letters,
              numbers, and symbols makes it stronger.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div className="relative w-80">
                <label
                  htmlFor="newPassword"
                  className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  placeholder="*****"
                  required
                  onChange={handleChange}
                  className="w-full h-12 rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              {/* Confirm Password */}
              <div className="relative w-80">
                <label
                  htmlFor="confirmPassword"
                  className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="*****"
                  required
                  onChange={handleChange}
                  className="w-full h-12 rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <div className="text-black text-sm ml-6 mt-2">
                  <li>At least 8 characters</li>
                  <li>One uppercase letter (A–Z)</li>
                  <li>One lowercase letter (a–z)</li>
                  <li>One number (0–9)</li>
                  <li>One symbol (!@#$…)</li>
                  <li>Passwords match</li>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="block w-full text-center rounded-sm text-white bg-[#00308F] h-12 cursor-pointer"
              >
                Update Password
              </Button>
            </form>

            <div className="flex justify-between mt-6 text-black">
              <Link href={"/login"} className="font-bold underline text-sm">
                Back to Login
              </Link>
              <Link href={"/"} className="font-bold text-sm">
                Need help? Contact support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
