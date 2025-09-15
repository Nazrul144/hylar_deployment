import React from 'react'
import Hero from './FashionHero'
import WomenswearCard from '../UserLandingPage/UserLandingPageCard/WomenswearCard'
import ManswearCard from '../UserLandingPage/UserLandingPageCard/ManswearCard'
import ChildrenswearCard from '../UserLandingPage/UserLandingPageCard/ChildrenswearCard'
import ShoesCard from '../UserLandingPage/UserLandingPageCard/ShoesCard'
import FashionHero from './FashionHero'

const Fashion = () => {
  return (
    <div>
      <FashionHero/>
      <ManswearCard/>
      <WomenswearCard/>
      <ChildrenswearCard/>
      <ShoesCard/>
    </div>
  )
}

export default Fashion
