import React from 'react'
import { ClipboardList, Smartphone, Wallet } from "lucide-react"; // icons
const Works = () => {
  return (
    <section className="mb-10 mt-10 bg-white text-center max-w-7xl mx-auto">
    {/* Title */}
    <h2 className="text-4xl font-bold common-text mb-2 inter-text">How It Works</h2>
    <p className=" text-xl mb-12 montserrat-text ">
      Follow three easy steps to get your card and unlock exclusive discounts.
    </p>

    {/* Steps */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8  px-6">
      {/* Step 01 */}
      <div className="relative bg-white shadow-md rounded-xl p-8 text-center  hover:shadow-lg transition border border-blue-900 border-b-4  border-b-[#00308F] ">
        {/* Circle Number */}
        <div className="absolute -top-6 left-20 -translate-x-1/2 w-12 h-12 rounded-full common-bg text-white flex items-center justify-center font-bold">
          01
        </div>
        {/* Icon */}
        <ClipboardList className="w-10 h-10 mx-auto common-text mb-4" />
        <h3 className="font-bold text-xl common-text mb-2 inter-text">
          Step 01: Sign Up
        </h3>
        <p className="text-gray-600 text-sm montserrat-text ">
          Register online in minutes. Just provide basic information and proof
          of eligibility like a work ID or employment letter.
        </p>
      </div>

      {/* Step 02 */}
      <div className="relative bg-white shadow-md rounded-xl p-8 border border-blue-900 border-b-4 text-center hover:shadow-lg transition border-b-[#00308F]">
        <div className="absolute -top-6 left-20 -translate-x-1/2 w-12 h-12 rounded-full common-bg text-white flex items-center justify-center font-bold">
          02
        </div>
        <Smartphone className="w-10 h-10 mx-auto common-text mb-4" />
        <h3 className="font-bold text-xl common-text mb-2 inter-text">
          Step 02: Get Verified
        </h3>
        <p className="text-gray-600 text-sm montserrat-text ">
          Once you upload your documents, our team will verify your
          eligibility. This usually takes 1–3 working days.
        </p>
      </div>

      {/* Step 03 */}
      <div className="relative bg-white shadow-md rounded-xl p-8 border border-blue-900 border-b-4 text-center  hover:shadow-lg transition  border-b-[#00308F]">
        <div className="absolute -top-6 left-20 -translate-x-1/2 w-12 h-12 rounded-full common-bg text-white flex items-center justify-center font-bold">
          03
        </div>
        <Wallet className="w-10 h-10 mx-auto common-text mb-4" />
        <h3 className="font-bold text-xl common-text mb-2 inter-text">
          Step 03: Start Saving
        </h3>
        <p className="text-gray-600 text-sm montserrat-text ">
          After verification, activate your card and instantly access
          thousands of exclusive discounts both online and in-store.
        </p>
      </div>
    </div>
  </section>
  )
}

export default Works