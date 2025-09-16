"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';

const Login = () => {
  // state for email and password
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // 👉 here you get { email: "value", password: "value" }
  };

  

  return (
    <div>
      <div className='lg:flex md:flex mt-12 justify-center mx-auto gap-6 bg-white w-[820px] p-2 shadow-2xl'>
        {/* Image div */}
        <div className="relative h-[600px] w-96">
          <Image
            src="/login.JPG"
            alt="Login_Image"
            fill
            className=" object-cover"
            priority
          />

          <div className="absolute inset-0 grid place-items-center ml-14">
            <h1 className="z-10 text-3xl font-bold text-white drop-shadow-lg">
              Welcome To MaximumSavings
              <hr className="border-t-1 border-[#7BB662] w-66 mt-2" />
            </h1>
          </div>

          <h4 className='text-white absolute bottom-4 text-sm left-12'>
            Log in to your <span className='font-bold'>MaximumSavings</span> account.
          </h4>

          <div className="absolute inset-0 rounded-lg bg-black/30" />
        </div>

        {/* Login form */}
        <div className='h-[600px] w-96'>
          <div className="w-full max-w-md p-8 space-y-3 text-gray-100 h-full">
            <h1 className="montserrat-text text-center common-text text-5xl font-bold mb-10">Login</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email input */}
              <div className="relative w-80">
                <label
                  htmlFor="email"
                  className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              {/* Password input */}
              <div className="space-y-1 text-sm">
                <div className="relative w-80">
                  <label
                    htmlFor="password"
                    className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full h-12 rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                <div className="flex justify-end text-xs text-gray-400">
                  <Link rel="noopener noreferrer" href="forgotpass">Forgot Password?</Link>
                </div>
              </div>

              {/* Submit button */}
              <Button type="submit" className="block w-full text-center rounded-sm text-white bg-[#00308F] h-12 cursor-pointer">
                LOG IN
              </Button>

              <Button className="flex items-center justify-center w-full h-12 bg-transparent border-1 border-[#00308F] common-text rounded-sm cursor-pointer text-xl hover:bg-white">
                <FcGoogle className='text-2xl ' />
                Google
              </Button>
            </form>

            <p className="text-xs text-center sm:px-6 text-gray-800">
              Don't have an account?
              <Link href={"/register"} className="underline font-bold montserrat-text common-text">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
