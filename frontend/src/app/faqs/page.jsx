"use client";

import Articles from '../../components/faqs/Articles'
import EligibilitySection from '../../components/faqs/EligibilitySection'
import Faqs from '../../components/faqs/Hero'
import PopularFaqs from '../../components/faqs/PopularFaqs'
import CatagoriesSlider from '../../components/UserLandingPage/UserLandingPageCard/CatagoriesSlider'
import React from 'react'
import { SearchProvider } from '../../providers/SearchContext' 

const FAQSPage = () => {
  return (
    <SearchProvider>
      <div>
        <Faqs/>
        <Articles/>
        <EligibilitySection/>
        <PopularFaqs/>
        <CatagoriesSlider/>
      </div>
    </SearchProvider>
  )
}

export default FAQSPage