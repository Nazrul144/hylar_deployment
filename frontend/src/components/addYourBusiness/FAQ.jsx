'use client'
import Link from 'next/link'
import React from 'react'
import {motion} from 'framer-motion'

const FAQ = () => {
  return (
    <motion.div
    initial={{y:100, opacity:0}}
    whileInView={{y:0, opacity:1}}
    transition={{
      delay:0.2,
      stiffness: 60,
      duration: 1,
      type:"keyframes"
    }}
    >
      <div className='mt-16 max-w-5xl mx-auto'>
        <h1 className='lg:text-4xl inter-text font-semibold text-center common-text mb-20 text-xl'>Frequently asked questions</h1>
      <div className="space-y-4">
  <details className="group [&_summary::-webkit-details-marker]:hidden" open>
    <summary
      className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900"
    >
      <h2 className="text-lg font-medium common-text">What is Mobbin?</h2>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="block size-5 shrink-0 group-open:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="hidden size-5 shrink-0 group-open:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </summary>

    <p className="px-4 pt-4 text-gray-900">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in,
      recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
      consequuntur distinctio corporis earum so!
    </p>
  </details>

  <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary
      className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900"
    >
      <h2 className="text-lg font-medium">How often do you update the library?</h2>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="block size-5 shrink-0 group-open:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="hidden size-5 shrink-0 group-open:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </summary>

    <p className="px-4 pt-4 text-gray-900">
      We regularly update our product library to ensure you have access to
            the latest deals and offerings. New products, discounts, and
            exclusive offers are added on a continuous basis throughout the
            week. Our team works diligently to keep the MaxSavings library fresh
            and up-to-date, so you'll always discover new ways to save.
            
  </details>

  <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary
      className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900"
    >
      <h2 className="text-lg font-medium">Can I get a free trial?</h2>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="block size-5 shrink-0 group-open:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="hidden size-5 shrink-0 group-open:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </summary>

    <p className="px-4 pt-4 text-gray-900">
     Yes, we offer a free trial period so you can experience the benefits
            of MaxSavings before committing to a subscription. During your
            trial, you'll have access to our full range of features, including
            exclusive deals, special discounts, and premium product offerings.
            Simply sign up on our website to start your free trial—no credit
            card required upfront. Once your trial period ends, you can choose
            to continue with one of our subscription plans to keep enjoying all
            the perks and savings that MaxSavings has to offer.
    </p>
  </details>
  <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary
      className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900"
    >
      <h2 className="text-lg font-medium">Do you have a monthly plan?</h2>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="block size-5 shrink-0 group-open:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="hidden size-5 shrink-0 group-open:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </summary>

    <p className="px-4 pt-4 text-gray-900">
      Yes, we offer flexible monthly subscription plans designed to fit
            your needs. With our monthly plan, you can enjoy full access to
            exclusive deals, premium discounts, and special offers without any
            long-term commitment. You can easily subscribe, manage, or cancel
            your plan anytime through your account settings. Choose the monthly
            option for maximum flexibility while still getting the best savings
            on MaxSavings.
    </p>
  </details>

</div>

<div className='flex justify-center mt-20'>
    <Link href={'/submit_form'} className='common-bg text-white text-sm lg:text-lg py-2 px-4 rounded-sm montserrat-text font-semibold hover:scale-105 transition-all duration-300'>Click Here To Submit Your Offer</Link>
</div>
    </div>
    </motion.div>
  )
}

export default FAQ
