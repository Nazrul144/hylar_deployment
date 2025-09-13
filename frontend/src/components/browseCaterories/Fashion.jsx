import React from 'react'
import Hero from './Hero'
import WomenswearCard from '../UserLandingPage/UserLandingPageCard/WomenswearCard'
import ManswearCard from '../UserLandingPage/UserLandingPageCard/ManswearCard'
import ChildrenswearCard from '../UserLandingPage/UserLandingPageCard/ChildrenswearCard'
import ShoesCard from '../UserLandingPage/UserLandingPageCard/ShoesCard'

const Fashion = () => {
  return (
    <div>
      <Hero/>
      <ManswearCard/>
      <WomenswearCard/>
      <ChildrenswearCard/>
      <ShoesCard/>
    </div>
  )
}

export default Fashion
