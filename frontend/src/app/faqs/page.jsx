import Articles from '../../components/faqs/Articles'
import EligibilitySection from '../../components/faqs/EligibilitySection'
import Faqs from '../../components/faqs/Hero'
import PopularFaqs from '../../components/faqs/PopularFaqs'
import CatagoriesSlider from '../../components/UserLandingPage/UserLandingPageCard/CatagoriesSlider'
import React from 'react'

export const metadata = {
  title: "FAQ || Maximum Savings",
  description:
    "Find quick answers to the most common questions about Maximum Savings. Learn how to shop, save, add your business, and get support — all in one place.",
  keywords: [
    "FAQ",
    "Maximum Savings help",
    "Shopping guide",
    "Customer support",
    "Business listing help",
    "Deals and offers",
    "Online shopping questions",
    "Maximum Savings support"
  ]
}

const FAQSPage = () => {
  return (
    <div>
      <Faqs/>
      <Articles/>
      <EligibilitySection/>
      <PopularFaqs/>
      <CatagoriesSlider/>
    </div>
  )
}

export default FAQSPage