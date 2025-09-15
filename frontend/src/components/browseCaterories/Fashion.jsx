import React from 'react'
import Hero from './FashionHero'
import WomenswearCard from '../UserLandingPage/UserLandingPageCard/WomenswearCard'
import ManswearCard from '../UserLandingPage/UserLandingPageCard/ManswearCard'
import ChildrenswearCard from '../UserLandingPage/UserLandingPageCard/ChildrenswearCard'
import ShoesCard from '../UserLandingPage/UserLandingPageCard/ShoesCard'
import FashionHero from './FashionHero'
import CatagoriesSlider from '../UserLandingPage/UserLandingPageCard/CatagoriesSlider'

const Fashion = () => {
  return (
    <div>
      <FashionHero/>
      <ManswearCard/>
      <WomenswearCard/>
      <ChildrenswearCard/>
      <ShoesCard/>
      <CatagoriesSlider/>
    </div>
  )
}

export default Fashion
