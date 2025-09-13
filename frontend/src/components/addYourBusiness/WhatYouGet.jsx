import React from 'react'

const WhatYouGet = () => {
  return (
    <div className='lg:w-7xl mx-auto mt-16'>
        <div>
            <h1 className='text-4xl text-center common-text font-bold mb-6'>What You Get</h1>
            <h3 className='text-center text-lg'>et featured in our mobile app, track performance with real-time insights, and enjoy dedicated <br /> support. We connect your offers directly to verified frontline workers — helping you boost <br /> visibility, build loyalty, and drive more customers through your doors.</h3>
        </div>
        {/*Stylish Card:*/}
           <div className="flex justify-center items-center mt-24 bg-white">
      {/* Timeline wrapper */}
      <div className="relative flex flex-col items-center w-full max-w-5xl">
        {/* Vertical Line */}
        <div className="absolute top-0 bottom-0 w-6 bg-blue-900 rounded-full"></div>

        {/* Targeted Exposure - Left */}
        <div className="relative flex w-full mb-12 mt-14">
          {/* Left Card */}
          <div className="w-1/2 flex justify-end pr-6">
            <div className="bg-white border border-blue-900 rounded-lg shadow-md  w-90 h-32 ">
              <h3 className="text-blue-900 font-bold lg:text-2xl inter-text text-center mt-6">Targeted Exposure</h3>
              <p className="text-gray-600 text-sm mt-2 text-center">
                Your brand is shown only to verified, high-intent audiences.
              </p>
            </div>
          </div>

        {/* Connector (Desktop only) */}
<div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-16 md:flex md:items-center md:mt-12">
  <div className="bg-blue-900 w-6 h-6 rounded-full z-10"></div>
  <div className="h-3 w-8 rounded-b bg-blue-900"></div>
</div>

          {/* Empty right side */}
          <div className="w-1/2 ml-20"></div>
        </div>

        {/* Mobile App Access - Right */}
        <div className="relative flex w-full mb-24">
          {/* Empty left side */}
          <div className="w-1/2"></div>

          {/* Connector (Desktop only) */}
<div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:mt-12">
  <div className="h-3 ml-20 w-8 bg-blue-900"></div>
  <div className="bg-blue-900 w-6 h-6 rounded-full z-10"></div>
</div>

      
          {/* Right Card */}
           <div className="w-1/2 flex lg:justify-center pr-5">
            <div className="bg-white border border-blue-900 rounded-lg shadow-md  w-90 h-32 ">
              <h3 className="text-blue-900 font-bold lg:text-2xl inter-text text-center mt-6">Mobile App Access</h3>
              <p className="text-gray-600 text-sm mt-2 text-center px-2">
                Get listed in our iOS and Android apps with thousands of daily users.
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard - Left */}
        <div className="relative flex w-full mb-24">
          {/* Left Card */}
          <div className="w-1/2 flex justify-end pr-6 mr-20">
            <div className="bg-white border border-blue-900 rounded-lg shadow-md  w-90 h-32 ">
              <h3 className="text-blue-900 font-bold lg:text-2xl inter-text text-center mt-6 ">Analytics Dashboard</h3>
              <p className="text-gray-600 text-sm mt-2 text-center px-3">
                View clicks, redemptions, and user interaction metrics in real time.
              </p>
            </div>
          </div>

         {/* Connector (Desktop only) */}
<div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-16 md:flex md:items-center md:mt-12">
  <div className="bg-blue-900 w-6 h-6 rounded-full z-10"></div>
  <div className="h-3 w-8 bg-blue-900"></div>
</div>


          {/* Empty right side */}
          <div className="w-1/2"></div>
        </div>

        {/* Partner Support - Right */}
        <div className="relative flex w-full mb-24">
          {/* Empty left side */}
          <div className="w-1/2"></div>

         {/* Connector (Desktop only) */}
<div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:mt-12">
  <div className="h-3 ml-20 w-8 bg-blue-900"></div>
  <div className="bg-blue-900 w-6 h-6 rounded-full z-10"></div>
</div>


          {/* Right Card */}
            <div className="w-1/2 flex justify-center pr-5">
            <div className="bg-white border border-blue-900 rounded-lg shadow-md  w-90 h-32 ">
              <h3 className="text-blue-900 font-bold lg:text-2xl inter-text text-center mt-6">Partner Support</h3>
              <p className="text-gray-600 text-sm mt-2 text-center px-2">
                Our team helps you optimize your offer and maximize impact
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default WhatYouGet
