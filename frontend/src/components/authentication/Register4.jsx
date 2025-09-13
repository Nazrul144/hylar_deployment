import Image from 'next/image'
import React from 'react'
import { useId } from "react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from 'next/link'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'

const Register4 = () => {
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
                <h1 className='font-bold text-4xl mt-10 montserrat-text text-center mb-6'>We need to verify your email</h1>
                <h3 className='text-center text-lg mt-2 montserrat-text mb-6'>Check your inbox at <span className='font-bold'>alishuvo143@gmail.com</span> and click the link in <br /> the email to verify your account.</h3>
                               <div className="justify-center lg:mt-0 mt-5 lg:mb-0 mb-6 lg:right-20 bottom-16 flex items-center">
  <Link
    href={'/register5'}
    className="common-bg py-2.5 px-5 rounded-lg text-white w-56 h-12 flex items-center justify-center gap-1"
  >
    {/* Icon first, then text */}
    <span className='text-lg font-semibold'>Verify Your Email</span>
    <MdKeyboardDoubleArrowRight className="text-2xl mt-1" />
  </Link>
</div>

<div className='mt-8'>
    <h1 className='text-lg text-center'>Didn't receive it?</h1>
    <h3 className='text-lg text-center mb-6'>Use the button to resend or check your junk folder.</h3>
    <h3 className='text-center text-lg'>By clicking Create Account you agree to Blue Light Card's <a className='underline' href=''>Terms & Conditions</a>. <br /> For information about how we process your personal <br /> data, click here <a className='underline' href=""> Privacy Notice.</a></h3>
</div>

        </div>
 <hr className='border-blue-800 border-[3px] lg:w-[802px] mx-auto ' />
    </div>
  )
}

export default Register4
