
import Articles from '@/components/faqs/Articles'
import Faqs from '@/components/faqs/Hero'
import Faq from '@/components/LandingPage/Faq'
import CatagoriesSlider from '@/components/UserLandingPage/UserLandingPageCard/CatagoriesSlider'
import React from 'react'

const FAQSPage = () => {
  return (
    <div>
      <Faqs/>
      <Articles/>
      <Faq/>
      <CatagoriesSlider/>
    </div>
  )
}

export default FAQSPage
