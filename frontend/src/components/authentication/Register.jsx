import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';

const Register = () => {
  return (
    <div>
        <div className='lg:flex md:flex mt-12 justify-center mx-auto gap-6 bg-white w-[820px] p-2 shadow-2xl'>
          {/*Image div*/}
            <div className="relative h-[600px] w-96">
      {/* Image fills the parent */}
      <Image
        src="/login.JPG"            // must match exact filename/case in /public
        alt="Login_Image"
        fill                         // use fill instead of width/height
        className=" object-cover"
        priority
      />

      {/* Centered overlay */}
      <div className="absolute mt-48 grid place-items-center ">
        <h1 className="z-10 text-3xl font-bold text-white drop-shadow-lg">Create your account</h1>
        <h3 className='text-white mt-4 text-center'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h3>
        
      </div>
        <h4 className='text-white absolute bottom-4 text-sm left-12'>Log in to your<span className='font-bold'>MaximumSavings</span> account.</h4>

      {/* Optional dark overlay for readability */}
       <div className="absolute inset-0 rounded-lg bg-black/30" />
    </div>
            {/*Login form div*/}
            <div className='h-[600px] w-96 '>
              <div className="w-full max-w-md p-8 space-y-3   text-gray-100 h-full ">
	<h1 className=" montserrat-text text-center common-text text-5xl font-bold mb-10">Register</h1>
	<form noValidate="" action="" className="space-y-6">
		  <div className='flex gap-2 w-80'>
        <div>
          <div className="relative w-39">
      {/* Label on border */}
      <label
        htmlFor="email"
        className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
      >
        First Name
      </label>

      {/* Input box */}
      <input
        type="email"
        name='email'
        id="email"
        className="w-full rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
    </div>
        </div>
        <div>
          <div className="relative w-39">
      {/* Label on border */}
      <label
        htmlFor="email"
        className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
      >
        Last Name
      </label>

      {/* Input box */}
      <input
        type="email"
        name='email'
        id="email"
        className="w-full rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
    </div>
        </div>

      </div>
		<div>
    <div className="relative w-80">
      {/* Label on border */}
      <label
        htmlFor="email"
        className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
      >
        Personal Email
      </label>

      {/* Input box */}
      <input
        type="email"
        name='email'
        id="email"
        className="w-full rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
    </div>
<div className="relative w-80 mt-6">
  {/* Label on border */}
  <label
    htmlFor="dob"
    className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
  >
    DATE OF BIRTH
  </label>

  {/* Input box */}
  <input
    type="date"
    name="dob"
    id="dob"
    className="w-full rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
  />
</div>

 <div className="relative w-80 mt-6">
      {/* Label on border */}
      <label
        htmlFor="email"
        className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
      >
        MOBILE NUMBER
      </label>
       
      {/* Input box */}
      <input
        type="email"
        name='number'
        id="email"
        placeholder='+44'
        className="w-full rounded-md border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
    </div>



        </div>
		<Link href={'/register2'} className="block w-full text-center rounded-sm text-white bg-[#00308F] text-xl py-3 cursor-pointer">Continue</Link>
	
	</form>
	
	<p className="text-xs text-center sm:px-6 text-gray-800">Already have an account?
		<Link href={"/login"} className="underline font-bold common-text montserrat-text"> Log in</Link>
	</p>
</div>
            </div>
        </div>

    </div>
  )
}

export default Register
