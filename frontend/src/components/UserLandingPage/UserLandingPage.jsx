import React from 'react'
import Hero from './Hero'
import BrowseCategories from './BrowseCategories'
import Fasion from './Fashion'
import Travel from './Travel'
import HomeAndLifeStyle from './HomeAndLifeStyle'
import Finance from './Finance'
import EmailSubscription from '../landingPage/EmailSubscription'
import Faq from '../landingPage/Faq'

const UserLandingPage = () => {
  return (
    <div>
      <Hero/>
      <BrowseCategories/>
      <Fasion/>
      <Travel/>
      <Finance/>
      <EmailSubscription/>
      <Faq/>
    </div>
  )
}

export default UserLandingPage
