import React from 'react'
import { Button } from '../ui/button'
import { BsRocketTakeoffFill } from "react-icons/bs";
import Image from 'next/image';

const Header = () => {
  return (
    <div className='max-w-7xl w-full mx-auto'>
        <h1 className=' text-2xl px-2 lg:text-5xl text-center font-extrabold mt-4 inter-text'>Unlock Over <span className='common-text'>15,000 Discounts</span> for Public Sector <br />Workers.</h1>
        <p className='text-center mt-4 text-sm poppins-text'>Access exclusive deals from top brands in retail, travel, and entertainment</p>
        <div className='flex justify-center items-center mt-4'>
        <Button className='cursor-pointer hover:bg-common-bg hover:scale-105 transition-all duration-300 common-bg px-4 text-lg font-semibold'>Get Started <BsRocketTakeoffFill /></Button>
        </div>
        <div className="flex justify-center items-center mt-6 bg-white">
      <div className="grid grid-cols-5 gap-3 px-2">
        {/* Left tall ship */}
        <div className="row-span-1">
          <Image
            src="/header/7.jpg"
            alt="ship-left"
            width={1000}
            height={300}
            className="w-60 h-80 object-cover "
          />
        </div>

        {/* Protest */}
        <div className="row-span-1 mt-12">
          <Image
            src="/header/3.jpg"
            alt="protest"
            width={1000}
            height={500}
            className="w-96 h-66 object-cover"
          />
        </div>

        {/* Flag (center large, fill extra space) */}
        <div className="row-span-2 col-span-1 mt-24">
          <Image
            src="/header/5.jpg"
            alt="flag"
            width={500}
            height={400}
            className="w-60 h-80 object-cover "
          />
        </div>

        {/* Right tall ship */}
        <div className="row-span-2">
          <Image
            src="/header/7.jpg"
            alt="ship-right"
            width={400}
            height={300}
            className="w-60 h-70 object-cover "
          />
        </div>

        {/* Blue building */}
        <div className="row-span-1">
          <Image
            src="/header/4.jpg"
            alt="blue-building"
            width={400}
            height={600}
            className="w-60 h-86 object-cover "
          />
        </div>

        {/* Building with flags */}
        <div className="row-span-1 ml-18">
          <Image
            src="/header/2.jpg"
            alt="building-flags"
            width={200}
            height={150}
            className="w-40 h-66 object-cover hidden md:block"
          />
        </div>

        {/* Blue interior */}
        <div className="row-span-1">
          <Image
            src="/header/6.jpg"
            alt="blue-interior"
            width={200}
            height={150}
            className="w-66 h-50 object-cover hidden md:block"
          />
        </div>

      <div className='flex gap-3 w-96 absolute right-108 top-172 '>
          {/* Buckingham Palace */}
        <div className='w-36'>
          <Image
            src="/header/1.jpg"
            alt="palace"
            width={200}
            height={150}
            className="w-full h-50 object-cover hidden md:block"
          />
        </div>

        {/* Woman in car */}
        <div className="w-56">
          <Image
            src="/header/9.jpg"
            alt="woman-car"
            width={200}
            height={150}
            className=" w-full h-46 object-cover hidden md:block"
          />
        </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Header