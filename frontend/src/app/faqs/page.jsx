
import Articles from '@/components/faqs/Articles'
import EligibilitySection from '@/components/faqs/EligibilitySection'
import Faqs from '@/components/faqs/Hero'
import PopularFaqs from '@/components/faqs/PopularFaqs'
import CatagoriesSlider from '@/components/UserLandingPage/UserLandingPageCard/CatagoriesSlider'
import React from 'react'

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
