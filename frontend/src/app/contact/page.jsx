import Contact from '@/components/contactPage/Contact'
import React from 'react'

export const metadata = {
  title: "Contact || Maximum Savings",
  description: "Get in touch with Maximum Savings — we’re here to help! Contact our support team for inquiries, partnerships, or feedback. We value your questions and aim to provide quick, friendly assistance.",
  keywords: [
    "Maximum Savings",
    "Contact Maximum Savings",
    "Customer Support",
    "Online Shopping Help",
    "Deals and Discounts",
    "Best Offers",
    "Smart Shopping",
    "Customer Service"
  ]
  
}

const ContactPage = () => {
  return (
    <div className='w-7xl mx-auto mt-16'>
      <Contact/>
    </div>
  )
}

export default ContactPage
