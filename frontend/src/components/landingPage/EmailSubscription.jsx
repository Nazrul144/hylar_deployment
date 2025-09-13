import React from 'react'
import { useId } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import myPhoto from '../../../public/emailSubscription/email_sub.png';
import { RxCross2 } from "react-icons/rx";

const EmailSubscription = () => {
    const id = useId()
  return (
    <div className='max-w-7xl mx-auto'>
       <div className='relative'>
            <Image src={myPhoto}
            alt='Image'
            />
             <div className='absolute top-1 lg:top-16 left-4 lg:left-32'>
            <h3 className='pinyon-text lg:text-3xl text-[#7BB662]'>~ Mega Sale ~</h3>
            <h2 className='bills-text lg:text-5xl text-xl text-white'>Join Our Savings Club</h2>
            <p className='text-sm mt-3 text-white'>Be the first to know about exclusive offers, latest discounts, and special rewards. <br /> Subscribe to our newsletter and never miss a deal again!</p>

             <div>
      <div className="flex gap-2 mt-4">
        <Input id={id} className="  bg-white border-none p-8" placeholder="Type Your Email" type="email" />
        <RxCross2 className='absolute right-44 top-40 lg:top-43 text-2xl font-bold text-gray-600' />
        <Button className='bg-[#7BB662] text-white text-lg p-8 hover:bg-[#00308F] transition-colors duration-300 ease-in-out cursor-pointer'>Subscribe</Button>
      </div>
    </div>
        </div>
        </div>
    </div>
  )
}

export default EmailSubscription
