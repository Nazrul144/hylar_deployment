import React from 'react'
import Header from './Header'
import Works from './Works'
import About from './About'
import Subscription from './Subscription'
import LatestNews from './LatestNews'
import EmailSubscription from './EmailSubscription'
import Faq from './Faq'

const PublicLandingPage = () => {
  return (
    <div>
      <Header/>
      <Works/>
      <About/>
      <Subscription/>
      <LatestNews/>
      <EmailSubscription/>
      <Faq/>
    </div>
  )
}

export default PublicLandingPage
