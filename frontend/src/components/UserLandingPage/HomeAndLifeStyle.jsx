import React from 'react'
import Furniture from './UserLandingPageCard/HomeAndLifestyleComponents/Furniture'
import HomeDecor from './UserLandingPageCard/HomeAndLifestyleComponents/HomeDecor'
import BeddingAndBath from './UserLandingPageCard/HomeAndLifestyleComponents/BeddingAndBath'
import KitchenAndDining from './UserLandingPageCard/HomeAndLifestyleComponents/KitchenAndDining'
import HomeAndLifestyleHero from '../browseCaterories/HomeAndLifestyleHero'
import FAQ from '../addYourBusiness/FAQ'

const HomeAndLifeStyle = () => {
  return (
    <div>
        <HomeAndLifestyleHero/>
        <Furniture/>
        <HomeDecor/>
        <BeddingAndBath/>
        <KitchenAndDining/>
        <FAQ/>
    </div>
  )
}

export default HomeAndLifeStyle
