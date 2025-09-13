import Image from 'next/image'
import React from 'react'
import { useId } from "react"
import { Button } from '../ui/button'
import Link from 'next/link'

const Register3 = () => {
     const id = useId()
  return (
    <div>
        <div className='lg:w-[803px] lg:h-[516px] mx-auto mt-14 lg:shadow-2xl relative'>
                <div className='lg:w-[820px] h-[50px]'>
                    <Image 
                        src={'/register2.png'}
                          width={802}
                          height={50}
                          objectFit='cover'
                          priority  
                          alt='header_Image'     
                    />
                </div>
                <h1 className='font-bold text-4xl mt-12 montserrat-text text-center'>Create your account</h1>
                <h3 className='text-center text-lg mt-2 montserrat-text'>Now enter a secure password for <br /> your account</h3>
               
           <div className='flex justify-center mt-14'>
                    <div>
    <div className="relative w-96 h-10 mb-8">
      {/* Label on border */}
      <label
        htmlFor="email"
        className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
      >
        Email Address
      </label>

      {/* Input box */}
      <input
        type="email"
        id="email"
        className="w-full h-12  border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
    </div>
    <div className="relative w-96 h-10">
      {/* Label on border */}
      <label
        htmlFor="email"
        className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
      >
        Password
      </label>

      {/* Input box */}
      <input
        type="email"
        id="email"
        className="w-full h-12 border border-blue-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
    </div>
    		<Link href={'/register4'} className="block w-full text-xl font-semibold text-center  text-white bg-[#00308F]  py-3 cursor-pointer mt-8 mb-6">Create Account</Link>
        
     </div>
           </div>
        </div>
       <hr className='border-blue-800 border-[3px] lg:w-[802px] mx-auto ' />
    </div>
  )
}

export default Register3
