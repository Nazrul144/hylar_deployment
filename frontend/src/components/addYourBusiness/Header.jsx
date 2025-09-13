import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <div className='relative'>
      {/* Image container */}
      <div className='lg:w-[1500px] mx-auto relative h-[500px]'>
        <Image 
          src='/cover.png'
          alt='cover'
          layout='fill'        
          objectFit='cover'   
        />
      </div>

      {/* Overlapping div */}
      <div className='lg:w-[880] h-[326px] bg-blue-900/80 mx-auto relative -mt-[163px] rounded-t-lg'>
        <h1 className='text-white font-bold text-4xl text-center pt-16'>
          Reach Verified Frontline Workers
        </h1>
        <p className='text-lg text-center text-[#D9D9D9] mt-4'>
          Promote your business to thousands of NHS, emergency services, and key workers <br />
          with exclusive offers. Boost visibility and gain loyal customers today.
        </p>
        <div className='flex justify-center items-center mt-10'>
          <Button className='bg-[#7BB662] text-lg '>Add Your Business</Button>
        </div>
      </div>
    </div>
  )
}

export default Header
