import React from 'react'
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { IoMdStar } from "react-icons/io";

const About = () => {
  return (
    <section className="py-16 bg-white max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold common-text inline-block pb-1">
          About Us
        </h3>
        <p className="text-gray-600 mt-2 text-xl montserrat-text">
          Follow three easy steps to get your card and unlock exclusive discounts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12  px-6">
        {/* Left Image with overlay stats */}
        <div className="relative ">
          <Image
            src="/header/about.jpg"
            alt="About Us"
            width={560}
            height={400}
            className="rounded-lg object-cover h-[560px] w-full"
          />
          
          {/* Stats Overlay */}
          <div className="lg:absolute bottom-6 lg:mt-0 mt-12 lg:left-150 lg:-translate-x-1/2 bg-white shadow-md rounded-lg flex gap-8 px-8 py-8 lg:w-[90%] lg:md:w-[80%] justify-around border-2 border-blue-900">
            <div className="text-center">
              <h4 className="common-text font-bold text-4xl inter-text">250+</h4>
              <p className="text-gray-600 text-sm">Verified Discounts</p>
              <div className="w-[2px] h-24 common-bg top-3 left-42 absolute"></div> 
            </div>
            <div className="text-center">
              <h4 className="common-text font-bold text-4xl inter-text">100K+</h4>
              <p className="text-gray-600 text-sm">Happy Members</p>
              <div className="w-[2px] h-24 common-bg top-3 left-80 absolute"></div> 
            </div>
            <div className="text-center">
              <div className='flex justify-center items-center'>
                <h4 className="common-text font-bold text-4xl inter-text">4.8 </h4>
              <IoMdStar className='mt-4 common-text font-bold' />
              </div>
              <p className="text-gray-600 text-sm">Average Rating</p>
             
            </div>
            
          </div>
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold common-text inter-text mb-4 mt-6">
            Helping Frontline Workers <br /> Save More
          </h2>
          <p className="text-gray-600 mb-6 montserrat-text text-xl text-justify mt-8 ">
           We empower essential workers by providing access to exclusive discounts across thousands of top UK brands. Whether you’re part of the NHS, emergency services, or armed forces, we make life more affordable for those who serve.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600 w-5 h-5" />
              <span className="text-gray-700 text-sm">
                Maximum Savings Verified Access
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600 w-5 h-5" />
              <span className="text-gray-700 text-sm">
                Partnered with 15,000+ Brands
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600 w-5 h-5" />
              <span className="text-gray-700 text-sm">
                Instant Discount Codes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600 w-5 h-5" />
              <span className="text-gray-700 text-sm">
                Free App & Easy Use
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About