"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';

const ForgotPassword = () => {
  
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
            src="/forgetPassword/1.png"
            alt="forgotPassword"
            fill
            className=" object-cover"
            priority
          />

          <div className="absolute inset-0 grid place-items-center ml-14">
            <h1 className="z-10 text-3xl font-bold text-white drop-shadow-lg">
              Welcome Back
              <hr className="border-t-1 border-[#7BB662] w-66 mt-2" />
              <span className='text-sm text-gray-400'>eset your password securely and get back to unlocking MaximumSavings.</span>
            </h1>
            <h3 className='absolute bottom-10 text-white mr-8'>Log in to your MaximumSavings account.</h3>
          </div>
          <div className="absolute inset-0 rounded-lg bg-black/30" />
        </div>

        {/* Login form */}
        <div className='h-[600px] w-96'>
          <div className="w-full max-w-md p-8 space-y-3 text-gray-100 h-full">
            <h1 className="montserrat-text  common-text text-xl font-bold ">Account</h1>
            <h1 className='text-black font-bold text-3xl'>Forgot Password</h1>
            <p className='text-gray-600 text-justify text-sm mb-12'>Enter the email you used to create your account. We'll send you a secure link to reset your password.</p>

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
                  required
                  onChange={handleChange}
                  className="w-full h-12 rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              {/* Submit button */}
              <Link href={'/verifyopt'} className="block pt-3 w-full text-center rounded-sm text-white bg-[#00308F] h-12 cursor-pointer">
                Send OTP Code
              </Link>
              <div className='flex items-center gap-2'>
                <div>
                    <Image src={'/forgetPassword/light.svg'}
                    width={20}
                    height={20}
                    alt='Image'
                    />
                </div>
                <div>
                    <h3 className='text-gray-500 text-sm'>Didn't get it? Check spam/promotions, or wait a  moment before resending.</h3>
                </div>
                
              </div>
            </form>
             <div className='flex justify-between mt-38 text-black'>
        <div className='common-text font-bold underline text-sm'>
            <Link href={'/login'}>Back to Login</Link>
        </div>
        <div className='common-text font-bold text-sm'>
            <Link href={'/'}>Need help? Contact support</Link>
        </div>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
