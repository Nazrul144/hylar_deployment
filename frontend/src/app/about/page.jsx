
import About from '@/components/landingPage/About'
import SuccessPage from '@/components/paymentPage/successPage'
import React from 'react'

export const metadata = {
  title: "About || Maximum Savings",
  description: "Learn more about Maximum Savings — a trusted platform dedicated to helping you find the best deals, discounts, and offers online. Our mission is to make smart shopping easy, affordable, and rewarding for everyone."
}

const AboutPage = () => {
  return (
    <div>
      {/* <About/> */}
      <SuccessPage/>
    </div>
  )
}

export default AboutPage
