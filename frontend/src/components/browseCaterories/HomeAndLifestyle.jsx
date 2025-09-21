import React from 'react'
import Furniture from '../UserLandingPage/UserLandingPageCard/HomeAndLifestyleComponents/Furniture'
import HomeDecor from '../UserLandingPage/UserLandingPageCard/HomeAndLifestyleComponents/HomeDecor'
import KitchenAndDining from '../UserLandingPage/UserLandingPageCard/HomeAndLifestyleComponents/KitchenAndDining'
import BeddingAndBath from '../UserLandingPage/UserLandingPageCard/HomeAndLifestyleComponents/BeddingAndBath'

const HomeAndLifestyle = () => {
  return (
    <div>
      <Furniture/>
      <HomeDecor/>
      <KitchenAndDining/>
      <BeddingAndBath/>
    </div>
  )
}

export default HomeAndLifestyle
